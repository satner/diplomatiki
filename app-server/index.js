import { ApolloServer } from "apollo-server-express";
import morgan from "morgan";
import express from "express";
import mongoose from "mongoose";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import cors from "cors";

import {
  APP_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_PORT,
  DB_NAME,
  DB_DS
} from "./server-config";

mongoose
  .connect(`mongodb://${DB_USER}:${DB_PASSWORD}@${DB_DS}:${DB_PORT}/${DB_NAME}`)
  .then(() => {
    console.log("🚀 Server connected to mlab.com");
  })
  .catch(e => {
    console.error("Server does not connected to mlab.com " + e.stack);
  });

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.disable("x-powered-by");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  engine: {
    apiKey: "service:satner-4289:t752Gr-o9pSZskOU25bkKg",
    generateClientInfo: ({ request }) => {
      const headers = request.http & request.http.headers;
      if (headers) {
        return {
          clientName: headers["apollo-client-name"],
          clientVersion: headers["apollo-client-version"]
        };
      } else {
        return {
          clientName: "Unknown Client",
          clientVersion: "Unversioned"
        };
      }
    }
  },
  playground: true
});

server.applyMiddleware({ app });

app.listen({ port: APP_PORT }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${APP_PORT}${server.graphqlPath}`
  )
);
