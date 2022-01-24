const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
const { MongoClient } = require("mongodb");
let count = 0;
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

async function main(req, dbName, coll) {
  /*  const dbName = "contacts"; */
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(`${dbName}`);
  const collection = db.collection(`${coll}`);

  const result = collection.insertMany([{ ...req }]);

  return result;
}

/* async function mainone(req) {
  const dbName = "remainders";
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("remainder");
  collection.insertMany([{ ...req }]);
  return "done.";
} */

app.get("/moshe", function (req, res) {
  res.send(count++ + "");
});

app.post("/reminders", function (req, res) {
  main(req.body, "contacts", "reminder");
  res.send("Hello World");
});

app.post("/contact-us", function (req, res) {
  main(req.body, "contacts", "contact");
  res.json({ ...req.body });
});

app.listen(3000);
