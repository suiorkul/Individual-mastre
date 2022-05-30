import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";
import { API2 } from "../Consts/Consts";

export const reviewContext = createContext();
export const useReviewContext = () => {
  return useContext(reviewContext);
};
const INIT_STATE = {
  reviews: [],
};
function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case "GET_REVIEWS":
      return {
        ...state,
        reviews: action.payload.data,
      };
    default:
      return state;
  }
}

const ReviewContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const getReview = async () => {
    try {
      let res = await axios.get(API2);
      dispatch({
        type: "GET_REVIEWS",
        payload: res,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const addReview = async (obj) => {
    try {
      await axios.post(API2, obj);
      getReview();
    } catch (err) {
      console.log(err);
    }
  };

  const delReview = async (id) => {
    try {
      await axios.delete(`${API2}/${id}`);
      getReview();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <reviewContext.Provider
      value={{
        reviews: state.reviews,
        getReview,
        addReview,
        delReview,
      }}
    >
      {children}
    </reviewContext.Provider>
  );
};

export default ReviewContext;
