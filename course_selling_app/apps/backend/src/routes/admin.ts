import express from "express";
import { Admin, Course } from "../database/index";
import * as jwt from "jsonwebtoken";
import { SECRET_KEY } from "../middleware/index";
import { AdminZodSchema } from "@repo/common/config";
import { auth } from "../middleware/index";
import { CourseZodSchema } from "@repo/common/config";
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
  } else res.send("Please Signin first. thankyou");
});

router.get("/", async (req, res) => {
  let find = await Admin.find();
  res.send({
    admins: find,
  });
});

router.post("/addCourse", auth, async (req, res) => {
  const inputs = CourseZodSchema.safeParse(req.body);
  if (!inputs.success) res.send("Input validation error");
  let title = inputs.data?.title;
  let description = inputs.data?.description;
  let price = inputs.data?.price;
  let imageLink = inputs.data?.imageLink;
  let published = inputs.data?.published;
  let findCourse = await Course.findOne({ title, description, price });

  if (findCourse) res.send("course already exits");
  else {
    let newCourse = new Course({
      title,
      description,
      price,
      imageLink,
      published,
    });
    await newCourse.save();
    res.send("Course added succefully");
  }
});
export = router;
