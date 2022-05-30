import { Button, Container, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContextProvider";
import { useComContext } from "../contexts/ComContextProvider";
import SendIcon from "@mui/icons-material/Send";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  input: {
    color: "white",
  },
  root: {
    "& .MuiFormLabel-root": {
      color: "white",
    },
    "& .MuiInput-root": {
      color: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "transparent",
      },
      "&:hover fieldset": {
        borderColor: "transparent",
      },
      "&.Mui-focused fieldset": {
        borderColor: "transparent",
      },
    },
  },
});

const AddCom = () => {
  const { addCom, getCom } = useComContext();
  const { currentUser } = useAuth();
  const { prodId } = useParams();

  const [values, setValues] = useState({
    author: "",
    title: "",
    prodId: +prodId,
  });

  useEffect(() => {
    setValues({ ...values, author: currentUser.user });
  }, [currentUser]);

  const handleChange = (e) => {
    let newCom = {
      ...values,
      [e.target.name]: e.target.value,
    };
    setValues(newCom);
  };

  function handleClick() {
    if (!values.title) {
      alert("You can not send empty blank!");
    } else {
      if (currentUser.user) {
        addCom(values);
        setValues({ title: "", author: currentUser.user, prodId: +prodId });
        getCom(prodId);
      } else {
        alert("Авторизуруйтесь чтобы оставлять комментарии!");
      }
    }
  }

  const classes = useStyles();

  return (
    <Container sx={{ display: "flex", my: "20px" }}>
      <TextField
        className={classes.root}
        InputProps={{
          className: classes.multilineColor,
        }}
        id="outlined-multiline-static"
        label="Add new comment..."
        multiline
        fullWidth
        rows={1}
        name="title"
        value={values.title}
        onChange={(e) => handleChange(e)}
        style={{
          backgroundColor: "rgba(128, 128, 128, 0.223)",
        }}
        sx={{ input: { color: "white" } }}
      />
      <Button onClick={handleClick}>
        <SendIcon sx={{ width: "50px", height: "40px" }} />
      </Button>
    </Container>
  );
};

export default AddCom;
