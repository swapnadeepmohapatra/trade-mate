import { useState, useEffect } from "react";
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
  IconButton,
} from "@chakra-ui/react";
import { fetchSymbols } from "../../../services/marketData";
import TradingViewWidget from "./TradingViewWidget";
import StockInfo from "./StockInfo";
import { FaPlus, FaTrash } from "react-icons/fa";

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
  const [selectedTab, setSelectedTab] = useState(0);
  const [watchList, setWatchList] = useState<Stock[]>([]);

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

  const addToWatchList = (stock: Stock) => {
    setQuery("");
    setStocks([]);
    setDebouncedQuery("");
    setWatchList([...watchList, stock]);
  };

  const removeFromWatchList = (stock: Stock) => {
    setWatchList(watchList.filter((s) => s.id !== stock.id));
  };

  return (
    <Flex>
      <Box padding="4" width="sm" margin="auto" paddingTop="0">
        <Input
          placeholder="Search stocks..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          marginBottom="4"
        />
        {query.length > 0 && (
          <VStack
            align="start"
            position={"absolute"}
            h={"50vh"}
            width="22rem"
            // w={"100%"}
            overflowY={"auto"}
            backgroundColor="surface.100"
            marginTop={"-4"}
            border={"1px"}
            borderColor={"surface.400"}
            borderBottomRadius={"md"}
            boxShadow={"xl"}
            gap={0}
            zIndex={1}
          >
            {loading && (
              <Flex p="4" w="100%" justify="center">
                <Spinner />
              </Flex>
            )}
            {query.length <= 2 && (
              <Flex p="4" w="100%" justify="center">
                <Text>Enter at least 3 characters to search</Text>
              </Flex>
            )}
            {stocks.length === 0 && debouncedQuery.length > 2 && !loading && (
              <Flex p="4" w="100%" justify="center">
                <Text>No records found</Text>
              </Flex>
            )}
            {stocks.length > 0 &&
              stocks
                .sort((a, b) => b.fullName.localeCompare(a.fullName))
                .map((stock) => (
                  <Box
                    key={stock.id}
                    w="100%"
                    py="3"
                    px="4"
                    border="1px"
                    borderColor="surface.200"
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
                    <Flex justify="space-between">
                      <Stack
                        justify="space-between"
                        flex={1}
                        alignItems={"flex-start"}
                      >
                        <Text fontWeight="bold">{stock.symbolRoot}</Text>
                        <Text height={"30px"}>{stock.fullName}</Text>
                      </Stack>
                      <Stack justify="space-between" alignItems={"center"}>
                        <Text
                          backgroundColor="surfaceMixed.200"
                          px="2"
                          py="0.5"
                          borderRadius={"sm"}
                        >
                          {stock.exch === "N" ? "NSE" : "BSE"}
                        </Text>
                        <IconButton
                          aria-label="Add to watchlist"
                          icon={<FaPlus />}
                          variant={"ghost"}
                          onClick={() => {
                            addToWatchList(stock);
                          }}
                        />
                      </Stack>
                    </Flex>
                  </Box>
                ))}
          </VStack>
        )}
        <Container
          height={"calc(100vh - 18rem)"}
          overflowY={"auto"}
          padding={0}
        >
          {watchList.length === 0 && (
            <Flex
              p="4"
              w="100%"
              justify="center"
              flexDirection={"column"}
              align={"center"}
            >
              <Text>No stocks in watchlist</Text>
              <Text>Search and add stocks</Text>
            </Flex>
          )}
          {watchList.map((stock) => (
            <Box
              key={stock.id}
              w="100%"
              py="3"
              px="4"
              border="1px"
              borderColor="surface.200"
              onClick={() => setSelectedStock(stock)}
              _hover={{
                cursor: "pointer",
                backgroundColor: "surfaceMixed.200",
              }}
              backgroundColor={
                selectedStock?.id === stock?.id
                  ? "surfaceMixed.100"
                  : "transparent"
              }
            >
              <Flex justify="space-between">
                <Stack
                  justify="space-between"
                  flex={1}
                  alignItems={"flex-start"}
                >
                  <Text fontWeight="bold">{stock.symbolRoot}</Text>
                  <Text height={"30px"}>{stock.fullName}</Text>
                </Stack>
                <Stack justify="space-between" alignItems={"center"}>
                  <Text
                    backgroundColor="surfaceMixed.200"
                    px="2"
                    py="0.5"
                    borderRadius={"sm"}
                  >
                    {stock.exch === "N" ? "NSE" : "BSE"}
                  </Text>
                  <IconButton
                    aria-label="Remove from watchlist"
                    icon={<FaTrash />}
                    variant={"ghost"}
                    onClick={() => {
                      removeFromWatchList(stock);
                    }}
                  />
                </Stack>
              </Flex>
            </Box>
          ))}
        </Container>
        <Flex
          style={{ width: "100%" }}
          flexDirection={"row"}
          backgroundColor="surface.100"
        >
          {["1", "2", "3", "4", "5", "6"].map((i) => (
            <Text
              key={i}
              flex={1}
              style={{ cursor: "pointer" }}
              textAlign="center"
              py="2"
              border={1}
              borderColor="gray.200"
              onClick={() => setSelectedTab(parseInt(i) - 1)}
              backgroundColor={
                selectedTab === parseInt(i) - 1 ? "surface.200" : "transparent"
              }
            >
              {i}
            </Text>
          ))}
        </Flex>
      </Box>

      <Box
        flex={1}
        style={{
          height: "calc(100vh - 12rem)",
        }}
      >
        <Tabs
          style={{ height: "calc(100vh - 12rem)" }}
          colorScheme="primary"
          isLazy
        >
          <TabList>
            <Tab>Chart</Tab>
            <Tab>Info</Tab>
            <Text flex={1} alignSelf={"center"} textAlign={"end"} px={4}>
              {selectedStock?.fullName
                ?.toLocaleLowerCase()
                ?.split(" ")
                .map((t) => t.charAt(0).toUpperCase() + t.slice(1))
                .join(" ")}{" "}
              {" - "}
              {selectedStock?.symbolRoot}
            </Text>
          </TabList>

          <TabPanels>
            <TabPanel
              style={{
                height: "calc(100vh - 12rem - 42px)",
                padding: 0,
              }}
            >
              <TradingViewWidget symbol={selectedStock?.name || "NIFTYBEES"} />
            </TabPanel>
            <TabPanel
              style={{
                height: "calc(100vh - 12rem - 42px)",
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
