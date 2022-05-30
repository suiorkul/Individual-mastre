import React, { useEffect, useState } from "react";
import { useBurgerContext } from "../contexts/ContextProvider";
import OneBurger from "../admin/OneBurger";
import "./Menu.css";
import titleimg from "../images/title-img.png";
import PriceFilter from "../admin/PriceFilter";
import { useSearchParams } from "react-router-dom";
import { Pagination } from "@mui/material";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  ul: {
    "& .MuiPaginationItem-root": {
      color: "white",
    },
  },
}));

const maxSliderValue = 1000;
const minSliderValue = 1;

const Menu = () => {
  const { burgers, getBurger, pageTotalCount } = useBurgerContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(+searchParams.get("_page") || 1);
  const [slider, setSlider] = useState(
    +searchParams.get("price_gte") || minSliderValue
  );
  const classes = useStyles();
  useEffect(() => {
    setSearchParams({
      _limit: 4,
      _page: page,
      price_gte: slider,
      q: searchParams.get("q") || "",
    });
  }, []);

  useEffect(() => {
    getBurger();
  }, [searchParams]);

  useEffect(() => {
    setSearchParams({
      _limit: 4,
      _page: page,
      price_gte: slider,
      q: searchParams.get("q") || "",
    });
  }, [page, slider]);

  const handleReset = () => {
    setSlider(minSliderValue);
    setSearchParams({
      _page: page,
      _limit: 4,
      price_gte: minSliderValue,
      q: "",
    });
  };

  return (
    <div>
      <img
        data-aos="fade-up"
        data-aos-delay="400"
        className="titleimg"
        src={titleimg}
        alt=""
      />
      <div className="menu-list">
        {burgers && burgers.length > 0
          ? burgers.map((item) => <OneBurger key={item.id} item={item} />)
          : null}
      </div>
      <div style={{ textAlign: "center", margin: "50px 0" }}>
        {slider > 100 ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              className="reset"
              width="20px"
              onClick={handleReset}
              // style={{ position: "absolute" }}
              src="https://www.pngkey.com/png/full/61-612472_minimalist-x-mark-clip-art-medium-size-yellow.png"
              alt=""
            />
          </div>
        ) : (
          <p style={{ margin: "0", padding: "0", color: "white" }}>
            Фильтровать по цене
          </p>
        )}

        <PriceFilter
          setPage={setPage}
          slider={slider}
          setSlider={setSlider}
          maxSliderValue={maxSliderValue}
          minSliderValue={minSliderValue}
        />
        <Pagination
          classes={{ ul: classes.ul }}
          count={pageTotalCount}
          color="secondary"
          sx={{ display: "inline-block" }}
          onChange={(event, pageVal) => setPage(pageVal)}
          page={page}
        />
      </div>
    </div>
  );
};

export default Menu;
