import { getAiAnalysisData } from "../services/ai-data/index.js";

export const getAiData = async (req, res) => {
  try {
    const { ticker } = req.params;

    const data = await getAiAnalysisData(ticker);

    res.status(200).json({ success: true, body: { data } });
  } catch (error) {
    console.log(error);

    res.status(400).json({ success: false, error: error.message });
  }
};
