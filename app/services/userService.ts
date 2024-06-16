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

  getUsernames = async (isWehp: boolean | undefined | null = null) => {
    try {
      let queryParam = "";
      if (isWehp !== null && isWehp !== undefined) {
        queryParam = `?isWehp=${isWehp}`;
      }

      const response = await axiosInstance.get(`/usernames${queryParam}`);

      return response.data;
    } catch (error) {
      console.error("Error fetching usernames:", error);
      throw error;
    }
  };

  getUsers = async (isWehp: boolean | undefined | null = null) => {
    try {
      let queryParam = "";
      if (isWehp !== null && isWehp !== undefined) {
        queryParam = `?isWehp=${isWehp}`;
      }
      const response = await axiosInstance.get(`/users${queryParam}`);

      return response.data;
    } catch (error) {
      console.error("Error fetching usernames:", error);
      throw error;
    }
  };
}

const userService = new UserService();
export default userService;
