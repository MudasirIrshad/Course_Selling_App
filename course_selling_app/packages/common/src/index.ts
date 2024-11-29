import mongoose from "mongoose";
import { z } from "zod";
export const AdminZodSchema = z
  .object({
    adminname: z.string().max(20).min(3),
    gmail: z.string().min(15).max(50),
    password: z.string().min(8).max(20),
  })
  .strict();

export async function connectDatabase() {
  let DB_URL =
    "mongodb+srv://mudasirirshad47:mudasir123456789@cluster0.jzcnrjw.mongodb.net/Course_Selling_App";
  let connection = await mongoose.connect(DB_URL);
  if (connection) console.log("Connected Successfully");
  else console.log("Connection Failed");
}
