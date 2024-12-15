import { Box, Button, TextField } from "@mui/material";
import { BASE_URL } from "@repo/ui/ui";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/user";

export default function Login() {
  const setUserState = useSetRecoilState(userState);
  const navigate = useNavigate();
  const handleClick = async () => {
    const res = await axios.post(
      `${BASE_URL}/user/login`,
      {
        username,
        gmail,
        password,
      },
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const data = res.data;
    if (data.message == true) {
      navigate("/");
      localStorage.setItem("Token", data.token);

      if (localStorage.getItem("Token")) setUserState(true);
    }
  };
  const [username, setUsername] = useState("");
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");

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
          label="Name"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <TextField
          required
          style={{ padding: "10px", width: "350px" }}
          id="outlined-required"
          label="Gmail"
          onChange={(e) => {
            setGmail(e.target.value);
          }}
        />
        <TextField
          required
          style={{ padding: "10px", width: "350px" }}
          id="outlined-required"
          label="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button
          sx={{ backgroundColor: "black", width: "350px", margin: "10px" }}
          variant="contained"
          onClick={handleClick}
        >
          Login
        </Button>
      </Box>
    </div>
  );
}
