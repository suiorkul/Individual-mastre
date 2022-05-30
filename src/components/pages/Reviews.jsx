import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useReviewContext } from "../contexts/ReviewContext";
import titleimg from "../images/title-img.png";
import SendIcon from "@mui/icons-material/Send";
import RevCard from "../admin/RevCard";
import "./Reviews.css";
import { useAuth } from "../contexts/AuthContextProvider";
import { ModalHover } from "react-modal-hover";

const Reviews = () => {
  const INIT = {
    text: "",
    user: "",
  };
  const { getReview, reviews, addReview } = useReviewContext();
  const [inpValues, setInpValues] = useState(INIT);
  const [addModal, setAddModal] = useState(false);
  const { currentUser } = useAuth();
  useEffect(() => {
    getReview();
  }, []);

  const toggle = () => {
    addModal ? setAddModal(false) : setAddModal(true);
  };
  const handleChange = (e) => {
    let obj = {
      ...inpValues,
      text: e.target.value,
      user: currentUser.user,
    };
    setInpValues(obj);
  };
  const handleSubmit = () => {
    if (!inpValues.text) {
      return;
    } else {
      addReview(inpValues);
      setInpValues(INIT);
      setAddModal(false);
    }
  };
  return (
    <div className="reviews">
      <img
        data-aos="fade-up"
        data-aos-delay="400"
        className="title"
        src={titleimg}
        alt=""
      />
      <Button
        data-aos="fade-up"
        data-aos-delay="400"
        className="rev-btn"
        onClick={toggle}
      >
        Leave feedback
      </Button>
      {addModal ? (
        <div
          style={{ display: "flex", alignItems: "center", maxWidth: "320px" }}
        >
          <input
            type="text"
            placeholder="your feedback"
            value={inpValues.text}
            onChange={(e) => handleChange(e)}
            className="inpbox"
          />
          <SendIcon
            sx={{ color: "white", margin: "0 10px 0 10px" }}
            onClick={handleSubmit}
          />
        </div>
      ) : null}

      <div className="peoplerev">
        {reviews && reviews.length > 0 ? (
          reviews.map((item) => <RevCard key={item.id} item={item} />)
        ) : (
          <h1 className="no">No Reviews</h1>
        )}
      </div>
    </div>
  );
};

export default Reviews;
