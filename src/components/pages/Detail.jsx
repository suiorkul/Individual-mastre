import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBurgerContext } from "../contexts/ContextProvider";
import CircularProgress from "@mui/material/CircularProgress";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Button } from "@mui/material";
import ListCom from "../comments/ListCom";
import AddCom from "../comments/AddCom";
import { useCart } from "../contexts/CartContextProvider";
import "./Detail.css";

const Detail = () => {
  const { prodId } = useParams();
  const { idForEdit, objForEdit, saveBurger } = useBurgerContext();
  const [viewed, setViewed] = useState(objForEdit);
  const { addDelToCart, isProdInCart } = useCart();
  const [inCart, setInCart] = React.useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    idForEdit(prodId);
  }, []);
  useEffect(() => {
    if (objForEdit) {
      setInCart(isProdInCart(objForEdit.id));
    }
  }, []);
  useEffect(() => {
    if (viewed) {
      viewed.count++;
    }
  }, []);
  useEffect(() => {
    if (viewed) {
      saveBurger(viewed);
    }
  }, []);
  return (
    <div>
      <Button
        onClick={() => navigate(-1)}
        style={{
          backgroundColor: "black",
          color: "white",
          marginTop: "10px",
          width: "300px",
        }}
      >
        Назад
      </Button>
      <div
        style={{
          marginTop: "20px",
          padding: "0 10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {objForEdit ? (
          <>
            <img
              width="320px"
              style={inCart ? { opacity: "0.2" } : { opacity: "1" }}
              src={objForEdit.image}
              onClick={() => {
                addDelToCart(objForEdit);
                setInCart(isProdInCart(objForEdit.id));
              }}
              alt=""
              className={!inCart ? "detailimg" : "ma"}
            />
            <h2
              style={{ color: "white", margin: "0" }}
            >{`${objForEdit.price}сом`}</h2>
            <div style={{ display: "flex" }}>
              <RemoveRedEyeIcon sx={{ color: "white" }} />
              <p style={{ color: "white", margin: "0", padding: "0" }}>
                {objForEdit.count}
              </p>
            </div>
            <h3 style={{ color: "white", margin: "5px" }}>{objForEdit.name}</h3>
            <div className="descBox">
              <p style={{ color: "white", margin: "0 0 5px 0" }}>
                {objForEdit.description}
              </p>
            </div>
          </>
        ) : (
          <CircularProgress />
        )}
      </div>
      <ListCom />
      <AddCom />
    </div>
  );
};

export default Detail;
