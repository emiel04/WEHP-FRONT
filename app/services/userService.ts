import { AxiosError } from "axios";
import { createError } from "../helper/requesthelper";
import axiosInstance from "../config/axios";

class UserService {
  async getMe() {
    try {
      const response = await axiosInstance.get("/me");
      return response.data;
    } catch (error) {
      if (!(error instanceof AxiosError)) return;
      return createError(error);
    }
  }

  async getUsernames() {
    try {
      const response = await axiosInstance.get("/usernames");
      return response.data;
    } catch (error) {
      if (!(error instanceof AxiosError)) return;
      return createError(error);
    }
  }
}

const userService = new UserService();
export default userService;
