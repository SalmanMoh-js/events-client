import { View, Text, SafeAreaView, ScrollView, Dimensions } from "react-native";
import React, { useRef } from "react";
import tw from "twrnc";
import {
  Avatar,
  Badge,
  Button,
  Chip,
  IconButton,
  Surface,
} from "@react-native-material/core";
import AntDesign from "react-native-vector-icons/AntDesign";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import { List } from "react-native-paper";
import PurchaseTicketHeader from "../Components/purchaseTicketHeader";
import { useState } from "react";
import { buyTicket, getUserTickets } from "../Actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { emptyErrors, resetUpdate } from "../Actions/auth";
import Toast from "react-native-fast-toast";
import { useEffect } from "react";

const PurchaseTicketScreen = ({ navigation, route }) => {
  const errors = useSelector((state) => state.errors);
  const { isAuthenticated, user, addDataLoading, dataUpdated } = useSelector(
    (state) => state.data
  );
  const { event } = route.params;
  const dispatch = useDispatch();
  const toast = useRef(null);
  const [newTicket, setNewTicket] = useState({
    amount: 1,
    name: "",
    buyer: "",
    price: event.price,
    eventName: event.name,
    eventId: event.id,
    eventDate: event.date,
    purchaseDate: new Date(),
  });
  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }
  function formatDate(date) {
    return [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join("-");
  }
  function onBuyTicket() {
    const newPurchase = {
      holderName: user.name,
      buyername: user.name,
      userId: user.id,
      eventName: event.name,
      eventId: event.id,
      price: event.price,
      noOfTickets: newTicket.amount,
      venue: event.venue,
      date: event.date,
      dateOfPurchase: formatDate(new Date()),
      paid: false,
      confirmed: false,
      createdAt: new Date().getTime(),
    };
    dispatch(buyTicket(newPurchase));
  }
  useEffect(() => {
    if (Object.keys(errors).length !== 0) {
      if (!errors.password && !errors.user) {
        toast.current.show("Connection problem. Please try again", {
          icon: <Icon name="alert-circle-outline" size={20} color="white" />,
          placement: "bottom",
          type: "danger",
          duration: 4000,
          style: { padding: 0 },
          textStyle: { padding: 0 },
        });
      }
      setTimeout(() => {
        dispatch(emptyErrors());
      }, 5000);
    }
  }, [user, errors]);
  useEffect(() => {
    console.log(dataUpdated);
    if (dataUpdated === "ticket purchase") {
      toast.current.show("Successfully purchased", {
        icon: <Icon name="check" size={20} color="white" />,
        placement: "bottom",
        type: "success",
        duration: 4000,
        style: { padding: 0 },
        textStyle: { padding: 0 },
      });
      dispatch(getUserTickets(user.id));
      dispatch(resetUpdate());
    }
  }, [dataUpdated]);
  useEffect(() => {
    if (!isAuthenticated) {
      navigation.navigate("First");
      navigation.reset({
        index: 0,
        routes: [{ name: "First" }],
      });
    }
  }, [isAuthenticated]);
  return (
    <SafeAreaView className="w-full h-full bg-white flex items-center">
      <PurchaseTicketHeader />
      <Toast ref={toast} swipeEnabled={true} />
      <View className="w-full bg-transparent h-full flex items-center">
        <View className="w-full mt-4 px-4">
          <View className="w-full flex flex-row">
            <List.Item
              title="Ticket"
              description={`${newTicket.price * newTicket.amount} ETB`}
              left={(props) => (
                <List.Icon {...props} icon="receipt-outline" size={24} />
              )}
              onPress={() => console.log("pressed")}
              style={tw.style("w-2/3 my-auto")}
              titleStyle={tw.style("font-bold")}
            />
            <View className="w-1/3">
              <TicketCounter
                newTicket={newTicket}
                setNewTicket={setNewTicket}
              />
            </View>
          </View>
        </View>
        <ScrollView className="w-full p-4">
          <View className="p-4 border-b border-gray-200">
            <View className="flex flex-row justify-between">
              <Text className="text-3xl font-extrabold text-gray-600">
                {event.name}
              </Text>
              <View className="flex flex-row">
                <Badge
                  label={event.type}
                  style={tw.style("my-auto", { backgroundColor: "#4577a9" })}
                  labelStyle={tw.style("text-white")}
                  tintColor="#6866d4"
                />
              </View>
            </View>
            <View className="w-full flex flex-row mt-2 justify-between">
              <View className="flex flex-row my-auto">
                <Icon name="map-marker" size={20} color="#4577a9" />
                <Text className="text-sm text-gray-400 ml-2">
                  {event.venue}
                </Text>
              </View>
              <Text
                style={tw.style("text-xl font-bold", {
                  color: "#4577a9",
                })}
              >
                {event.price} Br.
              </Text>
            </View>
          </View>
          <View className="w-full flex flex-row py-3 border-b border-gray-200">
            <View className="w-1/2 px-1">
              <View
                style={tw.style(
                  "flex flex-row p-1 border border-gray-400 rounded-lg w-full text-center items-center justify-center"
                )}
              >
                <Icon
                  name="calendar"
                  color="#4577a9"
                  size={28}
                  style={tw.style("my-2")}
                />
                <View className="flex flex-col">
                  <Text
                    style={tw.style("text-xl text-gray-500 text-center ml-2")}
                  >
                    {event.date}
                  </Text>
                </View>
              </View>
            </View>
            <View className="w-1/2 px-1">
              <View
                style={tw.style(
                  "flex flex-row p-1 border border-gray-400 rounded-lg w-full text-center items-center justify-center"
                )}
              >
                <Icon
                  name="clock-outline"
                  color="#4577a9"
                  size={28}
                  style={tw.style("my-2")}
                />
                <View className="flex flex-col">
                  <Text
                    style={tw.style("text-xl text-gray-500 text-center ml-2")}
                  >
                    {event.time}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View className="w-full flex justify-start">
            <Text className="text-2xl font-bold text-gray-700 bg-slate-100 p-3">
              Purchase Summary
            </Text>
            <View className="w-full flex flex-row justify-end p-3">
              <Text className="text-xl font-bold text-gray-500">
                Total price:
              </Text>
              <Text className="text-xl font-bold text-gray-600 ml-2">
                {parseFloat(newTicket.price * newTicket.amount)} ETB
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
      <Button
        variant="contained"
        style={tw.style("absolute bottom-6 w-11/12 mt-2 h-14")}
        contentContainerStyle={tw.style("h-full")}
        color="#4577a9"
        titleStyle={tw.style("text-lg text-white font-bold w-full px-12")}
        trailing={(props) => (
          <Icon
            name="chevron-right"
            {...props}
            size={30}
            style={tw.style("mr-10")}
          />
        )}
        uppercase={false}
        title="Checkout"
        onPress={onBuyTicket}
        loading={addDataLoading}
        disabled={parseFloat(newTicket.price * newTicket.amount) === 0}
      />
    </SafeAreaView>
  );
};

const TicketCounter = ({ newTicket, setNewTicket }) => {
  return (
    <View className="w-full flex flex-row m-auto justify-center items-center bg-gray-200 rounded-lg p-2">
      <IconButton
        icon={(props) => (
          <Icon
            name={
              newTicket.amount === 1
                ? "delete"
                : newTicket.amount === 0
                ? ""
                : "minus"
            }
            {...props}
            size={26}
          />
        )}
        onPress={() =>
          setNewTicket({
            ...newTicket,
            amount: newTicket.amount - 1,
          })
        }
        disabled={!newTicket.amount}
      />
      <Text className="font-bold text-base mx-1">{newTicket.amount}</Text>
      <IconButton
        icon={(props) => <Icon name="plus" {...props} size={26} />}
        onPress={() =>
          setNewTicket({
            ...newTicket,
            amount: newTicket.amount + 1,
          })
        }
      />
    </View>
  );
};
export default PurchaseTicketScreen;
