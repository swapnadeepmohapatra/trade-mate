import express from "express";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { decode } from "./utils/decode.js";
import { PORT, privateRoutes, publicRoutes } from "./utils/config.js";

dotenv.config();

const app = express();

app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    allowedHeaders: ["Content-Type"],
    origin: "http://localhost:3000",
  })
);

for (const route in privateRoutes) {
  const target = privateRoutes[route];
  app.use(
    route,
    createProxyMiddleware({
      target,
      changeOrigin: true,
      on: {
        proxyReq: (proxyReq, req, res) => {
          try {
            if (!req?.headers?.cookie) {
              res.status(401).json({
                status: "error",
                message: "Unauthorized",
                data: {},
              });

              res.end();
            } else {
              const decoded = decode(req.headers.cookie);
              proxyReq.setHeader("user", JSON.stringify(decoded));
              proxyReq.removeHeader("cookie");
            }
          } catch (err) {
            console.log(err);
            res.status(401).json({
              status: "error",
              message: "Unauthorized",
              data: {},
            });
          }
        },
      },
    })
  );
}

for (const route in publicRoutes) {
  const target = publicRoutes[route];
  app.use(
    route,
    createProxyMiddleware({
      target,
      changeOrigin: true,
    })
  );
}

app.listen(PORT, () => {
  console.log(`api gateway started listening on port : ${PORT}`);
});
