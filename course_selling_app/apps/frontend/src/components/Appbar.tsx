import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
export default function Appbar() {
  const [usertoken, setUserToken] = useState(false);
  const [admintoken, setAdminToken] = useState(false);
  const handleClick = () => {
    setUserToken(false);
    setAdminToken(false);
    localStorage.clear();
  };
  useEffect(() => {
    if (localStorage.getItem("message") == "user") {
      setUserToken(true);
    }
  }, [usertoken]);
  useEffect(() => {
    if (localStorage.getItem("message") == "admin") {
      setAdminToken(true);
    }
  }, [usertoken]);
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
        {admintoken ? (
          <>
            <Link to={"/viewAllCourses"}>
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
          </>
        ) : (
          <></>
        )}
        {usertoken ? (
          <>
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
          </>
        ) : (
          <></>
        )}
      </div>
      <div>
        {usertoken || admintoken ? (
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
