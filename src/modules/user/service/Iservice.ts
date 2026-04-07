import { ICreateUser, IUser } from "../types";

interface IService {
  signUpUser: (data: ICreateUser) => Promise<IUser>;
  loginUser: (email: string) => Promise<{ token: string }>;
  getUserById: (id: string) => Promise<IUser>;
  initiatePasswordReset: (email: string) => Promise<string>;
  verifyResetCode: (email: string, code: string) => Promise<boolean>;
  resetPassword: (email: string, password: string) => Promise<IUser>;
}

export default IService;
