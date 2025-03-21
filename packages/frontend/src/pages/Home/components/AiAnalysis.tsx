import { Flex, Text } from "@chakra-ui/react";
import React, { memo, useEffect, useState } from "react";
// import { fetchStockAiInfo } from "../../../services/stockInfo";

const data = {
  success: true,
  body: {
    data: {
      investment_rating: 8,
      pros: [
        "Consistent revenue growth",
        "Strong profitability with stable Operating Profit Margins (24%)",
        "High Return on Capital Employed (ROCE) of 40%",
        "Robust cash flow from operating activities",
        "Strong dividend history",
        "Steady increase in net profit over years",
      ],
      cons: [
        "Slight volatility in quarterly results",
        "Decreasing public shareholding",
        "Dependence on IT services market",
        "Potential global economic uncertainties",
      ],
      recommendation_for_long_term: [
        "Strong buy recommendation",
        "Stable and growing company",
        "Good potential for long-term investment",
        "Consistent dividend payouts",
      ],
      recommendation_for_short_term: [
        "Moderate potential",
        "Stable stock price",
        "Consider systematic investment",
        "Monitor quarterly performance",
      ],
      conclusion: [
        "Infosys is a fundamentally strong company",
        "Suitable for conservative and growth-oriented investors",
        "Recommended as a core portfolio stock",
      ],
    },
  },
};

export interface AiData {
  investment_rating: number;
  pros: string[];
  cons: string[];
  recommendation_for_long_term: string[];
  recommendation_for_short_term: string[];
  conclusion: string[];
}

interface AiAnalysisProps {
  ticker: string;
}

const AiAnalysisCompnent = memo(function AiAnalysis({
  ticker,
}: AiAnalysisProps) {
  const [aiData, setAiData] = useState<AiData | null>(null);

  useEffect(() => {
    // fetchStockAiInfo(ticker).then((data) => {
    //   setAiData(data);
    // })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    setAiData(data.body.data);
    console.log("API Call");
  }, [ticker]);

  if (aiData === null) {
    return <Text>Loading...</Text>;
  }

  return (
    <Flex direction={"column"} gap={4}>
      <Flex gap={2}>
        <Text fontWeight={"bold"}>Investment Rating:</Text>
        <Text>⭐️ {aiData.investment_rating}/10</Text>
      </Flex>
      <Flex direction={"column"}>
        <Text fontWeight={"bold"}>Pros:</Text>
        <Flex direction={"column"}>
          {aiData.pros.map((pro: string, index: number) => (
            <Text key={index}>✅ {pro}</Text>
          ))}
        </Flex>
      </Flex>
      <Flex direction={"column"}>
        <Text fontWeight={"bold"}>Cons:</Text>
        <Flex direction={"column"}>
          {aiData.cons.map((con: string, index: number) => (
            <Text key={index}>🔴 {con}</Text>
          ))}
        </Flex>
      </Flex>
      <Flex direction={"column"}>
        <Text fontWeight={"bold"}>Recommendation for Long Term:</Text>
        <Flex direction={"column"}>
          {aiData.recommendation_for_long_term.map(
            (rec: string, index: number) => (
              <Text key={index}>💡 {rec}</Text>
            )
          )}
        </Flex>
      </Flex>
      <Flex direction={"column"}>
        <Text fontWeight={"bold"}>Recommendation for Short Term:</Text>
        <Flex direction={"column"}>
          {aiData.recommendation_for_short_term.map(
            (rec: string, index: number) => (
              <Text key={index}>💡 {rec}</Text>
            )
          )}
        </Flex>
      </Flex>
      <Flex direction={"column"}>
        <Text fontWeight={"bold"}>Conclusion:</Text>
        <Flex direction={"column"}>
          {aiData.conclusion.map((conc: string, index: number) => (
            <Text key={index}>🔹 {conc}</Text>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
});

export default AiAnalysisCompnent;
