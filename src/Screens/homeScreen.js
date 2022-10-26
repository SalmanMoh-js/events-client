import { View, Text, SafeAreaView, ScrollView, Dimensions } from "react-native";
import React, { useRef } from "react";
import tw from "twrnc";
import HomeScreenHeader from "../Components/homeScreenHeader";
import { Chip, Surface } from "@react-native-material/core";
import AntDesign from "react-native-vector-icons/AntDesign";
import Octicons from "react-native-vector-icons/Octicons";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import { MaterialIcons } from "@expo/vector-icons";
import Carousel from "react-native-snap-carousel";
import BannerSlider from "../Components/bannerSlider";
import EventListItem from "../Components/eventListItem";
import RBSheet from "react-native-raw-bottom-sheet";
import Filter from "../Components/filter";

export const windowWidth = Dimensions.get("window").width;
export const windowHeight = Dimensions.get("window").height;

const renderBanner = ({ item, index }) => {
  return <BannerSlider data={item} />;
};

const HomeScreen = () => {
  const refRBSheet = useRef();
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
  return (
    <SafeAreaView className="w-full h-full bg-gray-100">
      <HomeScreenHeader />
      <ScrollView className="w-full p-3 bg-transparent">
        <View
          style={tw.style(
            "mx-auto p-3 w-full flex justify-center items-center"
          )}
        >
          <Carousel
            data={events}
            renderItem={renderBanner}
            sliderWidth={windowWidth - 20}
            itemWidth={300}
            loop
            enableSnap
            useScrollView
            autoplay
            autoplayInterval={5000}
          />
        </View>
        <View className="w-full flex flex-row justify-between px-3 pt-3">
          <Text className="text-2xl text-gray-700 font-bold">
            Upcoming Events
          </Text>
          <Chip
            variant="filled"
            label="Filter"
            trailing={(props) => <Icon name="chevron-down" {...props} />}
            style={tw.style("bg-white")}
            labelStyle={tw.style("text-black")}
            onPress={() => refRBSheet.current.open()}
          />
        </View>
        <ScrollView className="w-full">
          {events.map((event, index) => {
            return <EventListItem event={event} key={index} />;
          })}
        </ScrollView>
      </ScrollView>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: "#6e6d6d23",
          },
          draggableIcon: {
            backgroundColor: "#948d8d",
          },
          container: {
            borderRadius: 30,
            elevation: 50,
          },
        }}
        height={350}
      >
        <Filter refRBSheet={refRBSheet.current} />
      </RBSheet>
    </SafeAreaView>
  );
};

export default HomeScreen;
