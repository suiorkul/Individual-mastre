import React from "react";
import about from "../images/about-img.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import "./About.css";
import { Button } from "@mui/material";

const About = () => {
  return (
    <div className="about" id="about">
      <div className="image" data-aos="fade-right" data-aos-delay="150">
        <img className="aboutimg" src={about} alt="" />
      </div>

      <div className="content" data-aos="fade-left" data-aos-delay="300">
        <h3 className="titl">Step into burger heaven</h3>
        <p style={{ textAlign: "start" }}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est, veniam
          error fugit quasi perspiciatis blanditiis quo, sint beatae ut, commodi
          fuga illo reprehenderit ea voluptatibus earum fugiat obcaecati
          doloremque? Aspernatur?
        </p>
        <div className="icons">
          <h3>
            {" "}
            <FontAwesomeIcon color="yellow" icon={faCheck} /> best price{" "}
          </h3>
          <h3>
            {" "}
            <FontAwesomeIcon color="yellow" icon={faCheck} /> Best Service{" "}
          </h3>
          <h3>
            {" "}
            <FontAwesomeIcon color="yellow" icon={faCheck} /> Fresh Ingredient{" "}
          </h3>
          <h3>
            {" "}
            <FontAwesomeIcon color="yellow" icon={faCheck} /> backed buns{" "}
          </h3>
          <h3>
            {" "}
            <FontAwesomeIcon color="yellow" icon={faCheck} /> natural cheese{" "}
          </h3>
          <h3>
            {" "}
            <FontAwesomeIcon color="yellow" icon={faCheck} /> veg & non-veg{" "}
          </h3>
          <h3>
            {" "}
            <FontAwesomeIcon color="yellow" icon={faCheck} /> natural cheese{" "}
          </h3>
          <h3>
            {" "}
            <FontAwesomeIcon color="yellow" icon={faCheck} /> veg & non-veg{" "}
          </h3>
        </div>
        <div>
          <Button className="aboutbtn">read more</Button>
        </div>
      </div>
    </div>
  );
};

export default About;
