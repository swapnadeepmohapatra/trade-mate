import axios from "axios";
import { BACKEND_URL } from "../utils/keys";

export const getNewsList = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/news`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
