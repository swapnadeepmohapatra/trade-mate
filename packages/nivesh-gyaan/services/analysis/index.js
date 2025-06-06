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
      system:
        "You are an expert financial analyst with deep knowledge of Indian markets, specializing in evaluating the investment potential of Indian companies by analyzing their financial statements, growth metrics, industry benchmarks, recent news, government policies, and macroeconomic trends to deliver clear, data-backed, and actionable insights tailored for both short-term and long-term investors with a focus on clarity, accuracy, and strategic relevance.",
      messages: [
        {
          role: "user",
          content: `Analyze the financials given as a json below of this company and rate this from 0-10 how good this is for investment. Also tell me some thing about the growth of the company. Only give me a json with keys as investment_rating, cons, pros, recommendation_for_long_term, recommendation_for_short_term, conclusion. The values should be array or points, and the value for the investment_rating should be a number. The analysis should also consider growth indicators such as revenue trends, profit margins, debt levels, and any signals of scalability or expansion. Be precise, and use clear financial reasoning. Be objective, data-driven, and clear. Use only publicly inferable insights and base your evaluation on sound reasoning.  \n\n ${JSON.stringify(analysisJson)}`,
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
