import React, { useEffect, useRef } from "react";
import { RefreshControl } from "react-native";
import tw from "twrnc";
import { ScrollView, SafeAreaView, View, Text } from "react-native";
import { Image } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {
  Badge,
  IconButton,
  Button,
  Pressable,
} from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Button as PaperButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { URL } from "../Actions/types";
import { useState } from "react";
import axios from "axios";
import EventLoadingScreen from "../Components/eventLoadingScreen";
import Toast from "react-native-fast-toast";
import { getUserTickets } from "../Actions/userActions";

const Event = ({ route }) => {
  const { isAuthenticated, user, tickets } = useSelector((state) => state.data);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { eventId } = route.params;
  const [eventTickets, setEventTickets] = useState(
    tickets.filter((ticket) => ticket.eventId.toString() === eventId.toString())
  );
  const [liveTicket, setLiveTicket] = useState(
    eventTickets.filter((ticket) => ticket.live.toString() === "Yes")
  );
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState({});
  const [errors, setErrors] = useState(null);
  const toast = useRef(null);
  const viewEvent = async (id) => {
    setLoading(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": await AsyncStorage.getItem("token"),
      },
      timeout: 5000,
    };
    try {
      const res = await axios.get(`${URL}/api/event/${id}`, config);
      setEvent(res.data[0]);
      setLoading(false);
    } catch (err) {
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
    viewEvent(eventId);
    dispatch(getUserTickets(user.id));
  }, []);
  useEffect(() => {
    setEventTickets(
      tickets.filter(
        (ticket) => ticket.eventId.toString() === eventId.toString()
      )
    );
    setLiveTicket(
      eventTickets.filter((ticket) => ticket.live.toString() === "Yes")
    );
    console.log("Live: ", liveTicket);
  }, [tickets]);
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
    if (Object.keys(event).length !== 0) {
      setErrors(null);
    }
  }, [event, errors]);
  return (
    <>
      <Toast ref={toast} swipeEnabled={true} />
      {loading ? (
        <EventLoadingScreen
          viewEvent={viewEvent}
          eventId={eventId}
          loading={loading}
        />
      ) : (
        <SafeAreaView className="bg-white h-full w-full flex items-center">
          <ScrollView
            className="w-full h-full"
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={() => {
                  viewEvent(eventId);
                }}
              />
            }
          >
            <Image
              source={{
                uri: "https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg",
              }}
              className="w-full h-60 rounded-b-3xl"
            />
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
            <View className="w-full p-4">
              <View className="flex flex-row justify-between my-auto">
                <View className="flex flex-row my-auto">
                  <Text className="text-2xl font-bold text-gray-600 mr-2 ml-4">
                    Details
                  </Text>
                  <Icon
                    name="alert-circle-outline"
                    size={24}
                    color="#4577a9"
                    style={tw.style("my-auto")}
                  />
                </View>
                {event.liveStreamLink && liveTicket.length ? (
                  <Button
                    variant="outlined"
                    title="Live stream"
                    leading={(props) => (
                      <MaterialIcons
                        name="live-tv"
                        {...props}
                        color="#268ceb"
                      />
                    )}
                    onPress={() =>
                      navigation.navigate("Live Stream", {
                        event: event,
                      })
                    }
                  />
                ) : null}
              </View>
              <Text className="text-lg text-gray-500 break-words m-4 text-justify">
                {event.description}
              </Text>
            </View>
          </ScrollView>
          {!errors && (
            <Button
              variant="contained"
              style={tw.style("absolute bottom-6 w-11/12 mt-2 h-14")}
              contentContainerStyle={tw.style("h-full")}
              color="#4577a9"
              titleStyle={tw.style("text-lg text-white font-bold w-full px-20")}
              trailing={(props) => (
                <Text className="text-lg text-white font-bold mr-20">
                  {event.price} ETB
                </Text>
              )}
              uppercase={false}
              title="Buy Ticket"
              onPress={() =>
                navigation.navigate("Purchase Ticket", {
                  event: event,
                })
              }
            />
          )}
          <View className="flex flex-row justify-between absolute top-0 w-full px-3 h-fit bg-gradient-to-b from-gray-600 to-gray-200">
            <IconButton
              icon={(props) => (
                <Icon name="arrow-left" {...props} color="white" />
              )}
              style={tw.style("")}
              onPress={() => navigation.goBack()}
            />
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default Event;
