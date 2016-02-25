"use strict";

const express = require("express");
const redisClient = require("./redis-client");
const app = express();
const router = express.Router();

const PORT = 8330;

router.get("/", (req, res) => {
  res.json({message: "W!"});
});

app.listen(PORT, () => {
  console.log("Server spawned on port " + PORT);
});

router.route("/features")
  .get((req, res) => {
    redisClient.getAll(res);
  });

router.route("/features/:feature_id")
  .get((req, res) => {
    redisClient.get(req.params.feature_id, res);
  });

redisClient.set("hede", "hodo");
redisClient.set("hqwede", "hweqodo");
redisClient.set("hedweqwe", "howedo");
redisClient.set("heweqwde", {});

app.use("/api", router);
