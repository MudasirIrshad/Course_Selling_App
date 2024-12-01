import express from "express";
import { Admin } from "../database/index";
import * as jwt from "jsonwebtoken";
import { SECRET_KEY } from "../middleware/index";
import { AdminZodSchema } from "@repo/common/config";
const router = express.Router();

router.post("/signup", async (req, res) => {
  const inputs = AdminZodSchema.safeParse(req.body);
  if (!inputs.success) res.send("issue in input data");
  let adminname = inputs.data?.adminname;
  let gmail = inputs.data?.gmail;
  let password = inputs.data?.password;
  let findAdmin = await Admin.findOne({ gmail });
  if (findAdmin) res.send({ message: "Admin exits" });
  else {
    const newAdmin = new Admin({
      adminname,
      gmail,
      password,
    });
    await newAdmin.save();
    let token = jwt.sign({ adminname, gmail }, SECRET_KEY);
    res.send({ message: "Admin Signup Token", token });
  }
});

router.post("/login", async (req, res) => {
  const inputs = AdminZodSchema.safeParse(req.body);
  console.log(inputs);

  if (!inputs.success) res.send("issue in input data");
  let adminname = inputs.data?.adminname;
  let gmail = inputs.data?.gmail;
  let password = inputs.data?.password;
  let findAdmin = await Admin.findOne({ gmail, adminname, password });
  if (findAdmin) {
    let token = jwt.sign({ adminname, gmail }, SECRET_KEY);
    res.send({ message: "Admin Login Token", token });
  }
  else res.send("Please Signin first. thankyou")
});

router.get("/", async (req, res) => {
  let find = await Admin.find();
  res.send({
    admins: find,
  });
});

export = router;
