import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { colors } from "../../../utils/colors";
import { Box, Flex, Text } from "@chakra-ui/react";

interface CustomBarChartProps {
  data: {
    headers: string[];
    rows: { key: string; values: string[] }[];
  };
  unit: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: { name: string; value: number; payload: { name: string } }[];
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
        <Text>{payload[0].payload.name}</Text>
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
                backgroundColor: colors[index % colors.length],
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

const CustomBarChart = ({ data, unit }: CustomBarChartProps) => {
  const transformedData = data.headers.slice(1).map((year, index) => {
    const dataPoint: { [key: string]: number | string } = {
      name: year,
    };
    data.rows.forEach((row) => {
      dataPoint[row.key] = Number(row.values[index]);
    });
    return dataPoint;
  });

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={transformedData}>
        <XAxis dataKey="name" stroke="#8B8B8B" />
        {/* <YAxis stroke="#8B8B8B" /> */}
        {/* <Tooltip
          cursor={{ fill: "rgba(0,0,0,0)" }}
          wrapperStyle={{
            background: "black",
          }}
        /> */}
        <Tooltip
          content={<CustomTooltip unit={unit} />}
          cursor={{ fill: "rgba(0,0,0,0)" }}
        />
        {/* <Legend /> */}
        {data.rows.map((row, index) => (
          <Bar
            key={index}
            dataKey={row.key}
            fill={colors[index % colors.length]}
            radius={[8, 8, 0, 0]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;
