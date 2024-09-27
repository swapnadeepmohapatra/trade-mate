import { BACKEND_URL } from "../utils/keys";

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const signup = async (name: string, email: string, password: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const logout = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
