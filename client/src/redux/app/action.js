import axios from "axios";
import { loadData } from "../../utils/accessLocal";
import {
  GET_MUSIC_RECORDS_REQUEST,
  GET_MUSIC_RECORDS_SUCCESS,
  GET_MUSIC_RECORDS_FAILURE,
  ADD_MUSIC_RECORDS_REQUEST,
  ADD_MUSIC_RECORDS_SUCCESS,
  ADD_MUSIC_RECORDS_FAILURE,
  UPDATE_MUSIC_RECORDS_SUCCESS,
  UPDATE_MUSIC_RECORDS_FAILURE,
  UPDATE_MUSIC_RECORDS_REQUEST,
  DELETE_MUSIC_RECORDS_REQUEST,
  DELETE_MUSIC_RECORDS_SUCCESS,
  DELETE_MUSIC_RECORDS_FAILURE,
} from "./actionTypes";

const getMusicRequest = () => {
  return { type: GET_MUSIC_RECORDS_REQUEST };
};

const getMusicSuccess = (payload) => {
  return { type: GET_MUSIC_RECORDS_SUCCESS, payload };
};

const getMusicFailure = (payload) => {
  return { type: GET_MUSIC_RECORDS_FAILURE, payload };
};

const addMusicRequest = () => {
  return { type: ADD_MUSIC_RECORDS_REQUEST };
};

const addMusicSuccess = (payload) => {
  return { type: ADD_MUSIC_RECORDS_SUCCESS, payload };
};

const addMusicFailure = (payload) => {
  return { type: ADD_MUSIC_RECORDS_FAILURE, payload };
};

const updateMusicRequest = () => {
  return { type: UPDATE_MUSIC_RECORDS_REQUEST };
};

const updateMusicSuccess = (payload) => {
  return { type: UPDATE_MUSIC_RECORDS_SUCCESS, payload };
};

const updateMusicFailure = (payload) => {
  return { type: UPDATE_MUSIC_RECORDS_FAILURE, payload };
};

const deleteMusicRequest = () => {
  return { type: DELETE_MUSIC_RECORDS_REQUEST };
};

const deleteMusicSuccess = () => {
  return { type: DELETE_MUSIC_RECORDS_SUCCESS };
};

const deleteMusicFailure = (payload) => {
  return { type: DELETE_MUSIC_RECORDS_FAILURE, payload };
};

export const getMusicRecords = (params) => (dispatch) => {
  dispatch(getMusicRequest());
  return axios
    .get(`/albums`, params)
    .then((res) => {
      // console.log("res.data inside the action: ",res.data);
      dispatch(getMusicSuccess(res.data));
    })
    .catch((err) => dispatch(getMusicFailure(err)));
};

const token = loadData("token");
console.log(token);
const headers = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${token}`,
};
export const addMusicRecords = (payload) => (dispatch) => {
  dispatch(addMusicRequest());
  return axios({
    method: "post",
    url: `/albums/create`,
    data: payload,
    headers: headers,
  })
    .then((res) => {
      // console.log(res.data);
      dispatch(addMusicSuccess(res.data));
    })
    .catch((err) => dispatch(addMusicFailure(err)));
};

export const updateMusicRecords = (id, payload) => (dispatch) => {
  dispatch(updateMusicRequest);
  return axios({
    method: "patch",
    url: `/albums/${id}/edit`,
    data: payload,
    headers: headers,
  })
    .then((res) => dispatch(updateMusicSuccess))
    .catch((err) => dispatch(updateMusicFailure));
};

export const deleteMusicRecords = (id) => (dispatch) => {
  console.log("inside delete fuction");
  dispatch(deleteMusicRequest());
  return axios
    .delete(`/albums/${id}`, { headers })
    .then((res) => {
      console.log(res.data);
      dispatch(deleteMusicSuccess());
    })
    .catch((err) => dispatch(deleteMusicFailure(err)));
};
