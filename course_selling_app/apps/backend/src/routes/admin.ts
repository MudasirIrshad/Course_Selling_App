import express from "express";
import { Admin } from "../database/index";
import * as jwt from "jsonwebtoken";
import { SECRET_KEY } from "../middleware/index";
const router = express.Router();

router.get("/get", async (req, res) => {
  let admin_detail = Admin;
  if (!admin_detail) res.send({ message: "admin_detail not found" });
  else res.send({ message: "done"})
});
console.log(SECRET_KEY);

module.exports = router;
