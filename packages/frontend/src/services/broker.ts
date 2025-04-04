import axios from "axios";
import { BACKEND_URL } from "../utils/keys";

export const getAllBrokers = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/brokers`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

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

export const getAngelOneOAuthUrl = async () => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/session/oauth`,
      {
        provider: "AngelOne",
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

export const getAngelOneAccessToken = async (
  RequestToken: string,
  State: string
) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/session/access-token`,
      {
        RequestToken,
        State,
        provider: "AngelOne",
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

export const getHdfcSkyOAuthUrl = async () => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/session/oauth`,
      {
        provider: "HdfcSky",
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

export const getHdfcSkyAccessToken = async (
  RequestToken: string,
  State: string
) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/session/access-token`,
      {
        RequestToken,
        State,
        provider: "HdfcSky",
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

export const getUpstoxOAuthUrl = async () => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/session/oauth`,
      {
        provider: "Upstox",
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

export const getUpstoxAccessToken = async (
  RequestToken: string,
  State: string
) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/session/access-token`,
      {
        RequestToken,
        State,
        provider: "Upstox",
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

export const getOtherBrokersOAuthUrl = async (brokerName: string) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/session/oauth`,
      {
        provider: brokerName,
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
