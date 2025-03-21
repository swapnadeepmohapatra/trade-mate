import redis from "redis";
import { getAiAnalysis } from "../analysis/index.js";
import dotenv from "dotenv";
dotenv.config();

const client = redis.createClient({
  username: process.env.REDIS_CONFIG_USERNAME,
  password: process.env.REDIS_CONFIG_PASSWORD,
  socket: {
    host: process.env.REDIS_CONFIG_HOST,
    port: process.env.REDIS_CONFIG_PORT,
  },
});

async function fetchDataFromCache(key) {
  try {
    await client.connect();

    const cachedData = await client.get(key);

    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      const storedDate = new Date(parsedData.timestamp);
      const currentDate = new Date();

      const diffTime = Math.abs(currentDate - storedDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays < 3) {
        parsedData.data.metadata.currentDate = new Date().toISOString();
        return parsedData.data;
      }
    } else {
      throw new Error("No data found in cache");
    }
  } catch (error) {
    console.error("Error fetching data with cache:", error);
    throw error;
  }
}

export const getTickerData = async (symbol) => {
  try {
    const data = await fetchDataFromCache(symbol);

    await client.quit();

    return data;
  } catch (error) {
    await client.quit();
    console.error("Error in example:", error);
    return {
      error: error.message,
    };
  }
};

export const getAiAnalysisData = async (symbol) => {
  try {
    const data = await getTickerData(symbol);
    console.log(data);

    if (data.error) {
      throw new Error(data.error);
    }

    const aiData = await getAiAnalysis(data);

    return aiData;
  } catch (error) {
    console.error("Error getting ai analysis data:", error);
    throw error;
  }
};
