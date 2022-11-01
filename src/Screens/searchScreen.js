import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  SafeAreaView,
  Alert,
  BackHandler,
  ImageBackground,
  View,
  Text,
  StatusBar,
  Platform,
  StyleSheet,
} from "react-native";
import tw from "twrnc";
import {
  Surface,
  Button,
  Badge,
  Pressable,
  IconButton,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { FAB, Searchbar } from "react-native-paper";
import { ScrollView } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import Filter from "../Components/filter";
import EventListItem from "../Components/eventListItem";

const SearchScreen = ({ navigation }) => {
  const refRBSheet = useRef();
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [scrolling, setScrolling] = useState("");
  const dispatch = useDispatch();
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
  // useEffect(() => {
  //   if (!user) {
  //     navigation.navigate("Main");
  //     navigation.reset({
  //       index: 0,
  //       routes: [{ name: "Main" }],
  //     });
  //   }
  // }, [user])
  return (
    <SafeAreaView
      style={tw.style("h-full w-full bg-slate-100 flex items-center")}
    >
      <StatusBar animated={true} backgroundColor="#403a4aff" />
      <Surface
        style={tw`mx-auto bg-white w-full px-2 py-3 flex flex-row justify-between`}
      >
        <Searchbar
          style={tw.style("shadow-none border border-gray-300", {
            width: "87%",
          })}
          theme={{
            roundness: 25,
          }}
          placeholder="Search"
          onChangeText={(e) => setSearchQuery(e)}
          value={searchQuery}
          autoFocus
        />
        <IconButton
          icon={(props) => <Icon name="tune-variant" {...props} size={26} />}
          onPress={() => refRBSheet.current.open()}
        />
      </Surface>
      <Surface style={tw`mx-auto bg-transparent w-full h-full`}>
        <ScrollView style={tw`mx-auto my-1 bg-transparent w-full mb-16 px-3`}>
          {events.map((event, index) => {
            return <EventListItem event={event} key={index} />;
          })}
        </ScrollView>
      </Surface>
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

const LoadingFunc = () => {
  let i = [1, 2, 3, 4, 5, 6];
  return (
    <>
      {i.map((i) => {
        return <LoadingTicketListItem key={i} />;
      })}
    </>
  );
};
export default SearchScreen;
