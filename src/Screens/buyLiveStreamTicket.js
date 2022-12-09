import { View, Text } from "react-native";
import React from "react";
import tw from "twrnc";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Button, Divider } from "@react-native-material/core";
import Modal from "react-native-modal";
import LoadingModalComponent from "../Components/loadingModalComponent";

const BuyLiveTicket = ({
  selectedTicketType,
  setSelectedTicketType,
  loading,
  event,
}) => {
  return (
    <>
      <View className="mx-auto mt-4 border border-gray-300 rounded-lg p-6 flex justify-center items-center">
        <Button
          variant={
            selectedTicketType.type === "online" ? "contained" : "outlined"
          }
          style={tw.style("h-16", {
            width: 300,
          })}
          color={selectedTicketType.type === "online" ? "#268ceb" : "white"}
          contentContainerStyle={tw.style("p-2 w-full h-16")}
          titleStyle={tw.style("text-lg", {
            color: selectedTicketType.type === "online" ? "white" : "#265beb",
          })}
          leading={(props) => (
            <MaterialIcons
              name="live-tv"
              {...props}
              color={selectedTicketType.type === "online" ? "white" : "#268ceb"}
            />
          )}
          leadingContainerStyle={tw.style("mr-3")}
          trailing={(props) => (
            <Text
              style={tw.style("text-lg font-bold ml-8", {
                color:
                  selectedTicketType.type === "online" ? "white" : "#268ceb",
              })}
            >
              {event.livePrice} ETB
            </Text>
          )}
          uppercase={false}
          title="For Live Stream"
          onPress={() =>
            setSelectedTicketType({
              ...selectedTicketType,
              type: "online",
              price: event.livePrice,
            })
          }
        />
        <View className="w-full flex flex-row mt-2 items-center justify-center">
          <Divider style={tw.style("w-1/3")} />
          <Text className="px-4 text-lg text-gray-600">In-person</Text>
          <Divider style={tw.style("w-1/3")} />
        </View>
        <Button
          variant={
            selectedTicketType.type === "Standard" ? "contained" : "outlined"
          }
          style={tw.style("h-16 mt-2", {
            width: 300,
          })}
          color={selectedTicketType.type === "Standard" ? "#268ceb" : "white"}
          contentContainerStyle={tw.style("p-2 w-full h-16")}
          titleStyle={tw.style("text-lg", {
            color: selectedTicketType.type === "Standard" ? "white" : "#265beb",
          })}
          leading={(props) => (
            <FontAwesome5
              name="walking"
              {...props}
              color={
                selectedTicketType.type === "Standard" ? "white" : "#268ceb"
              }
            />
          )}
          leadingContainerStyle={tw.style("mr-3")}
          trailing={(props) => (
            <Text
              style={tw.style("text-lg font-bold ml-8", {
                color:
                  selectedTicketType.type === "Standard" ? "white" : "#268ceb",
              })}
            >
              {event.price} ETB
            </Text>
          )}
          uppercase={false}
          title="Standard"
          onPress={() =>
            setSelectedTicketType({
              ...selectedTicketType,
              type: "Standard",
              price: event.price,
            })
          }
        />
        {event.ticketTypes.split(",").map((type, index) => {
          return (
            <Button
              key={index}
              variant={
                selectedTicketType.type === type ? "contained" : "outlined"
              }
              style={tw.style("h-16 mt-2", {
                width: 300,
              })}
              color={selectedTicketType.type === type ? "#268ceb" : "white"}
              contentContainerStyle={tw.style("p-2 w-full h-16")}
              titleStyle={tw.style("text-lg", {
                color: selectedTicketType.type === type ? "white" : "#265beb",
              })}
              leading={(props) => (
                <FontAwesome5
                  name="walking"
                  {...props}
                  color={selectedTicketType.type === type ? "white" : "#268ceb"}
                />
              )}
              leadingContainerStyle={tw.style("mr-3")}
              trailing={(props) => (
                <Text
                  style={tw.style("text-lg font-bold ml-8", {
                    color:
                      selectedTicketType.type === type ? "white" : "#268ceb",
                  })}
                >
                  {event.prices.split(",")[index]} ETB
                </Text>
              )}
              uppercase={false}
              title={type}
              onPress={() =>
                setSelectedTicketType({
                  ...selectedTicketType,
                  type: type,
                  price: event.prices.split(",")[index],
                })
              }
            />
          );
        })}
      </View>
      <Modal
        animationIn="fadeIn"
        animationOut="fadeOut"
        transparent={true}
        isVisible={loading}
        hasBackdrop
        backdropOpacity={0.08}
      >
        <LoadingModalComponent />
      </Modal>
    </>
  );
};

export default BuyLiveTicket;
