import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@repo/ui/ui";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Alert,
} from "@mui/material";
export default function Home() {
  const [buy, setBuy] = useState(false);
  const [courses, setCourses] = useState([]);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/user/courses`)
      .then((res) => {
        console.log("Done");
        setCourses(res.data.courses);
        console.log(res.data.courses);
      })
      .catch((err) => console.log("err"));
  }, []);

  async function handleClick(courseId) {
    if (!localStorage.getItem("Token")) {
      setAlert(true);
    }
    console.log(courseId);
    await axios
      .post(
        `${BASE_URL}/user/purchaseCourse/${courseId}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("Token"),
          },
        }
      )
      .then((res) => {
        setBuy(true);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  setTimeout(() => {
    setBuy(false);
  }, 4000);
  setTimeout(() => {
    setAlert(false);
  }, 4000);
  return (
    <div>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <Card sx={{ maxWidth: 345, height: "100%" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  sx={{ width: "100%", height: "200px", objectFit: "cover" }}
                  image={course.imageLink}
                  alt={course.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {course.description}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="primary"
                    sx={{ marginTop: 1 }}
                  >
                    {course.price}
                  </Typography>
                  <Button
                    onClick={() => {
                      handleClick(course._id);
                    }}
                    variant="contained"
                    style={{ backgroundColor: "black", color: "white" }}
                  >
                    Buy
                  </Button>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
        {alert ? (
          <Alert style={{ margin: "20px" }} variant="outlined" severity="error">
            PLEASE SIGNIN OR LOGIN TO BUY THIS COURSE. THANKYOU
          </Alert>
        ) : (
          <></>
        )}
        {buy ? (
          <Alert
            style={{ margin: "20px" }}
            variant="outlined"
            severity="success"
          >
            Course Purchased. THANKYOU
          </Alert>
        ) : (
          <></>
        )}
      </Grid>
    </div>
  );
}
