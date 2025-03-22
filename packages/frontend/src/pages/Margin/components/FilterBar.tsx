import { useState } from "react";
import { Flex, Select, Input, Button } from "@chakra-ui/react";
import { useMargin } from "../../../contexts/MarginContext";

const MarginFilterBar: React.FC = () => {
  const { setFilter, clearFilters } = useMargin();
  const [brokerFilter, setBrokerFilter] = useState("");
  const [sortOption, setSortOption] = useState("");

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrokerFilter(e.target.value);
    setFilter(e.target.value, sortOption);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
    setFilter(brokerFilter, e.target.value);
  };

  const clearAllFilters = () => {
    setBrokerFilter("");
    setSortOption("");
    clearFilters();
  };

  return (
    <Flex gap={4} align="center" p={4}>
      <Input
        placeholder="Filter by Broker"
        value={brokerFilter}
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
        <option value="availableMarginAsc">
          Available Margin (Low to High)
        </option>
        <option value="availableMarginDesc">
          Available Margin (High to Low)
        </option>
        <option value="utilizedMarginAsc">Utilized Margin (Low to High)</option>
        <option value="utilizedMarginDesc">
          Utilized Margin (High to Low)
        </option>
        <option value="totalMarginAsc">Total Margin (Low to High)</option>
        <option value="totalMarginDesc">Total Margin (High to Low)</option>
      </Select>
      <Button onClick={clearAllFilters} colorScheme="primary" pl={6} pr={6}>
        Clear
      </Button>
    </Flex>
  );
};

export default MarginFilterBar;
