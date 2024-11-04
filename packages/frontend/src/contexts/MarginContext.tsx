import React, { createContext, useContext, useState, useEffect } from "react";
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
  totalAvailableMargin: number;
  totalUtilizedMargin: number;
  totalDPFreeStockValue: number;
  totalMarginValue: number;
}

const MarginContext = createContext<MarginContextProps | undefined>(undefined);

export const MarginProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [marginData, setMarginData] = useState<Margin[]>([]);

  useEffect(() => {
    getMargin().then((data) => {
      const margin = data?.body?.margin || [];
      setMarginData(margin);
    });
  }, []);

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
        marginData,
        totalAvailableMargin,
        totalUtilizedMargin,
        totalDPFreeStockValue,
        totalMarginValue,
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
