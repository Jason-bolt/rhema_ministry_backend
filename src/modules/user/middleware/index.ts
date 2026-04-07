import { NextFunction, Request, Response } from "express";
import IMiddleware from "./Imiddleware";
import { ICreateUser, IUser } from "../types";
import { usersTable } from "../../../../config/db/schemas/User";
import db from "../../../../config/db";
import { eq } from "drizzle-orm";
import {
  createUserSchema,
  passwordCheckSchema,
} from "../../../../config/zod/schemas/user";
import logger from "../../../../utils/logger";
import bcrypt from "bcrypt";
import { getRedisData, setRedisData } from "../../../../utils/helpers/redis";
import { camelize } from "../../../../utils/helpers/general";
import jwt from "jsonwebtoken";
import envs from "../../../../config/envs";
import { GenericHelper } from "../../../../utils/helpers/generic.helpers";
import userService from "../service";

class UserMiddleware implements IMiddleware {
  async verifyAuthUser(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const token = authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    try {
      const tokenObject = GenericHelper.decryptJwt(token) as { id: string };
      if (!tokenObject?.id) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }
      const user = await userService.getUserById(tokenObject.id);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }
      (req as any).user = user;
      return next();
    } catch {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
  }

  async validateCreateUser(req: Request, res: Response, next: NextFunction) {
    const validationResult = createUserSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: validationResult.error.issues
          .map((issue) => issue.message)
          .join(", "),
      });
    }
    return next();
  }

  async isUniqueUser(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body as unknown as ICreateUser;

    if (!email.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email is required field!",
      });
    }
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email.trim()))
      .limit(1);

    logger.info(`Existing user: ${JSON.stringify(user)}`);

    if (user[0]) {
      return res.status(400).json({
        success: false,
        message: "User already exists!",
      });
    }
    return next();
  }

  async validateLoginUser(req: Request, res: Response, next: NextFunction) {
    const { email: passedEmail, password: passedPassword } =
      req.body as unknown as Pick<ICreateUser, "email" | "password">;

    const email = passedEmail.trim();
    const password = passedPassword?.trim();

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required fields!",
      });
    }

    let userData: IUser | null = null;
    const redisData = await getRedisData(`users:email:${email}`);
    if (!redisData) {
      const user = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email))
        .limit(1);

      if (user[0]) {
        await setRedisData(`users:email:${email}`, user);
        userData = camelize(user[0]);
      }
    } else {
      userData = redisData[0] ? camelize(redisData[0]) : null;
    }

    logger.info(`Existing user: ${JSON.stringify(userData)}`);

    if (!userData) {
      return res.status(400).json({
        success: false,
        message: "Email or password is incorrect!",
      });
    }
    if (
      !(await bcrypt.compare(password, (userData.password as string) || ""))
    ) {
      return res.status(400).json({
        success: false,
        message: "Email or password is incorrect!",
      });
    }

    return next();
  }

  async doesUserExistByEmail(req: Request, res: Response, next: NextFunction) {
    const { email: passedEmail } = req.body as unknown as Pick<
      ICreateUser,
      "email"
    >;
    const email = passedEmail.trim();
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required!",
      });
    }

    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    logger.info(`Existing user: ${JSON.stringify(user)}`);

    if (!user[0]) {
      return res.status(400).json({
        success: false,
        message: "User does not exist!",
      });
    }

    return next();
  }

  async confirmResetPasswordToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { email: passedEmail, code } = req.body as {
        email: string;
        code: string;
      };

      const email = passedEmail?.trim();

      if (!email || !code) {
        return res.status(400).json({
          success: false,
          message: "Email and reset code are required!",
        });
      }

      const isValid = await userService.verifyResetCode(email, code.trim());
      if (!isValid) {
        return res.status(400).json({
          success: false,
          message: "Invalid or expired reset code!",
        });
      }

      (req as any).userEmail = email;
      return next();
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: `Failed to confirm reset code: ${error.message}`,
      });
    }
  }

  async validatePasswords(req: Request, res: Response, next: NextFunction) {
    const validationResult = passwordCheckSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: validationResult.error.issues
          .map((issue) => issue.message)
          .join(", "),
      });
    }
    return next();
  }
}

const userMiddleware = new UserMiddleware();

export default userMiddleware;
