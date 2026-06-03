import express from "express";
import cors from "cors";

import { ENV } from "./config/env";
import { clerkMiddleware } from "@clerk/express";

import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import commentRoutes from "./routes/commentRoutes";

const app = express();

app.use(cors({ origin: ENV.FRONTEND_URL, credentials: true })); // allows frontend to send the cookies to the backend
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

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/comments", commentRoutes);

app.listen(ENV.PORT, () =>
  console.log(`Server are listen on Port:${ENV.PORT}`),
);
