# TradeMate

TradeMate is a web application that allows users to track their stock portfolio and execute trades. They can connect their brokerage account to the app and view their portfolio in real-time. Users can also execute trades to see how they would affect their portfolio. The app uses the multiple brokerage APIs to get real-time data and execute trades. The brokerage include AngelOne and 5Paisa.

## Features

- **Real-time Portfolio**: Users can connect their brokerage account to the app and view their portfolio in real-time. They can see the current value of their portfolio, the percentage change, and the individual stocks in their portfolio.

- **Real-time Stock Data**: Users can view real-time stock data for any stock. They can see the current price, the percentage change, and the volume of the stock.

- **News**: Users can view the latest news related to the stock market. They can see the headlines, the source, and the date of the news.

- **Consolidated Portfolio**: Users can view their consolidated portfolio across all their brokerage accounts. They can see the total value of their portfolio, the percentage change, and the individual stocks in their portfolio.

- **Consolidated Margin**: Users can view their consolidated margin across all their brokerage accounts. They can see the total margin available, the total margin used, and the total margin remaining.

## Tech Stack

It is a monorepo project with the following tech stack:

- **Frontend**: React, TypeScript, Chakra UI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **APIs**: AngelOne API, 5Paisa API
- **Authentication**: JWT

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
