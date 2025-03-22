import redis from "redis";
import { scrapeScreener } from "../scrape/index.js";
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

async function fetchDataWithCache(key) {
  try {
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
    }

    const freshData = await fetchFreshData(key);

    const dataToCache = {
      data: freshData,
      timestamp: new Date().toISOString(),
    };

    await client.set(key, JSON.stringify(dataToCache));

    return freshData;
  } catch (error) {
    console.error("Error fetching data with cache:", error);
    throw error;
  }
}

async function fetchFreshData(symbol) {
  try {
    const data = await scrapeScreener(symbol);
    data.metadata.currentDate = new Date().toISOString();
    return data;
  } catch (error) {
    console.error("Error fetching fresh data:", error);
    throw error;
  }
}

export const getTickerData = async (symbol) => {
  try {
    const data = await fetchDataWithCache(symbol);
    return {
      symbol,
      data,
    };
  } catch (error) {
    console.error("Error in getTickerData:", error);
    return {
      error: error.message,
    };
  }
};

process.on("SIGINT", async () => {
  console.log("Closing Redis connection...");
  await client.quit();
  process.exit();
});
