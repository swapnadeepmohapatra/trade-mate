import axios from "axios";
import { BACKEND_URL } from "../utils/keys";

export const getMargin = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/margin`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
