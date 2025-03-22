import React, { useState, useEffect } from "react";
import {
  Box,
  Input,
  VStack,
  Text,
  Spinner,
  Flex,
  Stack,
  Container,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { fetchSymbols } from "../../../services/marketData";
import TradingViewWidget from "./TradingViewWidget";
import StockInfo from "./StockInfo";

interface Stock {
  exch: string;
  fullName: string;
  id: string;
  isin: string;
  name: string;
  scripData: string;
  symbolRoot: string;
}

const Watchlist: React.FC = () => {
  const [query, setQuery] = useState("");
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);

  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (debouncedQuery && debouncedQuery.length > 2) {
      setLoading(true);
      fetchSymbols(debouncedQuery).then((data) => {
        setStocks(data.body.marketData);
        setLoading(false);
      });
    } else {
      setStocks([]);
    }
  }, [debouncedQuery]);

  return (
    <Flex>
      <Box padding="4" width="sm" margin="auto" paddingTop="0">
        <Input
          placeholder="Search stocks..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          marginBottom="4"
        />
        <Container height={"2xl"} overflowY={"scroll"}>
          {loading ? (
            <Spinner />
          ) : (
            <VStack align="start" spacing="4">
              {debouncedQuery.length <= 2 && (
                <Text>Enter at least 3 characters to search</Text>
              )}
              {stocks.length === 0 && debouncedQuery.length > 2 && (
                <Text>No records found</Text>
              )}
              {stocks.length > 0 &&
                stocks
                  .sort((a, b) => b.fullName.localeCompare(a.fullName))
                  .map((stock) => (
                    <Box
                      key={stock.id}
                      w="100%"
                      py="2"
                      px="4"
                      border="1px"
                      borderRadius="md"
                      borderColor="gray.200"
                      onClick={() => setSelectedStock(stock)}
                      _hover={{
                        cursor: "pointer",
                        backgroundColor: "surfaceMixed.100",
                      }}
                      backgroundColor={
                        selectedStock?.id === stock.id
                          ? "surfaceMixed.100"
                          : "transparent"
                      }
                    >
                      <Stack justify="space-between">
                        <Flex justify="space-between">
                          <Text fontWeight="bold">{stock.symbolRoot}</Text>
                          <Text
                            backgroundColor="surfaceMixed.200"
                            px="2"
                            py="0.5"
                            borderRadius={"sm"}
                          >
                            {stock.exch === "N" ? "NSE" : "BSE"}
                          </Text>
                        </Flex>
                        <Text>{stock.fullName}</Text>
                      </Stack>
                    </Box>
                  ))}
            </VStack>
          )}
        </Container>
      </Box>

      <Box flex={1}>
        <Tabs style={{ height: "100%" }} colorScheme="primary" isLazy>
          <TabList>
            <Tab>Chart</Tab>
            <Tab>Info</Tab>
          </TabList>

          <TabPanels style={{ height: "calc(100% - 42px)" }}>
            <TabPanel
              style={{
                height: "100%",
                padding: 0,
              }}
            >
              <TradingViewWidget symbol={selectedStock?.name || "NIFTYBEES"} />
            </TabPanel>
            <TabPanel
              style={{
                height: "100%",
                padding: 0,
              }}
            >
              <StockInfo symbol={selectedStock?.name || "NIFTYBEES"} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
};

export default Watchlist;
