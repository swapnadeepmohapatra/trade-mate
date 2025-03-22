import React, { memo, useEffect, useState } from "react";
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

// const data = {
//   success: true,
//   body: {
//     data: {
//       symbol: "infy",
//       data: {
//         companyInfo: {
//           name: "Infosys Ltd",
//           price: "₹ 1,591",
//           website: "http://www.infosys.com/",
//         },
//         valuationRatios: {
//           "Market Cap": "660887",
//           "Current Price": "1591",
//           "High / Low": "20071358",
//           "Stock P/E": "23.9",
//           "Book Value": "213",
//           "Dividend Yield": "2.36",
//           ROCE: "40.0",
//           ROE: "31.8",
//           "Face Value": "5.00",
//         },
//         quarterlyResults: {
//           headers: [
//             "",
//             "Dec 2021",
//             "Mar 2022",
//             "Jun 2022",
//             "Sep 2022",
//             "Dec 2022",
//             "Mar 2023",
//             "Jun 2023",
//             "Sep 2023",
//             "Dec 2023",
//             "Mar 2024",
//             "Jun 2024",
//             "Sep 2024",
//             "Dec 2024",
//           ],
//           rows: [
//             {
//               key: "Sales +",
//               values: [
//                 "31867",
//                 "32276",
//                 "34470",
//                 "36538",
//                 "38318",
//                 "37441",
//                 "37933",
//                 "38994",
//                 "38821",
//                 "37923",
//                 "39315",
//                 "40986",
//                 "41764",
//               ],
//             },
//             {
//               key: "Expenses +",
//               values: [
//                 "23484",
//                 "24430",
//                 "26606",
//                 "27636",
//                 "28951",
//                 "28443",
//                 "28869",
//                 "29554",
//                 "29684",
//                 "29139",
//                 "29878",
//                 "31177",
//                 "31649",
//               ],
//             },
//             {
//               key: "Operating Profit",
//               values: [
//                 "8383",
//                 "7846",
//                 "7864",
//                 "8902",
//                 "9367",
//                 "8998",
//                 "9064",
//                 "9440",
//                 "9137",
//                 "8784",
//                 "9437",
//                 "9809",
//                 "10115",
//               ],
//             },
//             {
//               key: "OPM %",
//               values: [
//                 "26",
//                 "24",
//                 "23",
//                 "24",
//                 "24",
//                 "24",
//                 "24",
//                 "24",
//                 "24",
//                 "23",
//                 "24",
//                 "24",
//                 "24",
//               ],
//             },
//             {
//               key: "Other Income +",
//               values: [
//                 "512",
//                 "637",
//                 "676",
//                 "584",
//                 "769",
//                 "671",
//                 "561",
//                 "632",
//                 "789",
//                 "2729",
//                 "838",
//                 "712",
//                 "859",
//               ],
//             },
//             {
//               key: "Interest",
//               values: [
//                 "53",
//                 "50",
//                 "56",
//                 "66",
//                 "80",
//                 "82",
//                 "90",
//                 "138",
//                 "131",
//                 "110",
//                 "105",
//                 "108",
//                 "101",
//               ],
//             },
//             {
//               key: "Depreciation",
//               values: [
//                 "899",
//                 "890",
//                 "950",
//                 "1029",
//                 "1125",
//                 "1121",
//                 "1173",
//                 "1166",
//                 "1176",
//                 "1163",
//                 "1149",
//                 "1160",
//                 "1203",
//               ],
//             },
//             {
//               key: "Profit before tax",
//               values: [
//                 "7943",
//                 "7543",
//                 "7534",
//                 "8391",
//                 "8931",
//                 "8466",
//                 "8362",
//                 "8768",
//                 "8619",
//                 "10240",
//                 "9021",
//                 "9253",
//                 "9670",
//               ],
//             },
//             {
//               key: "Tax %",
//               values: [
//                 "27",
//                 "24",
//                 "29",
//                 "28",
//                 "26",
//                 "28",
//                 "29",
//                 "29",
//                 "29",
//                 "22",
//                 "29",
//                 "30",
//                 "29",
//               ],
//             },
//             {
//               key: "Net Profit +",
//               values: [
//                 "5822",
//                 "5695",
//                 "5362",
//                 "6026",
//                 "6586",
//                 "6134",
//                 "5945",
//                 "6215",
//                 "6113",
//                 "7975",
//                 "6374",
//                 "6516",
//                 "6822",
//               ],
//             },
//             {
//               key: "EPS in Rs",
//               values: [
//                 "13.81",
//                 "13.52",
//                 "12.74",
//                 "14.31",
//                 "15.70",
//                 "14.77",
//                 "14.32",
//                 "14.97",
//                 "14.71",
//                 "19.20",
//                 "15.34",
//                 "15.67",
//                 "16.39",
//               ],
//             },
//             {
//               key: "Raw PDF",
//               values: ["", "", "", "", "", "", "", "", "", "", "", "", ""],
//             },
//           ],
//         },
//         profitLoss: {
//           headers: [
//             "",
//             "Mar 2013",
//             "Mar 2014",
//             "Mar 2015",
//             "Mar 2016",
//             "Mar 2017",
//             "Mar 2018",
//             "Mar 2019",
//             "Mar 2020",
//             "Mar 2021",
//             "Mar 2022",
//             "Mar 2023",
//             "Mar 2024",
//             "TTM",
//           ],
//           rows: [
//             {
//               key: "Sales +",
//               values: [
//                 "40352",
//                 "50133",
//                 "53319",
//                 "62441",
//                 "68484",
//                 "70522",
//                 "82675",
//                 "90791",
//                 "100472",
//                 "121641",
//                 "146767",
//                 "153670",
//                 "159988",
//               ],
//             },
//             {
//               key: "Expenses +",
//               values: [
//                 "28814",
//                 "36743",
//                 "38436",
//                 "45362",
//                 "49880",
//                 "51700",
//                 "62505",
//                 "68524",
//                 "72583",
//                 "90150",
//                 "111637",
//                 "117245",
//                 "121843",
//               ],
//             },
//             {
//               key: "Operating Profit",
//               values: [
//                 "11538",
//                 "13390",
//                 "14883",
//                 "17079",
//                 "18604",
//                 "18822",
//                 "20170",
//                 "22267",
//                 "27889",
//                 "31491",
//                 "35130",
//                 "36425",
//                 "38145",
//               ],
//             },
//             {
//               key: "OPM %",
//               values: [
//                 "29",
//                 "27",
//                 "28",
//                 "27",
//                 "27",
//                 "27",
//                 "24",
//                 "25",
//                 "28",
//                 "26",
//                 "24",
//                 "24",
//                 "24",
//               ],
//             },
//             {
//               key: "Other Income +",
//               values: [
//                 "2365",
//                 "2664",
//                 "3430",
//                 "3120",
//                 "3050",
//                 "3311",
//                 "2882",
//                 "2803",
//                 "2201",
//                 "2295",
//                 "2701",
//                 "4711",
//                 "5138",
//               ],
//             },
//             {
//               key: "Interest",
//               values: [
//                 "5",
//                 "9",
//                 "12",
//                 "0",
//                 "0",
//                 "0",
//                 "0",
//                 "170",
//                 "195",
//                 "200",
//                 "284",
//                 "470",
//                 "424",
//               ],
//             },
//             {
//               key: "Depreciation",
//               values: [
//                 "1099",
//                 "1317",
//                 "1017",
//                 "1459",
//                 "1703",
//                 "1863",
//                 "2011",
//                 "2893",
//                 "3267",
//                 "3476",
//                 "4225",
//                 "4678",
//                 "4675",
//               ],
//             },
//             {
//               key: "Profit before tax",
//               values: [
//                 "12799",
//                 "14728",
//                 "17284",
//                 "18740",
//                 "19951",
//                 "20270",
//                 "21041",
//                 "22007",
//                 "26628",
//                 "30110",
//                 "33322",
//                 "35988",
//                 "38184",
//               ],
//             },
//             {
//               key: "Tax %",
//               values: [
//                 "26",
//                 "28",
//                 "28",
//                 "28",
//                 "28",
//                 "21",
//                 "27",
//                 "24",
//                 "27",
//                 "26",
//                 "28",
//                 "27",
//                 "",
//               ],
//             },
//             {
//               key: "Net Profit +",
//               values: [
//                 "9429",
//                 "10656",
//                 "12372",
//                 "13489",
//                 "14353",
//                 "16029",
//                 "15410",
//                 "16639",
//                 "19423",
//                 "22146",
//                 "24108",
//                 "26248",
//                 "27687",
//               ],
//             },
//             {
//               key: "EPS in Rs",
//               values: [
//                 "20.52",
//                 "23.31",
//                 "26.93",
//                 "29.36",
//                 "31.24",
//                 "36.69",
//                 "35.26",
//                 "38.96",
//                 "45.42",
//                 "52.56",
//                 "58.08",
//                 "63.20",
//                 "66.60",
//               ],
//             },
//             {
//               key: "Dividend Payout %",
//               values: [
//                 "25",
//                 "34",
//                 "55",
//                 "41",
//                 "41",
//                 "59",
//                 "60",
//                 "45",
//                 "59",
//                 "59",
//                 "58",
//                 "73",
//                 "",
//               ],
//             },
//           ],
//         },
//         balanceSheet: {
//           headers: [
//             "",
//             "Mar 2013",
//             "Mar 2014",
//             "Mar 2015",
//             "Mar 2016",
//             "Mar 2017",
//             "Mar 2018",
//             "Mar 2019",
//             "Mar 2020",
//             "Mar 2021",
//             "Mar 2022",
//             "Mar 2023",
//             "Mar 2024",
//             "Sep 2024",
//           ],
//           rows: [
//             {
//               key: "Equity Capital",
//               values: [
//                 "286",
//                 "286",
//                 "572",
//                 "1144",
//                 "1144",
//                 "1088",
//                 "2170",
//                 "2122",
//                 "2124",
//                 "2098",
//                 "2069",
//                 "2071",
//                 "2072",
//               ],
//             },
//             {
//               key: "Reserves",
//               values: [
//                 "37708",
//                 "44244",
//                 "50164",
//                 "60600",
//                 "67838",
//                 "63835",
//                 "62778",
//                 "63328",
//                 "74227",
//                 "73252",
//                 "73338",
//                 "86045",
//                 "88391",
//               ],
//             },
//             {
//               key: "Borrowings +",
//               values: [
//                 "0",
//                 "0",
//                 "0",
//                 "0",
//                 "0",
//                 "0",
//                 "0",
//                 "4633",
//                 "5325",
//                 "5474",
//                 "8299",
//                 "8359",
//                 "8804",
//               ],
//             },
//             {
//               key: "Other Liabilities +",
//               values: [
//                 "8281",
//                 "12436",
//                 "15553",
//                 "13354",
//                 "14166",
//                 "14426",
//                 "19118",
//                 "21717",
//                 "25835",
//                 "35905",
//                 "40890",
//                 "39545",
//                 "42603",
//               ],
//             },
//             {
//               key: "Total Liabilities",
//               values: [
//                 "46275",
//                 "56966",
//                 "66289",
//                 "75098",
//                 "83148",
//                 "79349",
//                 "84066",
//                 "91800",
//                 "107511",
//                 "116729",
//                 "124596",
//                 "136020",
//                 "141870",
//               ],
//             },
//             {
//               key: "Fixed Assets +",
//               values: [
//                 "7139",
//                 "8378",
//                 "11346",
//                 "13386",
//                 "14179",
//                 "12574",
//                 "15710",
//                 "23789",
//                 "25505",
//                 "25800",
//                 "29225",
//                 "27622",
//                 "31917",
//               ],
//             },
//             {
//               key: "CWIP",
//               values: [
//                 "1140",
//                 "961",
//                 "776",
//                 "960",
//                 "1365",
//                 "1606",
//                 "1388",
//                 "954",
//                 "922",
//                 "416",
//                 "288",
//                 "293",
//                 "505",
//               ],
//             },
//             {
//               key: "Investments",
//               values: [
//                 "2116",
//                 "4331",
//                 "2270",
//                 "1892",
//                 "16423",
//                 "12163",
//                 "11261",
//                 "8792",
//                 "14205",
//                 "20324",
//                 "19478",
//                 "24623",
//                 "17394",
//               ],
//             },
//             {
//               key: "Other Assets +",
//               values: [
//                 "35880",
//                 "43296",
//                 "51897",
//                 "58860",
//                 "51181",
//                 "53006",
//                 "55707",
//                 "58265",
//                 "66879",
//                 "70189",
//                 "75605",
//                 "83482",
//                 "92054",
//               ],
//             },
//             {
//               key: "Total Assets",
//               values: [
//                 "46275",
//                 "56966",
//                 "66289",
//                 "75098",
//                 "83148",
//                 "79349",
//                 "84066",
//                 "91800",
//                 "107511",
//                 "116729",
//                 "124596",
//                 "136020",
//                 "141870",
//               ],
//             },
//           ],
//         },
//         cashFlow: {
//           headers: [
//             "",
//             "Mar 2013",
//             "Mar 2014",
//             "Mar 2015",
//             "Mar 2016",
//             "Mar 2017",
//             "Mar 2018",
//             "Mar 2019",
//             "Mar 2020",
//             "Mar 2021",
//             "Mar 2022",
//             "Mar 2023",
//             "Mar 2024",
//           ],
//           rows: [
//             {
//               key: "Cash from Operating Activity +",
//               values: [
//                 "7373",
//                 "9825",
//                 "8353",
//                 "10028",
//                 "11531",
//                 "13218",
//                 "14841",
//                 "17003",
//                 "23224",
//                 "23885",
//                 "22467",
//                 "25210",
//               ],
//             },
//             {
//               key: "Cash from Investing Activity +",
//               values: [
//                 "-2922",
//                 "-2563",
//                 "999",
//                 "-885",
//                 "-14664",
//                 "4533",
//                 "-632",
//                 "-331",
//                 "-7373",
//                 "-6485",
//                 "-1071",
//                 "-5093",
//               ],
//             },
//             {
//               key: "Cash from Financing Activity +",
//               values: [
//                 "-3210",
//                 "-3144",
//                 "-4935",
//                 "-6813",
//                 "-6939",
//                 "-20505",
//                 "-14512",
//                 "-17591",
//                 "-9786",
//                 "-24642",
//                 "-26695",
//                 "-17504",
//               ],
//             },
//             {
//               key: "Net Cash Flow",
//               values: [
//                 "1241",
//                 "4118",
//                 "4417",
//                 "2330",
//                 "-10072",
//                 "-2754",
//                 "-303",
//                 "-919",
//                 "6065",
//                 "-7242",
//                 "-5299",
//                 "2613",
//               ],
//             },
//           ],
//         },
//         shareholding: {
//           headers: [
//             "",
//             "Mar 2022",
//             "Jun 2022",
//             "Sep 2022",
//             "Dec 2022",
//             "Mar 2023",
//             "Jun 2023",
//             "Sep 2023",
//             "Dec 2023",
//             "Mar 2024",
//             "Jun 2024",
//             "Sep 2024",
//             "Dec 2024",
//           ],
//           rows: [
//             {
//               key: "Promoters +",
//               values: [
//                 "13.11",
//                 "13.11",
//                 "15.16",
//                 "15.11",
//                 "15.14",
//                 "14.94",
//                 "14.89",
//                 "14.78",
//                 "14.71",
//                 "14.61",
//                 "14.43",
//                 "14.43",
//               ],
//             },
//             {
//               key: "FIIs +",
//               values: [
//                 "33.30",
//                 "31.72",
//                 "36.20",
//                 "36.29",
//                 "35.09",
//                 "33.44",
//                 "33.60",
//                 "33.70",
//                 "34.11",
//                 "32.74",
//                 "33.28",
//                 "33.30",
//               ],
//             },
//             {
//               key: "DIIs +",
//               values: [
//                 "17.10",
//                 "18.88",
//                 "32.13",
//                 "32.50",
//                 "33.59",
//                 "34.58",
//                 "35.19",
//                 "35.51",
//                 "35.62",
//                 "37.28",
//                 "37.81",
//                 "38.19",
//               ],
//             },
//             {
//               key: "Government +",
//               values: [
//                 "0.00",
//                 "0.00",
//                 "0.18",
//                 "0.19",
//                 "0.19",
//                 "0.20",
//                 "0.19",
//                 "0.20",
//                 "0.21",
//                 "0.21",
//                 "0.20",
//                 "0.20",
//               ],
//             },
//             {
//               key: "Public +",
//               values: [
//                 "36.16",
//                 "35.98",
//                 "15.93",
//                 "15.53",
//                 "15.67",
//                 "16.52",
//                 "15.83",
//                 "15.52",
//                 "15.06",
//                 "14.91",
//                 "14.01",
//                 "13.62",
//               ],
//             },
//             {
//               key: "Others +",
//               values: [
//                 "0.33",
//                 "0.31",
//                 "0.35",
//                 "0.34",
//                 "0.33",
//                 "0.32",
//                 "0.31",
//                 "0.30",
//                 "0.29",
//                 "0.27",
//                 "0.27",
//                 "0.27",
//               ],
//             },
//             {
//               key: "No. of Shareholders",
//               values: [
//                 "2128827",
//                 "2664564",
//                 "2893209",
//                 "2736975",
//                 "2801574",
//                 "3144613",
//                 "3009448",
//                 "2897030",
//                 "2773406",
//                 "2820740",
//                 "2576991",
//                 "2542766",
//               ],
//             },
//           ],
//         },
//         ratios: {
//           headers: [
//             "",
//             "Mar 2013",
//             "Mar 2014",
//             "Mar 2015",
//             "Mar 2016",
//             "Mar 2017",
//             "Mar 2018",
//             "Mar 2019",
//             "Mar 2020",
//             "Mar 2021",
//             "Mar 2022",
//             "Mar 2023",
//             "Mar 2024",
//           ],
//           rows: [
//             {
//               key: "Debtor Days",
//               values: [
//                 "64",
//                 "61",
//                 "66",
//                 "66",
//                 "66",
//                 "68",
//                 "65",
//                 "74",
//                 "70",
//                 "68",
//                 "63",
//                 "72",
//               ],
//             },
//             {
//               key: "Inventory Days",
//               values: ["", "", "", "", "", "", "", "", "", "", "", ""],
//             },
//             {
//               key: "Days Payable",
//               values: ["", "", "", "", "", "", "", "", "", "", "", ""],
//             },
//             {
//               key: "Cash Conversion Cycle",
//               values: [
//                 "64",
//                 "61",
//                 "66",
//                 "66",
//                 "66",
//                 "68",
//                 "65",
//                 "74",
//                 "70",
//                 "68",
//                 "63",
//                 "72",
//               ],
//             },
//             {
//               key: "Working Capital Days",
//               values: [
//                 "33",
//                 "15",
//                 "3",
//                 "34",
//                 "38",
//                 "50",
//                 "36",
//                 "44",
//                 "38",
//                 "31",
//                 "34",
//                 "59",
//               ],
//             },
//             {
//               key: "ROCE %",
//               values: [
//                 "37",
//                 "36",
//                 "36",
//                 "33",
//                 "30",
//                 "30",
//                 "32",
//                 "32",
//                 "35",
//                 "37",
//                 "40",
//                 "40",
//               ],
//             },
//           ],
//         },
//         metadata: {
//           lastUpdated: "2025-03-21T06:05:24.334Z",
//           url: "https://www.screener.in/company/infy/consolidated/",
//           ticker: "infy",
//           currentDate: "2025-03-21T14:50:20.923Z",
//         },
//       },
//     },
//   },
// };

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
      fetchStockInfo(symbol)
        .then((data) => {
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
        maxHeight: "calc(100vh - 19rem)",
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
