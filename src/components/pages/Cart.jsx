import { Button, Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useCart } from "../contexts/CartContextProvider";

import "./Cart.css";

const Cart = () => {
  const { cart, getCart, changeProductCount, deleteProdInCart } = useCart();
  const navigate = useNavigate();
  useEffect(() => {
    getCart();
  }, []);

  return (
    <div>
      <Container maxWidth="lg">
        {cart?.products.length > 0 ? (
          <>
            <br />
            <Typography variant="h4" sx={{ color: "yellow" }}>
              {cart.totalPrice}сом
            </Typography>
            <br />
            <Link to="/buy" style={{ textDecoration: "none" }}>
              <Button variant="contained" className="buy">
                Купить за {cart.totalPrice} сом
              </Button>
            </Link>
            <TableContainer component={Paper}>
              <Table
                sx={{
                  minWidth: 650,
                  backgroundColor: "rgba(54, 54, 54, 1)",
                }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Название</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Картинка</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Цена</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="right">
                      Сумма
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="right">
                      Кол-во
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="right">
                      Удалить
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart.products.map((elem) => (
                    <TableRow
                      key={elem.item.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        component="th"
                        sx={{ color: "white" }}
                        scope="row"
                      >
                        {elem.item.name}
                      </TableCell>
                      <TableCell>
                        <img
                          width="40px"
                          src={elem.item.image}
                          alt={elem.item.name}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        sx={{ color: "white" }}
                        scope="row"
                      >
                        {elem.item.price}
                      </TableCell>
                      <TableCell sx={{ color: "white" }} align="right">
                        {elem.subPrice}
                      </TableCell>
                      <TableCell align="right" sx={{ color: "white" }}>
                        <IconButton
                          sx={{ color: "white" }}
                          onClick={() =>
                            changeProductCount(elem.count + 1, elem.item.id)
                          }
                        >
                          <AddIcon />
                        </IconButton>
                        {elem.count <= 0
                          ? deleteProdInCart(elem.item.id)
                          : elem.count}
                        <IconButton
                          sx={{ color: "white" }}
                          onClick={() =>
                            changeProductCount(elem.count - 1, elem.item.id)
                          }
                        >
                          <RemoveIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          sx={{ color: "white" }}
                          onClick={() => deleteProdInCart(elem.item.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <div style={{ textAlign: "center" }}>
            <img
              width="300px"
              src="https://cdn3.iconfinder.com/data/icons/shopping-and-ecommerce-29/90/empty_cart-512.png"
              alt=""
            />{" "}
            <br />
            <Button
              style={{
                padding: "15px 55px",
                border: "white 1px solid",
                borderRadius: "0",
                backgroundColor: "transparent",
                color: "white",
                marginTop: "30px",
              }}
              variant="contained"
              component={Link}
              to="/menu"
            >
              Меню
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Cart;
