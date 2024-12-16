import { Box, TextField, Button, Switch } from "@mui/material";
import { BASE_URL } from "@repo/ui/ui";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddCourse() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<Number>(0);
  const [imageLink, setImageLink] = useState("");
  const [published, setPublished] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    console.log(checked);
  };

  const handleClick = async () => {
    await axios
      .post(
        `${BASE_URL}/admin/addCourse`,
        {
          title,
          description,
          price,
          imageLink,
          published,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("Token"),
          },
        }
      )
      .then((res) => {
        navigate("/viewAllCourses");
      })
      .catch((err) => console.log("error in adding course"));
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Box
        component="section"
        sx={{
          p: 2,
          border: "1px dashed grey",
          width: "400px",
          margin: "10px",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TextField
          required
          style={{ padding: "10px", width: "350px" }}
          id="outlined-required"
          label="Title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <TextField
          required
          style={{ padding: "10px", width: "350px" }}
          id="outlined-required"
          label="Price"
          onChange={(e) => {
            setPrice(parseInt(e.target.value));
          }}
        />
        <TextField
          required
          style={{ padding: "10px", width: "350px" }}
          id="outlined-required"
          label="ImageLink"
          onChange={(e) => {
            setImageLink(e.target.value);
          }}
        />
        <TextField
          required
          style={{ padding: "10px", width: "350px" }}
          id="outlined-required"
          label="Description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <div style={{ width: "350px", margin: "10px" }}>
          <p>Published</p>
          <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        </div>
        <Button
          sx={{ backgroundColor: "black", width: "350px", margin: "10px" }}
          variant="contained"
          onClick={handleClick}
        >
          Submit
        </Button>
      </Box>
    </div>
  );
}
