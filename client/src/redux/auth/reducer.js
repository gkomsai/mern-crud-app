import { loadData, saveData } from "../../utils/accessLocal";
import {
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE,
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
} from "./actionTypes";

const initialState = {
  token: loadData("token") || false,
  user: loadData("user") || {},
  isAuthLoading: false,
  isError: false,
};

export const AuthReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_SIGNUP_REQUEST:
      return {
        ...state,
        isAuthLoading: true,
        isError: false,
      };
    case USER_SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthLoading: false,
        isError: false,
      };
    case USER_SIGNUP_FAILURE:
      return {
        ...state,
        isAuthLoading: false,
        token: null,
        isError: true,
      };
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        isAuthLoading: true,
        isError: false,
      };
    case USER_LOGIN_SUCCESS:
      saveData("token", payload.token);
      saveData("user", payload.user);
      return {
        ...state,
        isAuthLoading: false,
        token: payload.token,
        user: payload.user,
        isError: false,
      };
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        isAuthLoading: false,
        token: null,
        isError: true,
      };
    case USER_LOGOUT_SUCCESS:
      localStorage.clear();
      return {
        ...state,
        isAuthLoading: false,
        token: null,
        user: {},
        isError: true,
      };
    default:
      return state;
  }
};
