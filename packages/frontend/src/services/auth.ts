import axios from "axios";
import { BACKEND_URL } from "../utils/keys";

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/auth/login`,
      {
        email,
        password,
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

export const signup = async (name: string, email: string, password: string) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/auth/signup`,
      {
        name,
        email,
        password,
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

export const logout = async () => {
  try {
    const response = await axios.post(`${BACKEND_URL}/auth/logout`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getUser = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/auth/user`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const googleLoginUrl = `${BACKEND_URL}/auth/google`;
