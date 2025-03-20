import redis from "redis";
import { scrapeScreener } from "../scrape/index.js";

const client = redis.createClient({
  username: "default",
  password: "BcyPkxJcBL6h09mVzltzPGnpCfa2OVFG",
  socket: {
    host: "redis-14644.crce182.ap-south-1-1.ec2.redns.redis-cloud.com",
    port: 14644,
  },
});

async function fetchDataWithCache(key) {
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

    await client.quit();

    return {
      symbol,
      data,
    };
  } catch (error) {
    await client.quit();
    console.error("Error in example:", error);
    return {
      error: error.message,
    };
  }
};
