import express from "express";
import ViteExpress from "vite-express";
import mongoose from "mongoose";
import { load } from "ts-dotenv";

const env = load({
  DB_USER: String,
  DB_PASSWORD: String,
})

const app = express();

app.get("/api/test", (_, res) => {
  res.send("this is an api response!!!!");
});

await mongoose.connect(`mongodb+srv://${env.DB_USER}:${env.DB_PASSWORD}@cluster0.jfdd8.mongodb.net/u09`);

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
