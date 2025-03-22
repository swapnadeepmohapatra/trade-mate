import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { colors } from "../../../utils/colors";

interface CustomPieChartProps {
  data: {
    headers: string[];
    rows: { key: string; values: string[] }[];
  };
  unit: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: {
    name: string;
    value: number;
    payload: { name: string; fill: string };
  }[];
  unit: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  unit,
}) => {
  if (active && payload && payload.length) {
    return (
      <Box
        style={{
          backgroundColor: "black",
          color: "white",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        {payload.map((entry, index) => (
          <Flex
            key={index}
            style={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
            gap={2}
          >
            <Box
              style={{
                width: 15,
                height: 15,
                backgroundColor: payload[index].payload.fill,
                marginRight: 5,
                borderRadius: 5,
              }}
            />
            <Text flex={1} style={{ color: "white" }}>
              {entry.name}:
            </Text>
            <Text style={{ color: "white" }}>
              {entry.value} {unit}
            </Text>
          </Flex>
        ))}
      </Box>
    );
  }
  return null;
};

function CustomPieChart({ data, unit }: CustomPieChartProps) {
  const transformedData = data.rows
    .map((row) => ({
      name: row.key,
      value: Number(row.values[0]),
    }))
    .filter((row) => row.name !== "No. of Shareholders");

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          data={transformedData}
          innerRadius={100}
          outerRadius={150}
          fill="#c1c1c1"
          stroke="none"
          paddingAngle={0}
        >
          {transformedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip
          content={<CustomTooltip unit={unit} />}
          cursor={{ fill: "rgba(0,0,0,0)" }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default CustomPieChart;
