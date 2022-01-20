import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import prismicHelper from "@prismicio/helpers";
import { client } from "./config/prismicConfig.js";

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use((req, res, next) => {
  res.locals.ctx = {
    prismicHelper,
  };
  next();
});

app.get("/", (req, res) => {
  res.render("pages/home");
});

app.get("/about", async (req, res) => {
  const documents = await client.getFirst();
  console.log(documents);
  res.render("pages/about", { documents });
});

app.get("/detail/:uid", (req, res) => {
  res.render("pages/detail");
});

app.get("/collections", (req, res) => {
  res.render("pages/collections");
});

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`);
});
