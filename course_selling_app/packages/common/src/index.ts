import mongoose from "mongoose";

export const ROUTE_URL = `http://localhost/`;

export async function connectDatabase() {
  let DB_URL =
    "mongodb+srv://mudasirirshad47:mudasir123456789@cluster0.jzcnrjw.mongodb.net/Course_Selling_App";
  let connection = await mongoose.connect(DB_URL);
  if (connection) console.log("Connected Successfully");
  else console.log("Connection Failed");
}
