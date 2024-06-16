import {AxiosError} from "axios";

const createError = (error: any) => {
    if (!(error instanceof AxiosError)){
        console.error(error);
        return {
            error: true,
            message: "An error occurred"
        }
    }

    return {
        error: true,
        message: (error.response?.data as any).error
    };
};

export {createError};