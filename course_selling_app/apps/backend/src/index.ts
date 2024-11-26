import express from "express";
import mongoose from "mongoose";
import { DB_URL } from "@repo/common/config";
async function connectDatabase(DB_URL: string) {
  let connection = await mongoose.connect(DB_URL);
  if (connection) console.log("Connected Successfully");
  else console.log("Connection Failed");
}
connectDatabase(DB_URL);
const app = express();
const port = 3000;
app.listen(port, () => {
  console.log("running on port " + port);
});
