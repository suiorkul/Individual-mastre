import React from "react";
import titleimg from "../images/title-img.png";
import blog1 from "../images/blog-1.jpg";
import blog2 from "../images/blog-2.jpg";
import blog3 from "../images/blog-3.jpg";
import "./Blogs.css";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faUser } from "@fortawesome/free-solid-svg-icons";

const Blogs = () => {
  return (
    <div className="blogs" data-aos="fade-up" data-aos-delay="600">
      <img src={titleimg} style={{ marginTop: "10px" }} alt="" />
      <p className="title">DAILY POSTS</p>
      <div className="blog-images" data-aos="fade-up" data-aos-delay="600">
        <div className="blog-cont">
          <img className="blog" src={blog1} alt="" />
          <h3 className="h33">blog title goes here.</h3>
          <div style={{ maxWidth: "300px" }}>
            <p className="pp">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Voluptas, maxime.
            </p>
          </div>
          <Button className="btn11">read more</Button>
        </div>
        <div className="blog-cont">
          <img className="blog" src={blog2} alt="" />
          <h3 className="h33">blog title goes here.</h3>
          <div style={{ maxWidth: "300px" }}>
            <p className="pp">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Voluptas, maxime.
            </p>
          </div>
          <Button className="btn11">read more</Button>
        </div>
        <div className="blog-cont">
          <img className="blog" src={blog3} alt="" />
          <h3 className="h33">blog title goes here.</h3>
          <div style={{ maxWidth: "300px" }}>
            <p className="pp">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Voluptas, maxime.
            </p>
          </div>
          <Button className="btn11">read more</Button>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
