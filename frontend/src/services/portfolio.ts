import axios from "axios";
import { BACKEND_URL } from "../utils/keys";

export const getHoldings = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/holdings`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
