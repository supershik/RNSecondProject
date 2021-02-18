import { CHANGE_THEME, CHANGE_LANGUAGE } from "../actions/types";
import { CONFIG_FAILED, CONFIG_LOADING } from "../actions/config";

const intialState = {
  theme: "default",
  language: "en",
  isLoading: false,
  isSuccess: false,
  errorMsg: "",
};

export const configReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case CONFIG_LOADING:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isLoggedIn: false,
        errorMsg: "",
      };
    case CONFIG_FAILED:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        errorMsg: payload,
      };
    case CHANGE_LANGUAGE:
      return {
        ...state,
        language: payload,
        isLoading: false,
        isSuccess: false,
        errorMsg: payload,
      };
    case CHANGE_THEME:
      return {
        ...state,
        theme: payload,
        isLoading: false,
        isSuccess: true,
        errorMsg: "",
      };
    default:
      return state;
  }
};
