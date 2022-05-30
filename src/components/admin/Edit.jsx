import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useBurgerContext } from "../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";

export default function EditBurger() {
  const initValues = {
    name: "",
    image: "",
    price: "",
    description: "",
  };
  const { objForEdit, saveBurger } = useBurgerContext();
  const [editValues, setEditValues] = React.useState(initValues);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (objForEdit) {
      setEditValues(objForEdit);
    }
  }, [objForEdit]);

  const handleChange = (e) => {
    let obj = {
      ...editValues,
      [e.target.name]: e.target.value,
    };
    setEditValues(obj);
  };

  const handleSubmit = () => {
    if (
      editValues.name ||
      editValues.name ||
      editValues.name ||
      editValues.name
    ) {
      saveBurger(editValues);
      setEditValues(initValues);
      navigate("/admin");
    } else {
      alert("Ошибка заполните поля!");
    }
  };
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          marginTop: "10px",
          display: "flex",
          flexDirection: "column",
          "& .MuiTextField-root": { minWidth: "320px" },
        }}
      >
        <TextField
          onChange={(e) => handleChange(e)}
          value={editValues.name}
          name="name"
          label={"Бургер"}
          sx={{ backgroundColor: "#e0e0e0" }}
        />
        <TextField
          onChange={(e) => handleChange(e)}
          value={editValues.image}
          name="image"
          label={"Фото"}
          sx={{ backgroundColor: "#e0e0e0" }}
        />
        <TextField
          onChange={(e) => handleChange(e)}
          value={editValues.price}
          name="price"
          label={"Цена"}
          sx={{ backgroundColor: "#e0e0e0" }}
        />
        <TextField
          onChange={(e) => handleChange(e)}
          value={editValues.description}
          name="description"
          label={"Описание"}
          sx={{ backgroundColor: "#e0e0e0" }}
        />
        <div>
          <Button
            variant="contained"
            style={{
              marginTop: "5px",
              marginRight: "2px",
              width: "47%",
              backgroundColor: "green",
            }}
            onClick={() => handleSubmit()}
          >
            Save
          </Button>
          <Button
            variant="contained"
            style={{
              marginTop: "5px",
              marginLeft: "1px",
              width: "47%",
              backgroundColor: "red",
            }}
            onClick={() => navigate("/admin")}
          >
            Cancel
          </Button>
        </div>
      </Box>
    </div>
  );
}
