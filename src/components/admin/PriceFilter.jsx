import React from "react";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";

const Filter = ({
  setPage,
  slider,
  setSlider,
  maxSliderValue,
  minSliderValue,
}) => {
  return (
    <div style={{ textAlign: "center" }}>
      <Slider
        color="secondary"
        sx={{ maxWidth: "350px" }}
        value={slider}
        onChange={(e, newValue) => {
          setSlider(newValue);
          setPage(1);
        }}
        valueLabelDisplay="auto"
        max={maxSliderValue}
        min={minSliderValue}
      />
      <br />
    </div>
  );
};

export default Filter;
