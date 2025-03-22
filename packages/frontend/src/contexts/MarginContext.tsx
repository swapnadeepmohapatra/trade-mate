import { createContext, useContext, useState, useEffect } from "react";
import { getMargin } from "../services/margin";

interface Broker {
  id: string;
  name: string;
  imageUrl: string;
}

export interface Margin {
  AvailableMargin: number;
  UtilizedMargin: number;
  TotalMargin: number;
  DPFreeStockValue: number;
  broker: Broker;
}
interface MarginContextProps {
  marginData: Margin[];
  filteredMarginData: Margin[];
  totalAvailableMargin: number;
  totalUtilizedMargin: number;
  totalDPFreeStockValue: number;
  totalMarginValue: number;
  setFilter: (brokerNameFilter: string, sortOption: string) => void;
  clearFilters: () => void;
}

const MarginContext = createContext<MarginContextProps | undefined>(undefined);

export const MarginProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [marginData, setMarginData] = useState<Margin[]>([]);
  const [filteredMarginData, setFilteredMarginData] = useState<Margin[]>([]);
  const [brokerNameFilter, setBrokerNameFilter] = useState("");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    getMargin().then((data) => {
      const margin = data?.body?.margin || [];
      setMarginData(margin);
      setFilteredMarginData(margin);
    });
  }, []);

  useEffect(() => {
    const applyFiltersAndSort = () => {
      const filtered =
        brokerNameFilter.trim() !== ""
          ? marginData.filter((margin) =>
              margin.broker.name
                .toLowerCase()
                .includes(brokerNameFilter.toLowerCase().trim())
            )
          : [...marginData];

      switch (sortOption) {
        case "availableMarginAsc":
          filtered.sort((a, b) => a.AvailableMargin - b.AvailableMargin);
          break;
        case "availableMarginDesc":
          filtered.sort((a, b) => b.AvailableMargin - a.AvailableMargin);
          break;
        case "utilizedMarginAsc":
          filtered.sort((a, b) => a.UtilizedMargin - b.UtilizedMargin);
          break;
        case "utilizedMarginDesc":
          filtered.sort((a, b) => b.UtilizedMargin - a.UtilizedMargin);
          break;
        case "totalMarginAsc":
          filtered.sort((a, b) => a.TotalMargin - b.TotalMargin);
          break;
        case "totalMarginDesc":
          filtered.sort((a, b) => b.TotalMargin - a.TotalMargin);
          break;
      }

      setFilteredMarginData(filtered);
    };

    applyFiltersAndSort();
  }, [brokerNameFilter, sortOption, marginData]);

  const setFilter = (brokerName: string, sort: string) => {
    setBrokerNameFilter(brokerName);
    setSortOption(sort);
  };

  const clearFilters = () => {
    setBrokerNameFilter("");
    setSortOption("");
    setFilteredMarginData(marginData);
  };

  const totalAvailableMargin = marginData.reduce(
    (acc, margin) => acc + margin.AvailableMargin,
    0
  );

  const totalUtilizedMargin = marginData.reduce(
    (acc, margin) => acc + margin.UtilizedMargin,
    0
  );

  const totalDPFreeStockValue = marginData.reduce(
    (acc, margin) => acc + margin.DPFreeStockValue,
    0
  );

  const totalMarginValue = marginData.reduce(
    (acc, margin) => acc + margin.TotalMargin,
    0
  );

  return (
    <MarginContext.Provider
      value={{
        marginData: filteredMarginData,
        filteredMarginData,
        totalAvailableMargin,
        totalUtilizedMargin,
        totalDPFreeStockValue,
        totalMarginValue,
        setFilter,
        clearFilters,
      }}
    >
      {children}
    </MarginContext.Provider>
  );
};

export const useMargin = () => {
  const context = useContext(MarginContext);
  if (!context) {
    throw new Error("useMargin must be used within a MarginProvider");
  }
  return context;
};
