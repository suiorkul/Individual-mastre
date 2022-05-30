import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useComContext } from "../contexts/ComContextProvider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { Container, IconButton } from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useAuth } from "../contexts/AuthContextProvider";
import { notify } from "../Toastify/Toastify";

const ListCom = () => {
  const { comments, getCom, delCom } = useComContext();
  const { prodId } = useParams();
  const { currentUser } = useAuth();

  useEffect(() => {
    getCom(prodId);
  }, []);

  const del = (item) => {
    if (
      currentUser.user === item.author ||
      currentUser.user === "admin@gmail.com"
    ) {
      delCom(item.id, prodId);
      notify("warning", "Comment deleted,successfully!");
    } else {
      notify("error", "Only admin and the author can delete comments!");
    }
  };

  return (
    <Container>
      {comments.length > 0 ? (
        comments.map((item) => (
          <Container key={item.id}>
            <List
              sx={{
                width: "100%",
                maxWidth: 360,
                color: "white",
                border: "none",
              }}
            >
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <FaceIcon sx={{ width: "40px", height: "40px" }} />
                </ListItemAvatar>
                <ListItemText
                  secondary={
                    <React.Fragment>
                      <span
                        style={{ color: "white" }}
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                      >
                        {item.author}
                      </span>{" "}
                      <br />
                      <span style={{ color: "white" }}>{item.title}</span>
                    </React.Fragment>
                  }
                />
                {currentUser.isAdmin && (
                  <IconButton onClick={() => del(item)}>
                    <DeleteOutlineIcon style={{ color: "white" }} />
                  </IconButton>
                )}
              </ListItem>
              <Divider variant="inset" component="li" />
            </List>
          </Container>
        ))
      ) : (
        <h2 style={{ color: "white" }}>No comments, yet.</h2>
      )}{" "}
    </Container>
  );
};

export default ListCom;
