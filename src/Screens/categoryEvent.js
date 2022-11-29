import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Dimensions,
  RefreshControl,
} from "react-native";
import React, { useRef, useEffect, useState } from "react";
import tw from "twrnc";
import HomeScreenHeader from "../Components/homeScreenHeader";
import { Chip, Surface } from "@react-native-material/core";
import AntDesign from "react-native-vector-icons/AntDesign";
import Octicons from "react-native-vector-icons/Octicons";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import { MaterialIcons } from "@expo/vector-icons";
import EventListItem from "../Components/eventListItem";
import CategoryEventHeader from "../Components/categoryEventHeader";
import Toast from "react-native-fast-toast";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { URL } from "../Actions/types";
import LoadingListItem from "../Components/loadingListItem";

const CategoryEventScreen = ({ navigation, route }) => {
  const { isAuthenticated } = useSelector((state) => state.data);
  const { type } = route.params;
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [errors, setErrors] = useState(null);
  const toast = useRef(null);
  const viewEvents = async (type) => {
    setLoading(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": await AsyncStorage.getItem("token"),
      },
      timeout: 5000,
    };
    try {
      const res = await axios.get(`${URL}/api/event/type/${type}`, config);
      setEvents(res.data);
      setLoading(false);
    } catch (err) {
      console.log(JSON.stringify(err.request));
      if (err.response) {
        setErrors(err.response.data);
        setLoading(false);
      } else if (err.request) {
        let errs = {};
        errs.connection = true;
        setErrors(errs);
        console.log(errors);
        setLoading(false);
      } else {
        let errs = {};
        errs.unknown = true;
        setErrors(errs);
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    viewEvents(type);
  }, []);
  useEffect(() => {
    if (errors && Object.keys(errors).length !== 0) {
      toast.current.show("Connection problem. Please try again", {
        icon: <Icon name="alert-circle-outline" size={20} color="white" />,
        placement: "bottom",
        type: "danger",
        duration: 4000,
        style: { padding: 0 },
        textStyle: { padding: 0 },
      });
      console.log("Errors: ", errors);
    }
    if (events.length) {
      setErrors(null);
    }
  }, [events, errors]);
  return (
    <SafeAreaView className="w-full h-full bg-gray-100">
      <Toast ref={toast} swipeEnabled={true} />
      <CategoryEventHeader type={type} />
      <ScrollView
        className="w-full p-3 bg-transparent"
        scrollsToTop={true}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => {
              viewEvents;
            }}
          />
        }
      >
        {loading ? (
          <LoadingFunc />
        ) : (
          events.map((event, index) => {
            return <EventListItem event={event} key={index} />;
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const LoadingFunc = () => {
  let i = [1, 2, 3, 4, 5, 6];
  return (
    <>
      {i.map((i) => {
        return <LoadingListItem key={i} />;
      })}
    </>
  );
};
export default CategoryEventScreen;
