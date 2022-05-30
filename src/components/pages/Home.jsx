import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import baner from "../images/burger-baner.png";

import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home" id="home">
      <div className="content">
        <img
          className="banerimg"
          data-aos="fade-up"
          data-aos-delay="150"
          src={baner}
          onClick={() => {
            navigate("/menu");
          }}
          alt=""
        />
        <h3 data-aos="fade-up" data-aos-delay="300">
          Сойдешь с ума от вкуса!
        </h3>
        <p data-aos="fade-up" data-aos-delay="450">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores at
          fuga aliquam ipsa recusandae repellat amet culpa cum.
        </p>
        <NavLink to="/menu">
          <Button data-aos="fade-up" data-aos-delay="600" className="menubtn">
            our menu
          </Button>
        </NavLink>
      </div>
    </div>
  );
};

export default Home;
