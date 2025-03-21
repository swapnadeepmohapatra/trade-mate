import Anthropic from "@anthropic-ai/sdk";
import dotenv from "dotenv";
dotenv.config();

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function getAiAnalysis(analysisJson) {
  try {
    const msg = await anthropic.messages.create({
      model: "claude-3-5-haiku-latest",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `Analyze the financials given as a json below of this company and rate this from 0-10 how good this is for investment. Also tell me some thing about the growth of the company. Only give me a json with keys as investment_rating, cons, pros,recommendation_for_long_term, recommendation_for_short_term, conclusion. The values should be array or points, and the value for the investment_rating should be a number.  \n\n ${JSON.stringify(analysisJson)}`,
        },
      ],
    });

    console.log(msg);

    const data = JSON.parse(
      msg.content[0].text
        .replace("```json", "")
        .replace("```", "")
        .replaceAll("Here's the analysis in JSON format:", "")
    );

    return data;
  } catch (error) {
    console.error("Error getting ai data:", error);
  }
}
