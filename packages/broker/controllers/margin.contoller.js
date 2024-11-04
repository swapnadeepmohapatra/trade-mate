import { getMarginForProvider } from "../services/Margin/index.js";

export const getMargin = async (req, res) => {
  try {
    const { userId } = req.user;

    const margin = await getMarginForProvider(req.prisma, "5Paisa", userId);

    res.status(200).json({ success: true, body: { margin } });
  } catch (error) {
    console.log(error);

    res.status(400).json({ success: false, error: error.message });
  }
};
