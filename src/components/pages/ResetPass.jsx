import { Button, Container, Link, InputLabel, Typography } from "@mui/material";
import React, { useState } from "react";
import { notify } from "../Toastify/Toastify";
import { useAuth } from "../contexts/AuthContextProvider";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        English Zone
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}
const ResetPass = () => {
  const { resetPass } = useAuth();
  const [inpVal, setInpVal] = useState("");

  const handleSend = () => {
    if (!inpVal) {
      notify("error", "Fill the field");
    } else {
      resetPass(inpVal);
      notify("success", "Sent to your email.");
      setInpVal("");
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "200px",
            padding: "30px",
          }}
        >
          <img
            src="https://www.freeiconspng.com/thumbs/forgot-password-icon/forgot-password-icon-14.png"
            alt=""
            width="50px"
          />
          <h4 style={{ color: "white" }}>Восстановить пароль</h4>
          <InputLabel
            style={{ marginBlock: "20px", fontWeight: "bold", color: "white" }}
          >
            Эл-почта
          </InputLabel>
          <input
            style={{
              color: "white",
              height: "30px",
              width: "300px",
              background: "rgba(128, 128, 128, 0.158)",
              border: "gray 1px solid",
            }}
            value={inpVal}
            onChange={(e) => setInpVal(e.target.value)}
          ></input>
          <Button
            onClick={handleSend}
            variant="contained"
            style={{
              backgroundColor: "transparent",
              border: "white 1px solid",
              borderRadius: "0",
              marginTop: "10px",
            }}
          >
            Отправить код подтверждения
          </Button>
          <Copyright sx={{ mt: 5 }} />
        </div>
      </Container>
    </div>
  );
};

export default ResetPass;
