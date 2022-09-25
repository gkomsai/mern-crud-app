import {
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
} from "./actionTypes";

export const signupRequest = () => {
  return {
    type: USER_SIGNUP_REQUEST,
  };
};

export const signupSuccess = (payload) => {
  return {
    type: USER_SIGNUP_SUCCESS,
    payload,
  };
};

export const signupFailure = () => {
  return {
    type: USER_SIGNUP_FAILURE,
  };
};

export const loginRequest = () => {
  return {
    type: USER_LOGIN_REQUEST,
  };
};

export const loginSuccess = (payload) => {
  return {
    type: USER_LOGIN_SUCCESS,
    payload,
  };
};

export const loginFailure = () => {
  return {
    type: USER_LOGIN_FAILURE,
  };
};
