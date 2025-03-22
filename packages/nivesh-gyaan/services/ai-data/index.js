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

client.connect().catch(console.error);

async function fetchFinDataFromCache(key) {
  try {
    const cachedData = await client.get(key);
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    throw new Error("No data found in cache");
  } catch (error) {
    console.error("Error fetching data with cache:", error);
    throw error;
  }
}

export const getTickerData = async (symbol) => {
  try {
    return await fetchFinDataFromCache(symbol);
  } catch (error) {
    console.error("Error in getTickerData:", error);
    return { error: error.message };
  }
};

export const getAiAnalysisData = async (symbol) => {
  try {
    const cachedData = await client.get(`ai-${symbol}`);

    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const data = await getTickerData(symbol);

    if (data.error) {
      throw new Error(data.error);
    }

    const aiData = await getAiAnalysis(data);

    await client.set(`ai-${symbol}`, JSON.stringify(aiData));

    return aiData;
  } catch (error) {
    console.error("Error getting ai analysis data:", error);
    throw error;
  }
};

process.on("SIGINT", async () => {
  await client.quit();
  process.exit();
});
