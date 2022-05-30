import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Rating from "@mui/material/Rating";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import Typography from "@mui/material/Typography";
import { useReviewContext } from "../contexts/ReviewContext";
import { useAuth } from "../contexts/AuthContextProvider";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { styled } from "@mui/material/styles";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "yellow",
  },
  "& .MuiRating-iconHover": {
    color: "yellow",
  },
});

export default function RevCard({ item }) {
  const [value, setValue] = React.useState(2);
  const { delReview } = useReviewContext();
  const { currentUser } = useAuth();
  return (
    <Card
      data-aos="fade-up"
      data-aos-delay="300"
      sx={{
        maxWidth: 300,
        backgroundColor: "transparent",
        paddingTop: "10px",
        maxHeight: "300px",
      }}
    >
      <img
        width="100px"
        src="https://icon-library.com/images/profile-icon-white/profile-icon-white-3.jpg"
        alt=""
      />

      <CardContent>
        <Typography gutterBottom variant="h6" component="div" color="white">
          {item.user}
        </Typography>
        <Typography variant="body2" color="white">
          {item.text}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
      >
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
        {item.user && currentUser.isAdmin ? (
          <HighlightOffRoundedIcon
            onClick={() => delReview(item.id)}
            sx={{ color: "white" }}
          />
        ) : null}
      </CardActions>
    </Card>
  );
}
