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

const MyTicketsScreen = ({ navigation }) => {
  const tickets = [
    {
      id: 1,
      ticketId: "000113454xsd",
      name: "Holder Name",
      buyer: "Buyer Name",
      confirmed: false,
      paid: true,
      purchaseDate: "DoP",
      eventName: "Event Name",
      eventDate: "DoE",
      price: 500,
      expired: true,
      type: "Standard",
    },
    {
      id: 2,
      ticketId: "000113454xsd",
      name: "Holder Name",
      buyer: "Buyer Name",
      confirmed: true,
      paid: true,
      purchaseDate: "DoP",
      eventName: "Event Name",
      eventDate: "DoE",
      price: 500,
      expired: false,
      type: "Standard",
    },
    {
      id: 3,
      ticketId: "000114545xsd",
      name: "Holder Name",
      buyer: "Buyer Name",
      confirmed: false,
      paid: true,
      purchaseDate: "DoP",
      eventName: "Event Name",
      eventDate: "DoE",
      price: 500,
      expired: false,
      type: "Standard",
    },
    {
      id: 4,
      ticketId: "00048754xsd",
      name: "Holder Name",
      buyer: "Buyer Name",
      confirmed: false,
      paid: false,
      purchaseDate: "DoP",
      eventName: "Event Name",
      eventDate: "DoE",
      price: 500,
      expired: false,
      type: "Vip",
    },
  ];
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
