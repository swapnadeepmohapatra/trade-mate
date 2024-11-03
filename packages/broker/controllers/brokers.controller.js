import { getBrokerList } from "../services/Brokers/index.js";

export const getBrokers = async (req, res) => {
  try {
    const { userId } = req.user;
    const brokers = await getBrokerList(req.prisma, userId);

    res.status(200).json({ success: true, body: { brokers } });
  } catch (error) {
    console.log(error);

    res.status(400).json({ success: false, error: error.message });
  }
};
