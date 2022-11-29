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
import LoadingTicketListItem from "../Components/loadingTicketListItem";
import { RefreshControl } from "react-native";
import { emptyErrors } from "../Actions/auth";
import Toast from "react-native-fast-toast";

const MyTicketsScreen = ({ navigation }) => {
  const errors = useSelector((state) => state.errors);
  const { isAuthenticated, user, loading, tickets } = useSelector(
    (state) => state.data
  );
  const toast = useRef(null);
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
  useEffect(() => {
    if (Object.keys(errors).length !== 0) {
      if (errors.connection || errors.unknown) {
        toast.current.show("Connection problem. Please try again", {
          icon: <Icon name="alert-circle-outline" size={20} color="white" />,
          placement: "bottom",
          type: "danger",
          duration: 5000,
          style: { padding: 0 },
          textStyle: { padding: 0 },
        });
      }
      setTimeout(() => {
        dispatch(emptyErrors());
      }, 8000);
    }
  }, [errors]);
  return (
    <SafeAreaView className="w-full h-full bg-gray-100">
      <MyTicketsHeader />
      <Toast ref={toast} swipeEnabled={true} />
      <ScrollView
        style={tw`mx-auto my-1 bg-transparent w-full px-3`}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => {
              dispatch(getUserTickets(user.id));
            }}
          />
        }
      >
        {loading ? (
          <LoadingFunc />
        ) : (
          tickets.map((ticket) => {
            return <TicketListItem ticket={ticket} key={ticket.id} />;
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
        return <LoadingTicketListItem key={i} />;
      })}
    </>
  );
};
export default MyTicketsScreen;
