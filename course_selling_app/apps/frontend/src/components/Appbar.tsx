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
        <Link to={"/"}>
          <Button
            variant="contained"
            style={{
              backgroundColor: "white",
              color: "black",
              marginRight: "5px",
            }}
          >
            Home
          </Button>
        </Link>
        <Link to={"/purchasedCourses"}>
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
        </Link>
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
            <Link to={"/login"}>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "white",
                  color: "black",
                  marginRight: "5px",
                }}
              >
                Login
              </Button>
            </Link>
            <Link to={"/signup"}>
              <Button
                variant="contained"
                style={{ backgroundColor: "white", color: "black" }}
              >
                Signup
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
