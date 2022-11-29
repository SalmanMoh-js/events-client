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
import EventListItem from "../Components/eventListItem";

const SearchScreen = ({ navigation }) => {
  const { isAuthenticated, events } = useSelector((state) => state.data);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.navigate("First");
      navigation.reset({
        index: 0,
        routes: [{ name: "First" }],
      });
    }
  }, [isAuthenticated]);
  useEffect(() => {
    setFilteredEvents(
      events.filter(
        (event) =>
          event.name.includes(searchQuery) ||
          event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery]);
  return (
    <SafeAreaView
      style={tw.style("h-full w-full bg-slate-100 flex items-center")}
    >
      <StatusBar animated={true} backgroundColor="#403a4aff" />
      <Surface
        style={tw`mx-auto bg-white w-full px-2 py-3 flex flex-row justify-between`}
      >
        <IconButton
          icon={(props) => <Icon name="arrow-left" {...props} size={26} />}
          onPress={() => navigation.goBack()}
        />
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
      </Surface>
      <Surface style={tw`mx-auto bg-transparent w-full h-full`}>
        <ScrollView style={tw`mx-auto my-1 bg-transparent w-full mb-16 px-3`}>
          {filteredEvents.map((event, index) => {
            return <EventListItem event={event} key={index} />;
          })}
        </ScrollView>
      </Surface>
    </SafeAreaView>
  );
};

export default SearchScreen;
