const express = require("express");
const app = express();
const fs = require("fs");
const PORT = 4000;
const path = require("path");
app.use(express.json());
// const cities = require("../data");

app.use(express.static("data"));

app.get("/", (req, res) => {
  console.log("hi");
  res.send("hi");
});

app.get("/:city", (req, res) => {
  const city = req.params.city;
  console.log(city);
  fs.readFile(`../data/${city}.json`, (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

app.get("/:city/pharmacies", (req, res) => {
  const city = req.params.city;
  console.log(city);
  fs.readFile(`../data/${city}.json/pharmacies`, (err, data) => {
    if (err) throw err;
    console.log(data);
    res.send(data);
  });
});

// app.get("/:city/doctors", (req, res) => {
//   res.send(`${req.params.city}`.doctors);
// });

const listening = app.listen(process.env.PORT || PORT, function () {
  console.log("Your app is listening on port " + listening.address().port);
});
