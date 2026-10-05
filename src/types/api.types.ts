import Error from "next/error";

export interface ApiResponse  {
    success: boolean,
    message: string,
    data?: object,
    error?: object,
}