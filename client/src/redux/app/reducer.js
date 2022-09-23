import {
  GET_MUSIC_RECORDS_REQUEST,
  GET_MUSIC_RECORDS_SUCCESS,
  GET_MUSIC_RECORDS_FAILURE,
} from "./actionTypes";
export const initState = {
  musicRecords: [],
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
        musicRecords: payload,
        isLoading: false,
        isError: false,
      };

    case GET_MUSIC_RECORDS_FAILURE:
      return { ...state, isLoading: false, isError: true };

    default:
      return state;
  }
};
