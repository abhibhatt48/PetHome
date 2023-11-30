import {
  GET_DONATIONS_FAIL,
  GET_DONATIONS_SUCCESS,
  GET_PETS_FAIL,
  GET_PETS_SUCCESS,
  SET_PETS_LOADING,
} from "./actionTypes";

const initialState = {
  loading: false,
  pets: [],
  error: false,
  message: "",
};

const petReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PETS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_PETS_SUCCESS:
      return {
        ...state,
        loading: false,
        pets: action.payload,
      };
    case GET_DONATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        donations: action.payload,
      };
    case GET_PETS_FAIL:
    case GET_DONATIONS_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.message,
      };

    default:
      return state;
  }
};

export default petReducer;
