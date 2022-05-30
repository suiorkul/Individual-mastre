import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { useBurgerContext } from "../contexts/ContextProvider";

export default function AddBurger() {
  const initValues = {
    name: "",
    image: "",
    price: "",
    description: "",
    count: 0,
  };
  const { addBurger } = useBurgerContext();
  const [inpValues, setInpValues] = React.useState(initValues);

  const handleChange = (e) => {
    let obj = {
      ...inpValues,
      [e.target.name]: e.target.value,
    };
    setInpValues(obj);
  };

  const handleSubmit = () => {
    if (inpValues.name || inpValues.name || inpValues.name || inpValues.name) {
      let obj = {
        ...inpValues,
        price: +inpValues.price,
      };
      addBurger(obj);
      setInpValues(initValues);
    } else {
      alert("Ошибка заполните поля!");
    }
  };
  return (
    <Box
      sx={{
        marginTop: "10px",
        display: "flex",
        flexDirection: "column",
        "& .MuiTextField-root": { minwidth: "320px" },
      }}
    >
      <TextField
        onChange={(e) => handleChange(e)}
        value={inpValues.name}
        name="name"
        label={"Бургер"}
        sx={{ backgroundColor: "#e0e0e0" }}
      />
      <TextField
        onChange={(e) => handleChange(e)}
        value={inpValues.image}
        name="image"
        label={"Фото"}
        sx={{ backgroundColor: "#e0e0e0" }}
      />
      <TextField
        onChange={(e) => handleChange(e)}
        value={inpValues.price}
        name="price"
        label={"Цена"}
        sx={{ backgroundColor: "#e0e0e0" }}
      />
      <TextField
        onChange={(e) => handleChange(e)}
        value={inpValues.description}
        name="description"
        label={"Описание"}
        sx={{ backgroundColor: "#e0e0e0" }}
      />
      <Button
        variant="contained"
        style={{ marginTop: "5px" }}
        onClick={() => handleSubmit()}
      >
        Add
      </Button>
    </Box>
  );
}
