import axios from "axios";
import { loadData } from "../../utils/accessLocal";
import { notify } from "../../utils/extraFunction";
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

export const getMusicRecords = (params, token, toast) => (dispatch) => {
  dispatch(getMusicRequest());
  return axios
    .get(`/albums`, params)
    .then((res) => {
      dispatch(getMusicSuccess(res.data));
      // notify(toast, "Album Fetched successfully", "success");
    })
    .catch((err) => {
      // console.log(err.response.data.message);
      dispatch(getMusicFailure(err));
      notify(toast, err.response.data.message, "error");
    });
};

export const addMusicRecords = (payload, token, toast) => (dispatch) => {
  dispatch(addMusicRequest());
  return axios({
    method: "post",
    url: `/albums/create`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })
    .then((res) => {
      // console.log(res.data);
      dispatch(addMusicSuccess(res.data));
      notify(toast, "Album added successfully", "success");
    })
    .catch((err) => {
      notify(toast, err.response.data.message, "error");
      dispatch(addMusicFailure(err));
    });
};

export const updateMusicRecords = (id, payload, token, toast) => (dispatch) => {
  dispatch(updateMusicRequest);
  return axios({
    method: "patch",
    url: `/albums/${id}/edit`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })
    .then((res) => {
      dispatch(updateMusicSuccess);
      notify(toast, res.data.message, "success");
    })
    .catch((err) => {
      dispatch(updateMusicFailure);
      notify(toast, err.response.data.message, "error");
    });
};

export const deleteMusicRecords = (id, token, toast) => (dispatch) => {
  dispatch(deleteMusicRequest());
  return axios
    .delete(`/albums/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      dispatch(deleteMusicSuccess());
      notify(toast, res.data.message, "success");
    })
    .catch((err) => {
      notify(toast, err.response.data.message, "error");
      dispatch(deleteMusicFailure(err));
    });
};
