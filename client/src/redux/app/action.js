import axios from "axios";
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

const AddMusicRequest = () => {
  return { type: ADD_MUSIC_RECORDS_REQUEST };
};

const AddMusicSuccess = (payload) => {
  return { type: ADD_MUSIC_RECORDS_SUCCESS, payload };
};

const AddMusicFailure = (payload) => {
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
      // console.log(res.data);
      dispatch(getMusicSuccess(res.data));
    })
    .catch((err) => dispatch(getMusicFailure(err)));
};

export const addMusicRecords = (payload) => (dispatch) => {
  dispatch(AddMusicRequest());
  return axios
    .Post(`/albums/create`, payload)
    .then((res) => {
      // console.log(res.data);
      dispatch(AddMusicSuccess(res.data));
    })
    .catch((err) => dispatch(AddMusicFailure(err)));
};

export const updateMusicRecords = (id, payload) => (dispatch) => {
  dispatch(updateMusicRequest);
  return axios
    .patch(`/albums/${id}`, payload)
    .then((res) => dispatch(updateMusicSuccess))
    .catch((err) => dispatch(updateMusicFailure));
};

export const deleteMusicRecords = (id) => (dispatch) => {
  dispatch(deleteMusicRequest());
  return axios
    .delete(`/albums/${id}`)
    .then((res) => {
      // console.log(res.data);
      dispatch(deleteMusicSuccess());
    })
    .catch((err) => dispatch(deleteMusicFailure(err)));
};
