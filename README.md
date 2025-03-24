# TradeMate

TradeMate is a web application that allows users to track their stock portfolio and execute trades. They can connect their brokerage account to the app and view their portfolio in real-time. Users can also execute trades to see how they would affect their portfolio. The app uses the multiple brokerage APIs to get real-time data and execute trades. The brokerage include AngelOne and 5Paisa.

## Infrastructure Diagram

![trade_mate_diagram](https://github.com/user-attachments/assets/405a9707-ac92-4dd6-a87d-b6b5d77704c5)


## Features

- **Real-time Portfolio**: Users can connect their brokerage account to the app and view their portfolio in real-time. They can see the current value of their portfolio, the percentage change, and the individual stocks in their portfolio.

- **Real-time Stock Data**: Users can view real-time stock data for any stock. They can see the current price, the percentage change, and the volume of the stock.

- **Stock Data**: Users can view financial data like quarterly results, P&L, cash flows, and shareholding patterns for all the companies listed in the Indian Stock Market.

- **AI Stock Analysis**: Users can get details like pros, cons, short-term and long-term recommendation based on their past performance of the stock.

- **News**: Users can view the latest news related to the stock market. They can see the headlines, the source, and the date of the news.

- **Consolidated Portfolio**: Users can view their consolidated portfolio across all their brokerage accounts. They can see the total value of their portfolio, the percentage change, and the individual stocks in their portfolio.

- **Consolidated Margin**: Users can view their consolidated margin across all their brokerage accounts. They can see the total margin available, the total margin used, and the total margin remaining.

## Tech Stack

It is a monorepo project with the following tech stack:

- **Frontend**: React, TypeScript, Chakra UI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB/PostgreSQL (with Prisma ORM)
- **Caching**: Redis
- **APIs**: AngelOne API, 5Paisa API, PayTM Money API, Kotak Securities API, News API, Screener, Claude API, etc
- **Authentication**: JWT
- **CI/CD**: GitHub Actions
- **Deployment**: AWS EC2, pm2, Nginx
- **Testing**: Grafana k6

## Deployed Link

[TradeMate](https://trademate.swapnadeep.me/)

## Screenshots

![image](https://github.com/user-attachments/assets/c29b8898-285b-40da-8f21-18d2479ca171)

![image](https://github.com/user-attachments/assets/a668d7f1-4cb4-4b80-b33f-8e0457863852)

![image](https://github.com/user-attachments/assets/3bcc25b3-1a82-4ace-bc17-831517f13238)

![image](https://github.com/user-attachments/assets/236a033d-4fc5-4213-85b7-bc7bbf3fc1d4)

![image](https://github.com/user-attachments/assets/cf7f1a93-ed82-43ee-b274-5e045bc91e73)

![image](https://github.com/user-attachments/assets/131a2e1c-ce8a-481c-8bd5-ccdb84bbc254)

![image](https://github.com/user-attachments/assets/1d5ed96f-aa66-4283-a3f7-c018005b9b63)


## Installation

1. Clone the repository

```bash
git clone https://github.com/swapnadeepmohapatra/trade-mate.git
```

2. Install the dependencies

```bash
cd trade-mate
npm install
```

3. Install the dependencies for all the packages

```bash
chmod +x install-packages.sh
./install-packages.sh
```

or

```bash
npm run install-all
```

4. Start the project in development mode

```bash
npm dev
```

5. Start the project in production mode

```bash
npm start
```


## Thank You

