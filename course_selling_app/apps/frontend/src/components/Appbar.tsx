import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from "recoil";

import { userState } from "../store/user";
export default function Appbar() {
  const setUserState = useSetRecoilState(userState);
  const user = useRecoilValue(userState);
  const handleClick = () => {
    setUserState(false);
    localStorage.clear();
  };
  if (localStorage.getItem("Token")) setUserState(true);
  return (
    <div
      style={{
        backgroundColor: "black",
        padding: "10px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        <Button
          variant="contained"
          style={{
            backgroundColor: "white",
            color: "black",
            marginRight: "5px",
          }}
        >
          <Link to={"/"}>Home</Link>
        </Button>
        <Button
          variant="contained"
          style={{
            backgroundColor: "white",
            color: "black",
            marginRight: "5px",
          }}
        >
          Courses
        </Button>
      </div>
      <div>
        {user ? (
          <>
            <Button
              variant="contained"
              style={{
                backgroundColor: "white",
                color: "black",
                marginRight: "5px",
              }}
              onClick={handleClick}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="contained"
              style={{
                backgroundColor: "white",
                color: "black",
                marginRight: "5px",
              }}
            >
              <Link to={"/login"}>Login</Link>
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: "white", color: "black" }}
            >
              <Link to={"/signup"}>Signup</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
