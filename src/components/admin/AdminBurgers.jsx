import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { useBurgerContext } from "../contexts/ContextProvider";

const AdminBurgers = () => {
  const { burgers, getBurger, delBurger, idForEdit } = useBurgerContext();
  const navigate = useNavigate();
  useEffect(() => {
    getBurger();
  }, []);
  return burgers && burgers.length > 0 ? (
    burgers.map((item) => (
      <Card
        key={item.id}
        sx={{
          marginTop: "20px",
          height: "380px",
          maxWidth: 300,
          backgroundColor: "transparent",
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <CardMedia
          component="img"
          height="250"
          image={item.image}
          alt="green iguana"
        />
        <CardContent sx={{ margin: "0", padding: "0" }}>
          <Typography
            variant="h5"
            sx={{ margin: "0", padding: "0", color: "white" }}
            component="div"
          >
            {item.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ color: "white" }}
          >
            {item.price} сом
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            margin: "0",
            padding: "0",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <EditIcon
            onClick={() => {
              idForEdit(item.id);
              navigate("/edit");
            }}
            sx={{ color: "white" }}
          />
          <HighlightOffRoundedIcon
            onClick={() => {
              delBurger(item.id);
            }}
            sx={{ color: "white" }}
          />
        </CardActions>
      </Card>
    ))
  ) : (
    <CircularProgress />
  );
};

export default AdminBurgers;
