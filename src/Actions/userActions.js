import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosError } from "axios";
import { addDataLoading, loading } from "./auth";
import {
  ADD_DATA_LOADING,
  DATA_UPDATED,
  GET_ERRORS,
  GET_EVENTS,
  GET_TICKETS,
  URL,
} from "./types";

// Update profile
export const updateProfile = (updatedData) => async (dispatch) => {
  dispatch(loading());
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": await AsyncStorage.getItem("token"),
    },
  };
  const body = JSON.stringify(updatedData);
  try {
    const res = await axios.post(
      `${URL}/api/user/${updatedData.id}`,
      body,
      config
    );
    dispatch({
      type: DATA_UPDATED,
      payload: "profile update",
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

// Update profile
export const updatePassword = (updatedPassword) => async (dispatch) => {
  dispatch(loading());
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": await AsyncStorage.getItem("token"),
    },
  };
  const body = JSON.stringify(updatedPassword);
  try {
    const res = await axios.post(
      `${URL}/api/user/change-password/${updatedPassword.id}`,
      body,
      config
    );
    dispatch({
      type: DATA_UPDATED,
      payload: "password update",
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

// Buy Ticket
export const buyTicket = (ticketData) => async (dispatch) => {
  dispatch(addDataLoading());
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": await AsyncStorage.getItem("token"),
    },
  };
  const body = JSON.stringify(ticketData);
  try {
    const res = await axios.post(`${URL}/api/ticket/buy`, body, config);
    dispatch({
      type: DATA_UPDATED,
      payload: "ticket purchase",
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

// Get events
export const getEvents = () => async (dispatch) => {
  dispatch(loading());
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": await AsyncStorage.getItem("token"),
    },
  };
  try {
    const res = await axios.get(`${URL}/api/event`, config);
    dispatch({
      type: GET_EVENTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.name === "AxiosError" ? err.name : err.response.data,
    });
  }
};

// Get tickets
export const getTickets = () => async (dispatch) => {
  dispatch(loading());
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": await AsyncStorage.getItem("token"),
    },
  };
  try {
    const res = await axios.get(`${URL}/api/ticket`, config);
    dispatch({
      type: GET_TICKETS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

// Confirm ticket
export const confirmTicket = (id) => async (dispatch) => {
  dispatch(loading());
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": await AsyncStorage.getItem("token"),
    },
  };
  const body = JSON.stringify(id);
  try {
    const res = await axios.post(
      `${URL}/api/admin/confirm-ticket`,
      body,
      config
    );
  } catch (err) {}
};

// View event details
export const viewEvent = (id) => async (dispatch) => {
  dispatch(loading());
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": await AsyncStorage.getItem("token"),
    },
  };
  const id = JSON.stringify(id);
  try {
    const res = await axios.post(`${URL}/api/event/${id}`, config);
  } catch (err) {}
};

// Approve purchase
export const approvePurchase = (id) => async (dispatch) => {
  dispatch(loading());
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": AsyncStorage.getItem("token"),
    },
  };
  const body = JSON.stringify(id);
  try {
    const res = await axios.post(
      `${URL}/api/admin/approve-purchase`,
      body,
      config
    );
  } catch (err) {}
};

// Get user's tickets
export const getUserTickets = (id) => async (dispatch) => {
  dispatch(loading());
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": await AsyncStorage.getItem("token"),
    },
  };
  try {
    const res = await axios.get(`${URL}/api/ticket/user/${id}`, config);
    dispatch({
      type: GET_TICKETS,
      payload: res.data,
    });
    console.log(res.data);
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};
