const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const randomCountryName = require("random-country-name");

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(cors());

app.get("/api/getAge/:name", (req, res) => {
  const name = req.params.name;
  const age = Math.round(Math.random() * 100);
  const data = { name: name, age: age };
  res.json(data);
});

app.get("/api/getGender/:name", (req, res) => {
  const name = req.params.name;
  const gender = Math.random() < 0.5 ? "male" : "female";
  const data = { name: name, gender: gender };
  res.json(data);
});
app.get("/api/getCountry/:name", (req, res) => {
  const name = req.params.name;
  const country = [
    {
      name: randomCountryName.random(),
      probability: Math.floor(Math.random() * 100),
    },
    {
      name: randomCountryName.random(),
      probability: Math.floor(Math.random() * 100),
    },
  ];
  const data = { name: name, country: country };
  res.json(data);
});

app.listen(8080, () => {
  console.log("listening on port 8080");
});
