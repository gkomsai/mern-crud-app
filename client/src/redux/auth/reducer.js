import { loadData, saveData } from "../../utils/accessLocal";
import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from "./actionTypes";

const initialState = {
  token: loadData("token") || false,
  isAuthLoading: false,
  isError: false,
};

export const AuthReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        isAuthLoading: true,
        isError: false,
      };
    case USER_LOGIN_SUCCESS:
      saveData("token", payload);
      // console.log(payload);
      return {
        ...state,
        isAuthLoading: false,
        token: payload,

        isError: false,
      };
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        isAuthLoading: false,
        token: null,
        isError: true,
      };
    default:
      return state;
  }
};
