import axios from "axios";
import { BACKEND_URL } from "../utils/keys";

export const fetchStockInfo = async (ticker: string) => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/artha-gyan/${ticker.toLocaleLowerCase()}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching stock info");
  }
};

export const fetchStockAiInfo = async (ticker: string) => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/nivesh-gyaan/${ticker.toLocaleLowerCase()}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching ai analysis info");
  }
};
