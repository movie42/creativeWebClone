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
  const { data: meta } = await client.getSingle("meta");

  const { data: about } = await client.getSingle("about");
  res.render("pages/about", { about, meta });
});

app.get("/collections", (req, res) => {
  res.render("pages/collections");
});

app.get("/detail/:uid", async (req, res) => {
  const {
    params: { uid },
  } = req;
  const { data: meta } = await client.getSingle("meta");
  const { data } = await client.getByUID("product", uid, {
    fetchLinks: "collection.title",
  });
  console.log(data);
  res.render("pages/detail", { meta, data });
});

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`);
});
