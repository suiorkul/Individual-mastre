import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div>
      <h1 style={{ color: "red" }}>404</h1>
      <h2 style={{ color: "red" }}>Page Not Found! </h2>
      <Link style={{ textDecoration: "none" }} to="/">
        <Button
          style={{
            color: "white",
            backgroundColor: "transparent",
            border: "white 1px solid",
            borderRadius: "0",
          }}
          variant="contained"
        >
          Перейти в главную страницу
        </Button>
      </Link>
    </div>
  );
};

export default Error;
