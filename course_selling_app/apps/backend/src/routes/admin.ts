import express from "express";
import { Admin, Course, User } from "../database/index";
import * as jwt from "jsonwebtoken";
import { SECRET_KEY } from "../middleware/index";
import { AdminZodSchema } from "@repo/common/config";
import { auth } from "../middleware/index";
import { CourseZodSchema } from "@repo/common/config";
const router = express.Router();

router.post("/signup", async (req, res) => {
  const inputs = AdminZodSchema.safeParse(req.body);
  if (inputs.error) res.send({ message: inputs.error });

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

  if (inputs.error) res.send({ message: inputs.error });
  if (!inputs.success) res.send("issue in input data");
  let adminname = inputs.data?.adminname;
  let gmail = inputs.data?.gmail;
  let password = inputs.data?.password;
  let findAdmin = await Admin.findOne({ gmail, adminname, password });
  if (findAdmin) {
    let token = jwt.sign({ adminname, gmail }, SECRET_KEY);
    res.send({ message: "admin", token });
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

  if (inputs.error) res.send({ message: inputs.error });
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
router.get("/viewAllCourses", auth, async (req, res) => {
  let find = await Course.find();
  if (!find) res.send("No course available");
  else {
    res.send({ courses: find });
  }
});
router.get("/viewUsers", async (req, res) => {
  let find = await User.find();
  if (!find) res.send("No users found");
  res.send(find);
});
router.put("/editCourse/:courseId", auth, async (req, res) => {
  const courseId = req.params.courseId;
  console.log(courseId);

  const find = await Course.findByIdAndUpdate(courseId, req.body);
  if (find) res.send({ message: "Done" });
  else res.send("error");
});
router.delete("/deleteCourse/:courseId", auth, async (req, res) => {
  const courseId = req.params.courseId;
  console.log(courseId);

  const find = await Course.findByIdAndDelete(courseId);
  if (find) res.send({ message: "Done" });
  else res.send("error");
});
export = router;
