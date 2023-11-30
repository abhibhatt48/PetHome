import {
  SET_USER_LOADING,
  SET_USER_SUCCESS,
  SET_USER_FAIL,
  REMOVE_USER_SUCCESS,
} from "./actionTypes";

const initialState = {
  loading: false,
  user: null,
  error: false,
  message: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: {
          email: action.payload.email,
        },
      };
    case SET_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.message,
      };
    case REMOVE_USER_SUCCESS:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default authReducer;
