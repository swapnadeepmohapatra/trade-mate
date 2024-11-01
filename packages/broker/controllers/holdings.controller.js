import { getStockHoldings } from "../services/Holdings/index.js";

export const getHoldings = async (req, res) => {
  try {
    const { userId } = req.user;

    const holdings = await getStockHoldings(req.prisma, "HdfcSky", userId);

    res.status(200).json({ success: true, body: { holdings } });
  } catch (error) {
    console.log(error);

    res.status(400).json({ success: false, error: error.message });
  }
};
