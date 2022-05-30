import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContextProvider";
import titleimg from "../images/title-img.png";
import "./Check.css";
const INITS = {
  time: "",
  user: "",
};

const Check = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [infos, setInfos] = useState(INITS);

  useEffect(() => {
    let obj = {
      time: Date().toLocaleString(),
      user: currentUser.user,
    };
    setInfos(obj);
  }, []);

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}
    >
      <div className="checkCont">
        <img className="checkimg" src={titleimg} alt="" />
        <h3 className="checksh3">Burger</h3>
        <p className="checks"># Check: 1221311</p>
        <p className="checks">{infos.time}</p>
        <p className="checks">client... {infos.user}</p>
        <p className="checks">Quantity: ................... 2 </p>
        <p className="checks">Total Price............300 com</p>
        <p className="checks">Paid ...................300 com</p>
        <Button
          onClick={() => {
            navigate("/menu");
          }}
          className="buy2btn"
        >
          Save check
        </Button>
      </div>
    </div>
  );
};

export default Check;
