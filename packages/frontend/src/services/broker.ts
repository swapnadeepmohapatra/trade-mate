import axios from "axios";
import { BACKEND_URL } from "../utils/keys";

export const get5PaisaOAuthUrl = async () => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/session/oauth`,
      {
        provider: "5Paisa",
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const get5PaisaAccessToken = async (
  RequestToken: string,
  State: string
) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/session/access-token`,
      {
        RequestToken,
        State,
        provider: "5Paisa",
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
