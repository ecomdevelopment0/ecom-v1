import { localStorageProvider } from "../../utils/methods";
import { GenericPaths } from "../genericPaths";
import { postAPI } from "../genericRequests";

export type TUserAuthProps =
  | {
      isAuthenticated: boolean;
      userId: string;
      name: string;
      email: string;
      phoneNo: string;
      city: string;
      state: string;
      accessToken: string;
      refreshToken: string;
    }
  | undefined;

interface AuthProvider {
  userAuth: TUserAuthProps;
  signup(
    name: string,
    email: string,
    phoneNo: string,
    password: string,
    city: string,
    state: string
  ): Promise<any>;
  verifyOtp(otp: string, otpToken: string, email: string): Promise<any>;
  login(email: string, password: string): Promise<any>;
  newAccessToken(): Promise<any>;
  forgotPassword(email: string): Promise<any>;
  verifyAndChangePassword(
    email: string,
    otp_token: string,
    otp: string,
    newPassword: string
  ): Promise<any>;
  updateUser(id: string, updateObject: any): Promise<any>;
  syncAuthProvider(): void;
  logout(): Promise<void>;
}

export const authProvider: AuthProvider = {
  userAuth: undefined,
  async signup(
    name: string,
    email: string,
    phoneNo: string,
    password: string,
    city: string,
    state: string
  ): Promise<any> {
    try {
      const response = await postAPI(GenericPaths.SIGNUP, {
        name,
        email,
        phoneNo,
        password,
        city,
        state,
      });
      return response;
    } catch (error: any) {
      return error.response.data;
    }
  },
  async verifyOtp(otp: string, otpToken: string, email: string): Promise<any> {
    try {
      const response = await postAPI(GenericPaths.SIGNUP_VERIFY, {
        otpToken,
        email,
        otp,
      });
      authProvider.userAuth = {
        ...response,
        isAuthenticated: true,
      };

      return response;
    } catch (error: any) {
      return error.response.data;
    }
  },
  async login(email: string, password: string): Promise<any> {
    try {
      const response = await postAPI(GenericPaths.LOGIN, {
        email,
        password,
      });
      authProvider.userAuth = {
        ...response,
        isAuthenticated: true,
      };
      return response;
    } catch (error: any) {
      return error.response.data;
    }
  },
  async newAccessToken(): Promise<any> {
    try {
      const response = await postAPI(GenericPaths.NEW_ACCESS_TOKEN, {});
      return response;
    } catch (error: any) {
      return error.response.data;
    }
  },
  async forgotPassword(email: string): Promise<any> {
    try {
      const response = await postAPI(GenericPaths.FORGOT_PASSWORD, {
        email,
      });
      return response;
    } catch (error: any) {
      return error.response.data;
    }
  },
  async verifyAndChangePassword(
    email: string,
    otp_token: string,
    otp: string,
    newPassword: string
  ): Promise<any> {
    try {
      const response = await postAPI(GenericPaths.FORGOT_PASSWORD_VERIFY, {
        email,
        otp_token,
        otp,
        newPassword,
      });
      return response;
    } catch (error: any) {
      return error.response.data;
    }
  },
  async updateUser(id: string, updateObject: any): Promise<any> {
    try {
      const response = await postAPI(
        GenericPaths.USER_UPDATE + id,
        updateObject
      );
      return response;
    } catch (error: any) {
      return error.response.data;
    }
  },
  syncAuthProvider(): void {
    if (authProvider.userAuth) {
      localStorageProvider.save(
        GenericPaths.AUTH_DATA_LOCAL_STORAGE,
        authProvider.userAuth
      );
    } else {
      const user = localStorageProvider.get(
        GenericPaths.AUTH_DATA_LOCAL_STORAGE
      );
      if (user) {
        authProvider.userAuth = user;
      }
    }
  },
  async logout(): Promise<any> {
    authProvider.userAuth = undefined;
    localStorageProvider.remove(GenericPaths.AUTH_DATA_LOCAL_STORAGE);
  },
};
