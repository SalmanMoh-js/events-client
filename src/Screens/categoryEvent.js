import { View, Text, SafeAreaView, ScrollView, Dimensions } from "react-native";
import React, { useRef, useEffect } from "react";
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

const CategoryEventScreen = ({ navigation, route }) => {
  const scrollView = useRef(null);
  const { type } = route.params;
  const events = [
    {
      id: 1,
      name: "Event Name",
      venue: "Venue",
      price: 100,
      address1: "Address 1",
      address2: "Address 2",
      date: "Date",
      time: "Time",
      type: "Sport",
      banner:
        "https://img.freepik.com/free-psd/music-banner-design-template_23-2149081198.jpg?w=2000",
      noOfTickets: 500,
      maxPerPerson: 5,
      desc: "Description",
    },
    {
      id: 2,
      name: "Event Name",
      venue: "Venue",
      price: 100,
      address1: "Address 1",
      address2: "Address 2",
      date: "Date",
      time: "Time",
      type: "Religious",
      banner:
        "https://img.freepik.com/free-psd/music-banner-design-template_23-2149081198.jpg?w=2000",
      noOfTickets: 500,
      maxPerPerson: 5,
      desc: "Description",
    },
    {
      id: 3,
      name: "Event Name",
      venue: "Venue",
      price: 100,
      address1: "Address 1",
      address2: "Address 2",
      date: "Date",
      time: "Time",
      type: "Cinema",
      banner:
        "https://img.freepik.com/free-psd/music-banner-design-template_23-2149081198.jpg?w=2000",
      noOfTickets: 500,
      maxPerPerson: 5,
      desc: "Description",
    },
    {
      id: 4,
      name: "Event Name",
      venue: "Venue",
      price: 100,
      address1: "Address 1",
      address2: "Address 2",
      date: "Date",
      time: "Time",
      type: "Concert",
      banner:
        "https://img.freepik.com/free-psd/music-banner-design-template_23-2149081198.jpg?w=2000",
      noOfTickets: 500,
      maxPerPerson: 5,
      desc: "Description",
    },
  ];
  useEffect(() => {
    const scrollToTop = navigation.addListener("tabPress", (e) => {
      scrollView.current.scrollTo({ x: 5, y: 5, animated: true });
    });
  }, []);
  return (
    <SafeAreaView className="w-full h-full bg-gray-100">
      <CategoryEventHeader type={type} />
      <ScrollView
        className="w-full p-3 bg-transparent"
        scrollsToTop={true}
        ref={scrollView}
      >
        <ScrollView className="w-full">
          {events.map((event, index) => {
            return <EventListItem event={event} key={index} />;
          })}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CategoryEventScreen;
