import mongoose from "mongoose";
import { DB_URL } from "@repo/common/config";
mongoose.connect(DB_URL);

const adminSingupSchema = new mongoose.Schema({
  name: String,
  gmail: String,
  password: String,
});

const userSignupSchema = new mongoose.Schema({
  name: String,
  gmail: String,
  password: String,
  purchaseCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "courseAdd" }],
});

const courseAddSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  image: String,
});

const AdminSignup = mongoose.model("AdminSignup", adminSingupSchema);
const UserSignup = mongoose.model("UserSignup", userSignupSchema);
const courseAdd = mongoose.model("courseAdd", courseAddSchema);

module.exports = {
  AdminSignup,
  UserSignup,
  courseAdd,
};
