import React, { createContext, useContext, useState, useEffect } from "react";
import { getHoldings } from "../services/portfolio";

interface Holding {
  Symbol: string;
  FullName: string;
  Quantity: number;
  AvgRate: number;
  CurrentPrice: number;
}

interface PortfolioContextProps {
  holdings: Holding[];
  filteredHoldings: Holding[];
  totalValue: number;
  totalCost: number;
  totalPL: number;
  setFilter: (symbolFilter: string, sortOption: string) => void;
  clearFilters: () => void;
}

const PortfolioContext = createContext<PortfolioContextProps | undefined>(
  undefined
);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [filteredHoldings, setFilteredHoldings] = useState<Holding[]>([]);
  const [symbolFilter, setSymbolFilter] = useState("");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    getHoldings().then((data) => {
      const holdingsData = data?.body?.holdings || [];
      setHoldings(holdingsData);
      setFilteredHoldings(holdingsData);
    });
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filtered =
        symbolFilter.trim() !== ""
          ? holdings.filter((holding) =>
              holding.Symbol.toLowerCase().includes(
                symbolFilter.toLowerCase().trim()
              )
            )
          : [...holdings];

      switch (sortOption) {
        case "quantityAsc":
          filtered = filtered.sort((a, b) => a.Quantity - b.Quantity);
          break;
        case "quantityDesc":
          filtered = filtered.sort((a, b) => b.Quantity - a.Quantity);
          break;
        case "currentPriceAsc":
          filtered = filtered.sort((a, b) => a.CurrentPrice - b.CurrentPrice);
          break;
        case "currentPriceDesc":
          filtered = filtered.sort((a, b) => b.CurrentPrice - a.CurrentPrice);
          break;
        case "currentValueAsc":
          filtered = filtered.sort(
            (a, b) => a.CurrentPrice * a.Quantity - b.CurrentPrice * b.Quantity
          );
          break;
        case "currentValueDesc":
          filtered = filtered.sort(
            (a, b) => b.CurrentPrice * b.Quantity - a.CurrentPrice * a.Quantity
          );
          break;
        case "plAsc":
          filtered = filtered.sort(
            (a, b) =>
              (a.CurrentPrice - a.AvgRate) / a.AvgRate -
              (b.CurrentPrice - b.AvgRate) / b.AvgRate
          );
          break;
        case "plDesc":
          filtered = filtered.sort(
            (a, b) =>
              (b.CurrentPrice - b.AvgRate) / b.AvgRate -
              (a.CurrentPrice - a.AvgRate) / a.AvgRate
          );
          break;
      }

      setFilteredHoldings(filtered);
    };

    applyFilters();
  }, [symbolFilter, sortOption, holdings]);

  const setFilter = (symbol: string, sort: string) => {
    setSymbolFilter(symbol);
    setSortOption(sort);
  };

  const clearFilters = () => {
    setSymbolFilter("");
    setSortOption("");
    setFilteredHoldings(holdings);
  };

  const totalValue = holdings.reduce(
    (acc, holding) => acc + holding.CurrentPrice * holding.Quantity,
    0
  );

  const totalCost = holdings.reduce(
    (acc, holding) => acc + holding.AvgRate * holding.Quantity,
    0
  );

  const totalPL = holdings.reduce(
    (acc, holding) =>
      acc + (holding.CurrentPrice - holding.AvgRate) * holding.Quantity,
    0
  );

  return (
    <PortfolioContext.Provider
      value={{
        holdings: filteredHoldings,
        filteredHoldings,
        totalValue,
        totalCost,
        totalPL,
        setFilter,
        clearFilters,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};
