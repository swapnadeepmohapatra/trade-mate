// import React, { useState } from "react";
// import {
//   Box,
//   Flex,
//   VStack,
//   Text,
//   Tabs,
//   Tab,
//   TabList,
//   TabPanels,
//   TabPanel,
// } from "@chakra-ui/react";

// // Mock stock data
// const watchlists = [
//   {
//     id: 1,
//     name: "WATCHLIST1",
//     stocks: [
//       {
//         symbol: "ALPL30IETF",
//         price: 29.12,
//         change: -0.46,
//         percentChange: -1.56,
//         chartData: [28, 29, 29.5, 30, 29.1],
//       },
//       {
//         symbol: "COMMOIETF",
//         price: 89.45,
//         change: -1.01,
//         percentChange: -1.12,
//         chartData: [90, 89.5, 89.7, 90, 89.45],
//       },
//       // Add more stocks as needed
//     ],
//   },
//   {
//     id: 2,
//     name: "WATCHLIST2",
//     stocks: [
//       {
//         symbol: "FMCGIETF",
//         price: 61.68,
//         change: -1.29,
//         percentChange: -2.05,
//         chartData: [62, 61.5, 61.7, 62.3, 61.68],
//       },
//       // Add more stocks as needed
//     ],
//   },
// ];

// const WatchList: React.FC = () => {
//   const [selectedTab, setSelectedTab] = useState(0);

//   return (
//     <Box
//       p={5}
//       maxW="500px"
//       mx="auto"
//       borderWidth={1}
//       borderRadius="lg"
//       boxShadow="lg"
//     >
//       <Tabs onChange={(index) => setSelectedTab(index)} variant="enclosed">
//         <TabList>
//           {watchlists.map((watchlist) => (
//             <Tab key={watchlist.id}>{watchlist.name}</Tab>
//           ))}
//         </TabList>

//         <TabPanels>
//           {watchlists.map((watchlist) => (
//             <TabPanel key={watchlist.id}>
//               <Text color="gray.500" mb={4}>
//                 Sorted by Symbol A-Z
//               </Text>
//               <VStack spacing={4} align="stretch">
//                 {watchlist.stocks.map((stock) => (
//                   <StockItem key={stock.symbol} stock={stock} />
//                 ))}
//               </VStack>
//             </TabPanel>
//           ))}
//         </TabPanels>
//       </Tabs>
//     </Box>
//   );
// };

// interface StockItemProps {
//   stock: {
//     symbol: string;
//     price: number;
//     change: number;
//     percentChange: number;
//     chartData: number[];
//   };
// }

// const StockItem: React.FC<StockItemProps> = ({ stock }) => {
//   const { symbol, price, change, percentChange } = stock;

//   return (
//     <Flex
//       align="center"
//       justify="space-between"
//       borderBottom="1px"
//       borderColor="gray.200"
//       py={2}
//     >
//       {/* Stock Symbol */}
//       <Box>
//         <Text fontWeight="bold">{symbol}</Text>
//       </Box>

//       <Box width="50px" height="30px"></Box>

//       <Box textAlign="right">
//         <Text fontWeight="bold">₹ {price.toFixed(2)}</Text>
//         <Text color={change < 0 ? "red.500" : "green.500"}>
//           {change.toFixed(2)} ({percentChange.toFixed(2)}%)
//         </Text>
//       </Box>
//     </Flex>
//   );
// };

// export default WatchList;
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
} from "@chakra-ui/react";
import { fetchSymbols } from "../../../services/marketData";
import TradingViewWidget from "./TradingViewWidget";

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
        <TradingViewWidget symbol={selectedStock?.name || "NIFTYBEES"} />
      </Box>
    </Flex>
  );
};

export default Watchlist;
