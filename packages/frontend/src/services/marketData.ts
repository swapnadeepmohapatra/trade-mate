import axios from "axios";
import { BACKEND_URL } from "../utils/keys";

export const fetchSymbols = async (query: string) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/market-data`, {
      withCredentials: true,
      params: { symbol: query },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
