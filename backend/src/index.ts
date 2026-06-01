import express from "express";
import { ENV } from "./config/env";
import { clerkMiddleware } from "@clerk/express";

const app = express();
app.use(clerkMiddleware()); //auth object will be attached to the req
app.use(express.json()); //parses json req bodies
app.use(express.urlencoded({ extended: true })); //parses from data(like HTML forms)

app.get("/", (req, res) => {
  res.json({
    message:
      "Welcome to Productify API - Powered by PostgreSQL, Drizzle ORM & Clerk Auth",
    endpoints: {
      users: "/api/users",
      products: "/api/products",
      comments: "/api/comments",
    },
  });
});

app.listen(ENV.PORT, () =>
  console.log(`Server are listen on Port:${ENV.PORT}`),
);
