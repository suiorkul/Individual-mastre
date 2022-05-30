import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";
import { notifyError } from "../Toastify/Toastify";
import { API5 } from "../Consts/Consts";
import { useAuth } from "./AuthContextProvider";

export const likeContext = createContext();

export const useLikeContext = () => {
  return useContext(likeContext);
};

const INIT_STATE = {
  likes: [],
};

function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case "GET_LIKE":
      return {
        ...state,
        likes: action.payload.data,
      };
    default:
      return state;
  }
}

const LikeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const { currentUser, logOutUser } = useAuth();

  const getLike = async () => {
    try {
      let res = await axios.get(API5);
      dispatch({
        type: "GET_LIKE",
        payload: res,
      });
    } catch (err) {
      notifyError(err);
    }
  };

  const addLike = async (obj) => {
    try {
      await axios.post(API5, obj);
      getLike();
    } catch (err) {}
  };

  const delLike = async (id) => {
    try {
      await axios.delete(`${API5}/${id}`);
      getLike();
    } catch (err) {}
  };

  const isProdLiked = (id) => {
    let exist = state.likes.some((obj) => {
      return obj.itemId === id;
    });
    return exist;
  };

  return (
    <likeContext.Provider
      value={{
        getLike,
        addLike,
        delLike,
        isProdLiked,
        likes: state.likes.filter((item) => item.user === currentUser.user),
        allLikes: state.likes,
      }}
    >
      {children}
    </likeContext.Provider>
  );
};

export default LikeContextProvider;
