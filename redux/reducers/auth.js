import { LOGIN_USER } from "../actions/types";
import { AUTH_FAILDED, AUTH_LOADING } from "../actions/auth";

const intialState = {
  user: null,
  token: null,
  tokenExpiry: null,
  isLoggedIn: false,
  isLoading: false,
  isSuccess: false,
  errorMsg: "",
};

export const authReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case AUTH_LOADING:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isLoggedIn: false,
        errorMsg: "",
      };
    case AUTH_FAILDED:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        errorMsg: payload,
        isLoggedIn: false,
      };
    case LOGIN_USER:
      return {
        ...state,
        user: payload.data.user,
        token: payload.data.token,
        tokenExpiry: payload.data.tokenExpiry,
        isLoading: false,
        isSuccess: true,
        errorMsg: "",
        isLoggedIn: true,
      };
    default:
      return state;
  }
};
