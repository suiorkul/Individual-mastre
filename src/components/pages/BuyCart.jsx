import React from "react";
import BuyForm from "./BuyForm";
import "./BuyCart.css";

const BuyCart = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="credit">
        <BuyForm />
      </div>
    </div>
  );
};

export default BuyCart;
