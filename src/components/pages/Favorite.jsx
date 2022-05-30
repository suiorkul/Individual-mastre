import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useFavorite } from "../contexts/FavoriteContextProvider";
import "./Favorite.css";
import { useNavigate } from "react-router-dom";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "yellow",
  },
  "& .MuiRating-iconHover": {
    color: "yellow",
  },
});

const Favorite = () => {
  const { fav, getFav, deleteProdInFav } = useFavorite();
  const navigate = useNavigate();
  useEffect(() => {
    getFav();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      data-aos="fade-up"
      data-aos-delay="600"
    >
      <Button
        className="backbtn"
        style={{
          color: "white",
          border: "white 1px solid",
          borderRadius: "0",
          marginTop: "10px",
          padding: "10px 35px",
        }}
        onClick={() => {
          navigate(-1);
        }}
      >
        Назад
      </Button>
      <div className="favoriteCont">
        {fav?.products.length > 0 ? (
          fav.products.map((item1) => (
            <Card
              key={item1.item.id}
              sx={{
                marginTop: "20px",
                maxWidth: "320px",
                height: "400px",
                backgroundColor: "transparent",
                "& > legend": { mt: 2 },
              }}
            >
              <CardMedia
                className="photos"
                component="img"
                height="250"
                image={item1.item.image}
                alt="green iguana"
                onClick={() => {
                  navigate(`/menu/detail/${item1.item.id}`);
                }}
              />
              <CardContent sx={{ margin: "0", padding: "0" }}>
                <Typography
                  variant="h5"
                  sx={{ margin: "0", padding: "0", color: "white" }}
                  component="div"
                >
                  {item1.item.name}
                </Typography>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    className="price"
                    variant="body2"
                    sx={{ color: "white" }}
                  >
                    {item1.item.price} сом
                  </Typography>
                </div>
                <Button
                  className="add tocart"
                  onClick={() => {
                    deleteProdInFav(item1.item.id);
                  }}
                  sx={{
                    border: "white 1px solid",
                    padding: "10px 30px 10px 30px",
                    borderRadius: "0",
                  }}
                  style={{ color: "white" }}
                >
                  Remove
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <h1></h1>
        )}
      </div>
      {fav?.products.length <= 0 && (
        <img
          width="320px"
          src="https://i.pinimg.com/originals/ca/be/8a/cabe8ae261107483f3253ae5dce30830.png"
          alt=""
        />
      )}
    </div>
  );
};

export default Favorite;
