import { Button } from "@mui/material";
import { Link } from "react-router-dom";
export default function Appbar() {
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
        <Button
          variant="contained"
          style={{ backgroundColor: "white", color: "black" }}
        >
          Home
        </Button>
      </div>
    </div>
  );
}
