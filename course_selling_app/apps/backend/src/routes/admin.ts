import express from "express";
import { Admin } from "../database/index";
import * as jwt from "jsonwebtoken";
import { SECRET_KEY } from "../middleware/index";
import { AdminZodSchema } from "@repo/common/config";
const router = express.Router();

router.post("/signup", async (req, res) => {
  const inputs = AdminZodSchema.safeParse(req.body);
  let adminname = inputs.data?.adminname;
  let gmail = inputs.data?.gmail;
  let password = inputs.data?.password;
  let findAdmin = await Admin.findOne({gmail});
  if (findAdmin) res.send({ message: "Admin exits" });
  else {
    const newAdmin = new Admin({
      adminname,
      gmail,
      password,
    });
    newAdmin.save();
    res.send(newAdmin);
  }
});
router.get("/", async (req, res) => {
  let find = await Admin.find();
  res.send({
    admins: find,
  });
});

export = router;
