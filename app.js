import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import * as prismicH from "@prismicio/helpers";
import { client } from "./config/prismicConfig.js";

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use((req, res, next) => {
  res.locals.prismicH = prismicH;
  next();
});

app.get("/", (req, res) => {
  res.render("pages/home");
});

app.get("/about", async (req, res) => {
  const { data } = await client.getFirst();
  console.log(data);
  res.render("pages/about", { data });
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
