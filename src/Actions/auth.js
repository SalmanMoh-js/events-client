import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import {
  ADD_DATA_LOADING,
  AUTH_ERROR,
  GET_ERRORS,
  LOADING,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  OTP_LOGIN,
  RESET_DATA,
  RESET_ERRORS,
  RESET_UPDATE,
  URL,
  USER_LOADED,
} from "./types";

// Login
export const login = (email, password) => async (dispatch) => {
  dispatch(loading());
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post(`${URL}/api/auth`, body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.token,
    });
    try {
      await AsyncStorage.setItem("token", res.data.token);
    } catch (e) {
      console.log(e);
    }
    dispatch(loadUser());
  } catch (err) {
    console.log("Error: ", err.message);
    dispatch({
      type: LOGIN_FAIL,
    });
    if (err.response) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    } else if (err.request) {
      let errs = {};
      errs.connection = true;
      dispatch({
        type: GET_ERRORS,
        payload: errs,
      });
    } else {
      let errs = {};
      errs.unknown = true;
      dispatch({
        type: GET_ERRORS,
        payload: errs,
      });
    }
  }
};

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem("token");
    console.log("Token: ", token);
    setAuthToken(token);
  } catch (err) {
    console.log(err);
  }
  try {
    const res = await axios.get(`${URL}/api/auth`);
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: AUTH_ERROR,
    });
    if (err.response) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    } else if (err.request) {
      let errs = {};
      errs.connection = true;
      dispatch({
        type: GET_ERRORS,
        payload: errs,
      });
    } else {
      let errs = {};
      errs.unknown = true;
      dispatch({
        type: GET_ERRORS,
        payload: errs,
      });
    }
  }
};

export const emptyErrors = () => (dispatch) => {
  dispatch({
    type: GET_ERRORS,
    payload: {},
  });
};

export const loading = () => (dispatch) => {
  dispatch({ type: LOADING });
};

export const addDataLoading = () => (dispatch) => {
  dispatch({ type: ADD_DATA_LOADING });
};
// Logout / Clear Profile
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  AsyncStorage.removeItem("token");
};

export const resetUpdate = () => (dispatch) => {
  dispatch({
    type: RESET_UPDATE,
  });
};

export const resetData = () => (dispatch) => {
  AsyncStorage.removeItem("token");
  dispatch({
    type: RESET_DATA,
  });
};
