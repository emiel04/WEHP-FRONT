import { AxiosError } from "axios";
import { createError } from "../helper/requesthelper";
import axiosInstance from "../config/axios";
import { Category } from "../config/types";

class CategoryService {
  async getCategories() {
    try {
      const response = await axiosInstance.get<Category[]>("/categories");
      return response.data;
    } catch (error) {
      if (!(error instanceof AxiosError)) return;
      return createError(error);
    }
  }
}

const categoryService = new CategoryService();
export default categoryService;
