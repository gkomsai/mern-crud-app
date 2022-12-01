import {
  GET_MUSIC_RECORDS_REQUEST,
  GET_MUSIC_RECORDS_SUCCESS,
  GET_MUSIC_RECORDS_FAILURE,
  ADD_MUSIC_RECORDS_SUCCESS,
  UPDATE_MUSIC_RECORDS_SUCCESS,
  DELETE_MUSIC_RECORDS_SUCCESS,
} from "./actionTypes";
export const initState = {
  musicRecords: [],
  totalPages: "",
  isLoading: false,
  isError: false,
};

export const AppReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case GET_MUSIC_RECORDS_REQUEST:
      return { ...state, isLoading: true, isError: false };

    case GET_MUSIC_RECORDS_SUCCESS:
      return {
        ...state,
        musicRecords: payload.result,
        totalPages: payload.totalPages,
        isLoading: false,
        isError: false,
      };

    case GET_MUSIC_RECORDS_FAILURE:
      return { ...state, isLoading: false, isError: true };
    case ADD_MUSIC_RECORDS_SUCCESS:
      return { ...state, musicRecords: [], isLoading: false, isError: false };
    case UPDATE_MUSIC_RECORDS_SUCCESS:
      return { ...state, musicRecords: [], isLoading: false, isError: false };
    case DELETE_MUSIC_RECORDS_SUCCESS:
      return { ...state, musicRecords: [], isLoading: false, isError: false };

    default:
      return state;
  }
};
