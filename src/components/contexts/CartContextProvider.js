import React, { createContext, useContext, useReducer } from "react";
import { CART } from "../Consts/Consts";
import { calcSubPrice, calcTotalPrice } from "../Consts/function";
import { useAuth } from "../contexts/AuthContextProvider";
import { useNavigate } from "react-router-dom";

const cartContext = createContext();

export const useCart = () => {
  return useContext(cartContext);
};

const INIT_STATE = {
  cart: JSON.parse(localStorage.getItem("cart")),
  cartLength: 0,
};

function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case CART.GET_CART_LENGTH:
      return {
        ...state,
        cartLength: action.payload,
      };
    case CART.GET_CART:
      return {
        ...state,
        cart: action.payload,
      };
    default:
      return state;
  }
}

const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const { currentUser, logOutUser } = useAuth();
  const navigate = useNavigate();
  function createCartFromLS() {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        products: [],
        totalPrice: 0,
      };
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    return cart;
  }

  // add and delete
  const addDelToCart = (prod) => {
    if (!currentUser.isLogged) {
      navigate("/login");
    } else {
      let cart = createCartFromLS();
      let newProd = {
        item: prod,
        count: 1,
        subPrice: prod.price,
      };
      let checkProdInCart = cart.products.some((obj) => {
        return obj.item.id === prod.id;
      });
      if (checkProdInCart) {
        cart.products = cart.products.filter((obj) => {
          return obj.item.id !== prod.id;
        });
      } else {
        cart.products.push(newProd);
      }
      cart.totalPrice = calcTotalPrice(cart.products);
      localStorage.setItem("cart", JSON.stringify(cart));
      getCartLength();
      dispatch({
        type: CART.GET_CART,
        payload: cart,
      });
    }
  };

  const changeProductCount = (newCount, id) => {
    if (newCount >= 0) {
      let cart = createCartFromLS();
      cart.products = cart.products.map((elem) => {
        if (elem.item.id === id) {
          elem.count = newCount;
          elem.subPrice = calcSubPrice(elem);
        }
        return elem;
      });
      cart.totalPrice = calcTotalPrice(cart.products);
      localStorage.setItem("cart", JSON.stringify(cart));
      getCart();
    }
  };

  const getCartLength = () => {
    let cart = createCartFromLS();
    dispatch({
      type: CART.GET_CART_LENGTH,
      payload: cart.products.length,
    });
  };

  const isProdInCart = (id) => {
    let cart = createCartFromLS();
    let exist = cart.products.some((obj) => {
      return obj.item.id === id;
    });
    return exist;
  };

  const getCart = () => {
    let cart = createCartFromLS();
    dispatch({
      type: CART.GET_CART,
      payload: cart,
    });
  };

  const deleteProdInCart = (id) => {
    let cart = createCartFromLS();
    cart.products = cart.products.filter((elem) => {
      return elem.item.id !== id;
    });
    cart.totalPrice = calcTotalPrice(cart.products);
    localStorage.setItem("cart", JSON.stringify(cart));
    getCart();
    getCartLength();
  };

  return (
    <cartContext.Provider
      value={{
        cartLength: state.cartLength,
        cart: state.cart,
        addDelToCart,
        getCartLength,
        isProdInCart,
        getCart,
        changeProductCount,
        deleteProdInCart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartContextProvider;
