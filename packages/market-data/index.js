import "reflect-metadata";
import express from "express";
import { createYoga } from "graphql-yoga";
import { buildSchema } from "type-graphql";
import { resolvers } from "@generated/type-graphql";
import { prisma } from "./lib/prisma.js";

const app = express();

const schema = await buildSchema({
  resolvers,
  validate: false,
  emitSchemaFile: true,
});

const yoga = createYoga({
  schema,
  context: async ({ request }) => {
    return { prisma, request };
  },
});

app.use("/graphql", yoga);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/graphql`);
});
