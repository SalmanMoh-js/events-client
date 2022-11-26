import { View, Text, SafeAreaView, ScrollView, Dimensions } from "react-native";
import React, { useRef, useEffect } from "react";
import tw from "twrnc";
import { Chip, Surface } from "@react-native-material/core";
import AntDesign from "react-native-vector-icons/AntDesign";
import Octicons from "react-native-vector-icons/Octicons";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import MyTicketsHeader from "../Components/myTicketHeader";
import TicketListItem from "../Components/ticketListItem";
import { useDispatch, useSelector } from "react-redux";
import { getUserTickets } from "../Actions/userActions";

const MyTicketsScreen = ({ navigation }) => {
  const errors = useSelector((state) => state.errors);
  const { isAuthenticated, user, loading, tickets } = useSelector(
    (state) => state.data
  );
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
    dispatch(getUserTickets(user.id));
  }, []);
  return (
    <SafeAreaView className="w-full h-full bg-gray-100">
      <MyTicketsHeader />
      <ScrollView style={tw`mx-auto my-1 bg-transparent w-full mb-16 px-3`}>
        {tickets.map((ticket) => {
          return <TicketListItem ticket={ticket} key={ticket.id} />;
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyTicketsScreen;
