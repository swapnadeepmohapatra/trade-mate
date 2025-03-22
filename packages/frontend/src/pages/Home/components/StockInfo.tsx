import { memo, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Checkbox,
  Flex,
  Grid,
  GridItem,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import AiAnalysis from "./AiAnalysis";
import Chart from "./CustomBarChart";
import CustomPieChart from "./CustomPieChart";
import { fetchStockInfo } from "../../../services/stockInfo";

interface StockInfoProps {
  symbol: string;
}

export interface StockInfo {
  symbol: string;
  data: {
    companyInfo: {
      name: string;
      price: string;
      website: string;
    };
    valuationRatios: {
      "Market Cap": string;
      "Current Price": string;
      "High / Low": string;
      "Stock P/E": string;
      "Book Value": string;
      "Dividend Yield": string;
      ROCE: string;
      ROE: string;
      "Face Value": string;
    };
    quarterlyResults: {
      headers: string[];
      rows: { key: string; values: string[] }[];
    };
    profitLoss: {
      headers: string[];
      rows: { key: string; values: string[] }[];
    };
    balanceSheet: {
      headers: string[];
      rows: { key: string; values: string[] }[];
    };
    cashFlow: {
      headers: string[];
      rows: { key: string; values: string[] }[];
    };
    shareholding: {
      headers: string[];
      rows: { key: string; values: string[] }[];
    };
    ratios: {
      headers: string[];
      rows: { key: string; values: string[] }[];
    };
    metadata: {
      lastUpdated: string;
      url: string;
      ticker: string;
      currentDate: string;
    };
  };
}

const StockInfoComponent = memo(function StockInfo({ symbol }: StockInfoProps) {
  const [stockInfo, setStockInfo] = useState<StockInfo | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenAttributes,
    onOpen: onOpenAttributes,
    onClose: onCloseAttributes,
  } = useDisclosure();
  const [selectedChart, setSelectedChart] = useState<
    | "quarterlyResults"
    | "profitLoss"
    | "balanceSheet"
    | "cashFlow"
    | "shareholding"
    | "ratios"
    | null
  >(null);

  const [selectedAttributes, setSelectedAttributes] = useState<{
    quarterlyResults: string[];
    profitLoss: string[];
    balanceSheet: string[];
    cashFlow: string[];
    shareholding: string[];
    ratios: string[];
  }>({
    quarterlyResults: ["sales", "expenses", "operating profit", "net profit"],
    profitLoss: ["sales", "expenses", "operating profit", "net profit"],
    balanceSheet: [
      "equity capital",
      "reserves",
      "borrowings",
      "total liabilities",
    ],
    cashFlow: [
      "cash from operating activity",
      "cash from financing activity",
      "net cash flow",
    ],
    shareholding: ["promoters", "fiis", "diis", "public"],
    ratios: ["debtor days", "rocs %", "working capital days"],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (symbol) {
      setLoading(true);
      setError(null);
      fetchStockInfo(symbol)
        .then((data) => {
          if (data?.body?.data?.error) {
            setLoading(false);
            setError("Failed to fetch stock info");
          }
          setLoading(false);
          setStockInfo(data?.body?.data);
        })
        .catch((error) => {
          setLoading(false);
          setError("Failed to fetch stock info");
          console.error(error);
        });
    }
  }, [symbol]);

  if (loading) {
    return (
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        height={"100%"}
        width={"100%"}
      >
        <Spinner />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        height={"100%"}
        width={"100%"}
      >
        <Text>{error}</Text>
      </Flex>
    );
  }

  return (
    <Flex
      style={{
        overflowY: "auto",
        padding: "1rem",
        flexDirection: "column",
        gap: "1rem",
        maxHeight: "calc(100vh - 12rem - 42px)",
      }}
    >
      <Card
        background={"surface.100"}
        borderColor={"surface.400"}
        borderWidth={1}
        width={"100%"}
      >
        <CardBody>
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Text fontSize={"2xl"} fontWeight={"bold"}>
              {stockInfo?.data?.companyInfo.name}
            </Text>
            {(stockInfo?.data?.quarterlyResults?.rows?.length ?? 0) > 0 && (
              <Button colorScheme={"primary"} onClick={onOpen}>
                Get AI Analysis
              </Button>
            )}
          </Flex>
        </CardBody>
      </Card>
      <Card
        background={"surface.100"}
        borderColor={"surface.400"}
        borderWidth={1}
        width={"100%"}
      >
        <CardBody>
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Flex
              alignItems={"flex-start"}
              justifyContent={"space-between"}
              flexDirection={"column"}
            >
              <Flex justifyContent={"space-between"} width={"100%"} gap={8}>
                <Text color={"surface.600"}>Market Cap</Text>
                <Text fontWeight={"bold"}>
                  {stockInfo?.data?.valuationRatios?.["Market Cap"]}
                </Text>
              </Flex>
              <Flex justifyContent={"space-between"} width={"100%"} gap={8}>
                <Text color={"surface.600"}>Current Price</Text>
                <Text fontWeight={"bold"}>
                  {stockInfo?.data?.valuationRatios?.["Current Price"]}
                </Text>
              </Flex>
              <Flex justifyContent={"space-between"} width={"100%"} gap={8}>
                <Text color={"surface.600"}>High / Low</Text>
                <Text fontWeight={"bold"}>
                  {stockInfo?.data?.valuationRatios?.["High / Low"]}
                </Text>
              </Flex>
            </Flex>
            <Flex
              alignItems={"flex-start"}
              justifyContent={"space-between"}
              flexDirection={"column"}
            >
              <Flex justifyContent={"space-between"} width={"100%"} gap={8}>
                <Text color={"surface.600"}>Stock P/E</Text>
                <Text fontWeight={"bold"}>
                  {stockInfo?.data?.valuationRatios?.["Stock P/E"]}
                </Text>
              </Flex>
              <Flex justifyContent={"space-between"} width={"100%"} gap={8}>
                <Text color={"surface.600"}>Book Value</Text>
                <Text fontWeight={"bold"}>
                  {stockInfo?.data?.valuationRatios?.["Book Value"]}
                </Text>
              </Flex>
              <Flex justifyContent={"space-between"} width={"100%"} gap={8}>
                <Text color={"surface.600"}>Dividend Yield</Text>
                <Text fontWeight={"bold"}>
                  {stockInfo?.data?.valuationRatios?.["Dividend Yield"]}
                </Text>
              </Flex>
            </Flex>
            <Flex
              alignItems={"flex-start"}
              justifyContent={"space-between"}
              flexDirection={"column"}
            >
              <Flex justifyContent={"space-between"} width={"100%"} gap={8}>
                <Text color={"surface.600"}>ROCE</Text>
                <Text fontWeight={"bold"}>
                  {stockInfo?.data?.valuationRatios?.["ROCE"]}
                </Text>
              </Flex>
              <Flex justifyContent={"space-between"} width={"100%"} gap={8}>
                <Text color={"surface.600"}>ROE</Text>
                <Text fontWeight={"bold"}>
                  {stockInfo?.data?.valuationRatios?.["ROE"]}
                </Text>
              </Flex>
              <Flex justifyContent={"space-between"} width={"100%"} gap={8}>
                <Text color={"surface.600"}>Face Value</Text>
                <Text fontWeight={"bold"}>
                  {stockInfo?.data?.valuationRatios?.["Face Value"]}
                </Text>
              </Flex>
            </Flex>
            <Flex
              alignItems={"flex-start"}
              justifyContent={"space-between"}
              flexDirection={"column"}
            >
              <Flex justifyContent={"space-between"} width={"100%"} gap={8}>
                <Text color={"surface.600"}>Price</Text>
                <Text fontWeight={"bold"}>
                  {stockInfo?.data?.companyInfo?.price}
                </Text>
              </Flex>
              <Flex justifyContent={"space-between"} width={"100%"} gap={8}>
                <Text color={"surface.600"}>Website</Text>
                <Link href={stockInfo?.data?.companyInfo?.website} isExternal>
                  <Text color={"blue.200"}>Visit</Text>
                </Link>
              </Flex>
              <Flex justifyContent={"space-between"} width={"100%"} gap={8}>
                <Text color={"surface.600"}>Last Updated</Text>
                <Text fontWeight={"bold"}>
                  {stockInfo?.data?.metadata?.lastUpdated
                    ? new Date(
                        stockInfo.data.metadata.lastUpdated
                      ).toLocaleDateString()
                    : "N/A"}
                </Text>
              </Flex>
            </Flex>
            <Flex
              alignItems={"flex-start"}
              justifyContent={"space-between"}
              flexDirection={"column"}
            >
              <Image
                src={`https://logo.clearbit.com/${stockInfo?.data?.companyInfo?.website}`}
                height={"72px"}
              />
            </Flex>
          </Flex>
        </CardBody>
      </Card>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        {(
          [
            "quarterlyResults",
            "profitLoss",
            "cashFlow",
            "balanceSheet",
            // "ratios",
            "shareholding",
          ] as Array<
            | "quarterlyResults"
            | "profitLoss"
            | "balanceSheet"
            | "cashFlow"
            | "shareholding"
            | "ratios"
          >
        ).map(
          (chart) =>
            (stockInfo?.data?.[chart]?.rows?.length ?? 0) > 0 && (
              <GridItem key={chart}>
                <Flex
                  style={{
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Flex
                    style={{
                      flexDirection: "column",
                    }}
                  >
                    <Text fontWeight={"bold"}>
                      {chart
                        .replace(/([a-z])([A-Z])/g, "$1 $2")
                        .replace(/\b\w/g, (char) => char.toUpperCase())}
                    </Text>
                    <Text fontSize={"sm"} color={"surface.600"}>
                      {chart === "shareholding" ? "(in %)" : "(in Cr.)"}
                    </Text>
                  </Flex>
                  <Button
                    colorScheme="gray"
                    onClick={() => {
                      onOpenAttributes();
                      setSelectedChart(chart);
                    }}
                  >
                    Change Attributes
                  </Button>
                </Flex>
                <Chart
                  data={
                    stockInfo?.data?.[chart]
                      ? {
                          headers: stockInfo?.data?.[chart]?.headers,
                          rows: stockInfo?.data?.[chart]?.rows?.filter((row) =>
                            selectedAttributes?.[chart]?.includes(
                              row.key
                                .replace(/(\w+)\s*\+/g, "$1")
                                .toLocaleLowerCase()
                            )
                          ),
                        }
                      : {
                          headers: [],
                          rows: [],
                        }
                  }
                  unit={chart === "shareholding" ? "%" : "Cr."}
                />
              </GridItem>
            )
        )}
        {(stockInfo?.data?.shareholding?.rows?.length ?? 0) > 0 && (
          <GridItem>
            <Text fontWeight={"bold"}>Current Shareholding Pattern</Text>
            <CustomPieChart
              unit="%"
              data={stockInfo?.data?.shareholding || { headers: [], rows: [] }}
            />
          </GridItem>
        )}
      </Grid>
      <Modal isOpen={isOpen} onClose={onClose} size={"2xl"}>
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent>
          <ModalHeader>
            AI Analysis for {stockInfo?.data?.companyInfo?.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AiAnalysis ticker={stockInfo?.symbol || ""} />
          </ModalBody>
          <ModalFooter>
            <Text color={"surface.600"} fontSize={"sm"}>
              Disclaimer: The AI Analysis is based on historical data and may
              not be accurate. This is not a financial advice. Please consult a
              financial advisor before making any investment decisions.
            </Text>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpenAttributes} onClose={onCloseAttributes} size={"2xl"}>
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent>
          <ModalHeader>Change Attributes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDirection={"column"} gap={4}>
              {selectedChart &&
                stockInfo?.data[selectedChart].rows?.map((row) => (
                  <Checkbox
                    key={row.key}
                    defaultChecked={selectedAttributes[selectedChart].includes(
                      row?.key?.replace(/(\w+)\s*\+/g, "$1").toLocaleLowerCase()
                    )}
                    value={row.key
                      .replace(/(\w+)\s*\+/g, "$1")
                      .toLocaleLowerCase()}
                    colorScheme="primary"
                    onChange={() => {
                      setSelectedAttributes({
                        ...selectedAttributes,
                        [selectedChart]: selectedAttributes[
                          selectedChart
                        ].includes(
                          row.key
                            .replace(/(\w+)\s*\+/g, "$1")
                            .toLocaleLowerCase()
                        )
                          ? selectedAttributes[selectedChart]?.filter(
                              (key) =>
                                key
                                  .replace(/(\w+)\s*\+/g, "$1")
                                  .toLocaleLowerCase() !==
                                row.key
                                  .replace(/(\w+)\s*\+/g, "$1")
                                  .toLocaleLowerCase()
                            )
                          : [
                              ...selectedAttributes[selectedChart],
                              row.key
                                .replace(/(\w+)\s*\+/g, "$1")
                                .toLocaleLowerCase(),
                            ],
                      });
                    }}
                  >
                    {row.key.replace(/(\w+)\s*\+/g, "$1")}
                  </Checkbox>
                ))}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
});

export default StockInfoComponent;
