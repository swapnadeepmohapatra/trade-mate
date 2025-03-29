import { getMarketDataList } from "../services/MarketData/index.js";

export const getMarketData = async (req, res) => {
  try {
    const { symbol } = req.query;
    const marketData = await getMarketDataList(req.prisma, symbol);

    res.status(200).json({ success: true, body: { marketData } });
  } catch (error) {
    console.log(error);

    res.status(400).json({ success: false, error: error.message });
  }
};
