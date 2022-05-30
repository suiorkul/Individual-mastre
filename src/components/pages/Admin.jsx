import React, { useState } from "react";
import AdminBurgers from "../admin/AdminBurgers";
import AddBurger from "../admin/AddBurger";
import "./Admin.css";

const Admin = () => {
  const [addModal, setAddModal] = useState(false);
  function toggle() {
    addModal ? setAddModal(false) : setAddModal(true);
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ width: "320px" }}>
        <img
          className="add"
          onClick={() => {
            toggle();
          }}
          width="70px"
          src="https://www.nicepng.com/png/full/251-2519428_0-add-icon-white-png.png"
          alt=""
        />
        {addModal && <AddBurger />}
      </div>
      <div className="card-list">
        <AdminBurgers />
      </div>
    </div>
  );
};

export default Admin;
