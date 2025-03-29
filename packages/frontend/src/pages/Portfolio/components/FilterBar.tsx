import { useState } from "react";
import { Flex, Select, Input, Button, useMediaQuery } from "@chakra-ui/react";
import { usePortfolio } from "../../../contexts/PortfolioContext";

const FilterBar: React.FC = () => {
  const { setFilter, clearFilters, isGroupedByBroker, toggleGroupByBroker } =
    usePortfolio();
  const [symbolFilter, setSymbolFilter] = useState("");
  const [sortOption, setSortOption] = useState("");

  const [isSmallScreen] = useMediaQuery("(max-width: 768px)");

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSymbolFilter(e.target.value);
    setFilter(e.target.value, sortOption);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
    setFilter(symbolFilter, e.target.value);
  };

  const clearAllFilters = () => {
    setSymbolFilter("");
    setSortOption("");
    clearFilters();
  };

  return (
    <Flex
      gap={4}
      align="center"
      p={4}
      direction={isSmallScreen ? "column" : "row"}
    >
      <Input
        placeholder="Filter by Symbol"
        value={symbolFilter}
        onChange={handleFilterChange}
        focusBorderColor="primary.400"
        _placeholder={{
          color: "surface.600",
        }}
      />
      <Select
        placeholder="Sort by"
        onChange={handleSortChange}
        focusBorderColor="primary.400"
        value={sortOption}
      >
        <option value="quantityAsc">Quantity (Low to High)</option>
        <option value="quantityDesc">Quantity (High to Low)</option>
        <option value="currentPriceAsc">Current Price (Low to High)</option>
        <option value="currentPriceDesc">Current Price (High to Low)</option>
        <option value="currentValueAsc">Current Value (Low to High)</option>
        <option value="currentValueDesc">Current Value (High to Low)</option>
        <option value="plValueAsc">Profit/Loss Value (Low to High)</option>
        <option value="plValueDesc">Profit/Loss Value (High to Low)</option>
        <option value="plAsc">Profit/Loss % (Low to High)</option>
        <option value="plDesc">Profit/Loss % (High to Low)</option>
      </Select>
      <Button
        onClick={clearAllFilters}
        colorScheme="primary"
        pl={6}
        pr={6}
        w={isSmallScreen ? "100%" : "auto"}
      >
        Clear
      </Button>
      <Button
        onClick={toggleGroupByBroker}
        colorScheme="primary"
        pl={12}
        pr={12}
        w={isSmallScreen ? "100%" : "auto"}
      >
        {isGroupedByBroker ? "Ungroup" : "Group"} by Broker
      </Button>
    </Flex>
  );
};

export default FilterBar;
