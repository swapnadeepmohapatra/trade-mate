import { getMarketDataList } from "../services/MarketData/index.js";

export const getMarketData = async (req, res) => {
  try {
    const { userId } = req.user;
    const { symbol } = req.query;
    const marketData = await getMarketDataList(req.prisma, userId, symbol);

    res.status(200).json({ success: true, body: { marketData } });
  } catch (error) {
    console.log(error);

    res.status(400).json({ success: false, error: error.message });
  }
};
