import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import "./OneBurger.css";
import { useCart } from "../contexts/CartContextProvider";
import { useNavigate } from "react-router-dom";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useFavorite } from "../contexts/FavoriteContextProvider";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useLikeContext } from "../contexts/LikeContextProvider";
import { useAuth } from "../contexts/AuthContextProvider";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "yellow",
  },
  "& .MuiRating-iconHover": {
    color: "yellow",
  },
});

const OneBurger = ({ item }) => {
  const navigate = useNavigate();
  const { currentUser, logOutUser } = useAuth();
  const { addDelToCart, isProdInCart } = useCart();
  const { addDelToFav, isProdInFav } = useFavorite();
  const [inCart, setInCart] = React.useState(isProdInCart(item.id));
  const [inFav, setInFav] = React.useState(isProdInFav(item.id));
  const { addLike, delLike, getLike, likes, allLikes } = useLikeContext();
  const isLikedF = () =>
    likes.some((like) => {
      return like.itemId === item.id;
    });
  const [disabled, setDisabled] = React.useState(false);
  const [isLiked, setIsLiked] = React.useState(isLikedF());
  React.useEffect(() => {
    getLike();
  }, []);
  React.useEffect(() => {
    setIsLiked(isLikedF());
  }, [likes]);

  const handleSubmitLike = () => {
    let forDelId = likes.find((item1) => item1.itemId === item.id);
    let obj = {
      user: currentUser.user,
      itemId: item.id,
    };
    let checkProdIsLiked = likes.some((item2) => {
      return obj.itemId === item2.itemId;
    });
    if (checkProdIsLiked && forDelId) {
      delLike(forDelId.id);
    } else {
      addLike(obj);
    }
  };

  let prodLikes = allLikes.filter((elem1) => {
    return elem1.itemId === item.id;
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      data-aos="fade-up"
      data-aos-delay="600"
    >
      <Card
        key={item.id}
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
          image={item.image}
          alt="green iguana"
          onClick={() => {
            navigate(`/menu/detail/${item.id}`);
          }}
        />
        <StyledRating
          name="customized-color"
          defaultValue={2}
          getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
          precision={0.5}
          icon={<StarIcon fontSize="inherit" />}
          emptyIcon={
            <StarBorderIcon sx={{ color: "yellow" }} fontSize="inherit" />
          }
        />
        <CardContent sx={{ margin: "0", padding: "0" }}>
          <Typography
            variant="h5"
            sx={{ margin: "0", padding: "0", color: "white" }}
            component="div"
          >
            {item.name}
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {isLiked ? (
              <FavoriteIcon
                style={{ color: "red" }}
                onClick={() => {
                  setDisabled(true);
                  handleSubmitLike();
                }}
              />
            ) : (
              <FavoriteBorderIcon
                style={{ color: "white" }}
                onClick={() => {
                  setDisabled(true);
                  handleSubmitLike();
                }}
              />
            )}
            <p style={{ margin: "0", padding: "0", color: "gray" }}>
              {prodLikes.length}
            </p>
            <Typography
              className="price"
              variant="body2"
              sx={{ color: "white" }}
            >
              {item.price} сом
            </Typography>
            {inFav ? (
              <BookmarkIcon
                onClick={() => {
                  addDelToFav(item);
                  setInFav(isProdInFav(item.id));
                }}
                style={{ color: "yellow" }}
              />
            ) : (
              <BookmarkBorderIcon
                onClick={() => {
                  addDelToFav(item);
                  setInFav(isProdInFav(item.id));
                }}
                style={{ color: "white" }}
              />
            )}
          </div>
          <Button
            className="add tocart"
            onClick={() => {
              addDelToCart(item);
              setInCart(isProdInCart(item.id));
            }}
            sx={{
              border: "white 1px solid",
              padding: "10px 30px 10px 30px",
              borderRadius: "0",
            }}
            style={{ color: inCart ? "yellow" : "white" }}
          >
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default OneBurger;
