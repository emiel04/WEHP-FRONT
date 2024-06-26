import { AxiosError } from "axios";

const createError = (error: any) => {
  if (!(error instanceof AxiosError)) {
    console.error(error);
    return {
      error: true,
      message: "An error occurred",
    };
  }

  if (!error.response) {
    console.error(error);
    return {
      error: true,
      message: "An error occurred",
    };
  }

  return {
    error: true,
    message: error.response.data.error,
  };
};

export { createError };
