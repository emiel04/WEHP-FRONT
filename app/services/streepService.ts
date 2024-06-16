import { AxiosError } from "axios";
import { createError } from "../helper/requesthelper";
import axiosInstance from "../config/axios";
import { Streepje } from "../config/types";

class StreepService {
  async addStreepje(streepje: Streepje) {
    try {
      const response = await axiosInstance.post("/streepjes", streepje);
      return response.data;
    } catch (error) {
      if (!(error instanceof AxiosError)) return;
      return createError(error);
    }
  }
}

const userService = new StreepService();
export default userService;
