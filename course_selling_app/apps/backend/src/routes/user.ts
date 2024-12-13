import express from "express";
import { User, Course } from "../database/index";
import * as jwt from "jsonwebtoken";
import { SECRET_KEY } from "../middleware/index";
import { UserZodSchema } from "@repo/common/config";
import { auth } from "../middleware/index";
import cors  from "cors";
const app = express()
app.use(cors())
const router = express.Router();

router.post("/signup", async (req, res) => {
  const inputs = UserZodSchema.safeParse(req.body);
  if (inputs.error) res.send({ message: inputs.error });

  if (!inputs.success) res.send("issue in input data");
  let username = inputs.data?.username;
  let gmail = inputs.data?.gmail;
  let password = inputs.data?.password;
  let find = await User.findOne({ gmail });
  if (find) res.send({ message: "User exits" });
  else {
    const newUser = new User({
      username,
      gmail,
      password,
    });
    await newUser.save();
    let token = jwt.sign({ username, gmail }, SECRET_KEY);
    res.send({ message: "User Signup Token", token });
  }
});

router.post("/login", async (req, res) => {
  const inputs = UserZodSchema.safeParse(req.body);

  if (inputs.error) res.send({ message: inputs.error });
  if (!inputs.success) res.send("issue in input data");
  let username = inputs.data?.username;
  let gmail = inputs.data?.gmail;
  let password = inputs.data?.password;
  let find = await User.findOne({ gmail, username, password });
  if (find) {
    let token = jwt.sign({ username, gmail }, SECRET_KEY);
    res.send({ message: "User Login Token", token });
  } else res.send("Please Signin first. thankyou");
});

router.get("/courses", async (req, res) => {
  const find = await Course.find({ published: true });
  if (!find) res.send("No course available");
  else res.send({ courses: find });
});

router.post("/purchaseCourse/:courseId", auth, async (req, res) => {
  const courseId = req.params.courseId;
  const course = await Course.findById(courseId);
  let username = req.user.username;

  if (course) {
    const user = await User.findOne({ username });
    if (user) {
      user.purchasedCourses.push(course);
      user.save();
      res.send("Course Successfully purchased");
    } else res.status(403).send("user not found");
  } else res.send("course not found");
});
router.get("/purchasedCourses", auth, async (req, res) => {
  const find = await User.findOne({ username: req.user.username }).populate(
    "purchasedCourses"
  );
  if (find) {
    res.send({ purchasedCourses: find.purchasedCourses });
  } else res.send("no course found");
});

export = router;
