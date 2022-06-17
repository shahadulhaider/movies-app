import axios, { AxiosError } from "axios";
import { ResError } from "types/error";

// Errors
export const getErrorConfig = (error: any | AxiosError): ResError | null => {
  if (axios.isAxiosError(error) && error.response) {
    return {
      name: error.name,
      status: error.response.status,
      message: error.message,
      data: error.response.data,
    } as ResError;
  }
  return null;
};

export const getErrorData = (error: any): ResError => {
  return {
    name: error.name,
    status: error.response.status,
    message: error.message,
    data: error.response.data,
  };
};
