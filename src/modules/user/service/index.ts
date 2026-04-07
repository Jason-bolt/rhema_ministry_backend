import db, { DB } from "../../../../config/db";
import { usersTable } from "../../../../config/db/schemas/User";
import { ICreateUser, IGetUsersFilter, IUpdateUser, IUser } from "../types";
import IService from "./Iservice";
import bcrypt from "bcrypt";
import { camelize } from "../../../../utils/helpers/general";
import logger from "../../../../utils/logger";
import jwt from "jsonwebtoken";
import { getRedisData, setRedisData } from "../../../../utils/helpers/redis";
import { eq } from "drizzle-orm";
import envs from "../../../../config/envs";
import { resetPasswordTokensTable } from "../../../../config/db/schemas/PasswordReset";
import { GenericHelper } from "../../../../utils/helpers/generic.helpers";

class UserService implements IService {
  constructor(private readonly db: DB) {}

  async signUpUser(data: ICreateUser) {
    const hashedPassword = await bcrypt.hash(data.password as string, 10);
    const preparedData = {
      id: GenericHelper.generateUUID(),
      name: data.name,
      email: data.email,
      password: hashedPassword,
    };

    logger.info(`Prepared data: ${JSON.stringify(preparedData)}`);

    const user = await this.db
      .insert(usersTable)
      .values(preparedData)
      .returning();

    logger.info(`User: ${JSON.stringify(user)}`);

    return camelize(user[0]);
  }

  async loginUser(email: string) {
    let userData: IUser | null = null;
    const cachedUsers = await getRedisData(`users:email:${email}`);

    if (!cachedUsers) {
      const user = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email))
        .limit(1);

      await setRedisData(`users:email:${email}`, user);
      userData = camelize(user[0]);
    } else {
      userData = camelize(cachedUsers[0]);
    }

    const tokenData = {
      id: userData?.id,
      name: userData?.name,
      email: userData?.email,
    };

    const token = jwt.sign(tokenData, envs.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    return { token };
  }

  async initiatePasswordReset(email: string) {
    let userData: IUser | null = null;
    const cachedUsers = await getRedisData(`users:email:${email}`);

    if (!cachedUsers) {
      const user = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email))
        .limit(1);

      await setRedisData(`users:email:${email}`, user);
      userData = camelize(user[0]);
    } else {
      userData = camelize(cachedUsers[0]);
    }

    // Generate a 6-digit OTP code
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    // Delete any existing reset token for this user
    await db
      .delete(resetPasswordTokensTable)
      .where(eq(resetPasswordTokensTable.user_id, userData!.id));

    // Insert new reset code
    await db.insert(resetPasswordTokensTable).values({
      user_id: userData!.id,
      reset_token: resetCode,
      expires_at: expiresAt,
    });

    return resetCode;
  }

  async verifyResetCode(email: string, code: string): Promise<boolean> {
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    if (!user[0]) return false;

    const tokenRecord = await db
      .select()
      .from(resetPasswordTokensTable)
      .where(eq(resetPasswordTokensTable.user_id, user[0].id))
      .limit(1);

    if (!tokenRecord[0]) return false;
    if (tokenRecord[0].reset_token !== code) return false;
    if (new Date() > tokenRecord[0].expires_at) return false;

    return true;
  }

  async resetPassword(email: string, password: string) {
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    if (user[0]) {
      // Delete the used reset token
      await db
        .delete(resetPasswordTokensTable)
        .where(eq(resetPasswordTokensTable.user_id, user[0].id));
    }

    const hashedPassword = await bcrypt.hash(password as string, 10);
    const updatedUserData = await db
      .update(usersTable)
      .set({ password: hashedPassword })
      .where(eq(usersTable.email, email))
      .returning();

    return camelize(updatedUserData[0]);
  }

  async getUserById(id: string) {
    const userData = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id));
    return camelize(userData[0]);
  }
}

const userService = new UserService(db);
export default userService;
