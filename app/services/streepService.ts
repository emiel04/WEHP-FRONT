import { AxiosError } from "axios";
import { createError } from "../helper/requesthelper";
import axiosInstance from "../config/axios";
import { Streepje, StreepjeCreate } from "../config/types";

class StreepService {
  async addStreepje(streepje: StreepjeCreate) {
    try {
      const response = await axiosInstance.post("/streepjes", streepje);
      return response.data;
    } catch (error) {
      if (!(error instanceof AxiosError)) return;
      return createError(error);
    }
  }

  async getStreepjes(userId: number, full: boolean = false) {
    try {
      const response = await axiosInstance.get(
        `/streepjes/${userId}/?full=${full}`,
      );
      return response.data;
    } catch (error) {
      if (!(error instanceof AxiosError)) return;
      return createError(error);
    }
  }

  removeStreepje(id: number) {
    return axiosInstance.delete(`/streepjes/${id}`);
  }
}

const userService = new StreepService();
export default userService;
