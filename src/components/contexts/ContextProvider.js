import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";
import { API } from "../Consts/Consts";

export const context = createContext();
export const useBurgerContext = () => {
  return useContext(context);
};
const INIT_STATE = {
  burgers: [],
  objForEdit: null,
  pageTotalCount: 1,
};
function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case "GET_BURGERS":
      return {
        ...state,
        burgers: action.payload.data,
        pageTotalCount: Math.ceil(action.payload.headers["x-total-count"] / 4),
      };
    case "GET_OBJ_FOR_EDIT":
      return {
        ...state,
        objForEdit: action.payload.data,
      };
    default:
      return state;
  }
}

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const getBurger = async () => {
    try {
      let res = await axios.get(`${API}${window.location.search}`);
      dispatch({
        type: "GET_BURGERS",
        payload: res,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const addBurger = async (obj) => {
    try {
      await axios.post(API, obj);
      getBurger();
    } catch (err) {
      console.log(err);
    }
  };

  const delBurger = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      getBurger();
    } catch (err) {
      console.log(err);
    }
  };

  const idForEdit = async (id) => {
    try {
      let res = await axios.get(`${API}/${id}`);
      dispatch({
        type: "GET_OBJ_FOR_EDIT",
        payload: res,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const saveBurger = async (obj) => {
    try {
      await axios.patch(`${API}/${obj.id}`, obj);
      getBurger();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <context.Provider
      value={{
        burgers: state.burgers,
        objForEdit: state.objForEdit,
        pageTotalCount: state.pageTotalCount,
        getBurger,
        addBurger,
        delBurger,
        idForEdit,
        saveBurger,
      }}
    >
      {children}
    </context.Provider>
  );
};

export default ContextProvider;
