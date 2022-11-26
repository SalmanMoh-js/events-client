import React, { useEffect, useRef } from "react";
import tw from "twrnc";
import { ScrollView, SafeAreaView, View, Text } from "react-native";
import { Image } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {
  Badge,
  IconButton,
  ListItem,
  Pressable,
} from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import TicketHeader from "../Components/ticketHeader";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-fast-toast";
import QRCode from "react-native-qrcode-svg";
import * as FileSystem from "expo-file-system";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import * as Sharing from "expo-sharing";

const Ticket = ({ route }) => {
  const navigation = useNavigation();
  const toast = useRef(null);
  let qrCode = useRef(null);
  const { ticket } = route.params;

  return (
    <SafeAreaView className="bg-white absolute top-0 h-full w-full">
      <TicketHeader />
      <ScrollView className="w-full h-full">
        <View className="p-4 pb-3 border-b border-gray-200">
          <View className="flex flex-row justify-between">
            <Text
              className={
                ticket.expired === "true"
                  ? "text-3xl font-extrabold text-gray-600 line-through"
                  : "text-3xl font-extrabold text-gray-600"
              }
            >
              {ticket.eventName}
            </Text>
            <View className="flex flex-row">
              {ticket.expired === "true" ? (
                <Badge
                  label="Expired"
                  style={tw.style("my-auto", { backgroundColor: "#9ea6ad" })}
                  labelStyle={tw.style("text-white")}
                  tintColor="#b4b4c5"
                />
              ) : (
                <>
                  {/* <Badge
                    label={ticket.type}
                    style={tw.style("my-auto", {
                      backgroundColor:
                        ticket.type === "Vip" ? "#b0b316" : "#4577a9",
                    })}
                    labelStyle={tw.style("text-white")}
                    tintColor={ticket.type === "Vip" ? "#b0b316" : "#4577a9"}
                  /> */}
                  <Badge
                    label={
                      ticket.confirmed === "true"
                        ? "Confirmed"
                        : "Not Confirmed"
                    }
                    style={tw.style("mx-2 my-auto", {
                      backgroundColor: "#329466",
                    })}
                    labelStyle={tw.style("text-white")}
                    tintColor="#6866d4"
                  />
                </>
              )}
            </View>
          </View>
          <View className="w-full flex flex-row mt-2 justify-between">
            <View className="flex flex-row my-auto">
              <Icon name="map-marker" size={20} color="#4577a9" />
              <Text className="text-sm text-gray-400 ml-2">Venue</Text>
              <Text className="text-sm text-gray-400 ml-2">.</Text>
              <AntDesign
                name="calendar"
                size={18}
                style={tw.style("ml-2")}
                color="#4577a9"
              />
              <Text className="text-sm text-gray-400 ml-2">{ticket.date}</Text>
              <Text className="text-sm text-gray-400 ml-2">.</Text>
              <Feather
                name="hash"
                size={18}
                style={tw.style("ml-2")}
                color="#4577a9"
              />
              <Pressable
                onPress={async () => {
                  await Clipboard.setStringAsync(ticket.id.toString());
                  toast.current.show("ID Copied", {
                    icon: <Icon name="content-copy" size={20} color="white" />,
                    type: "normal",
                    duration: 3000,
                    style: { padding: 0, marginTop: 20 },
                    textStyle: { padding: 0 },
                  });
                }}
              >
                <Text className="text-sm text-gray-400 ml-2">{ticket.id}</Text>
              </Pressable>
            </View>
            <Text
              style={tw.style("text-xl font-bold", {
                color: "#4577a9",
                textDecorationLine: ticket.expired && "line-through",
              })}
            >
              {ticket.price} Br.
            </Text>
          </View>
          <Text
            style={tw.style("text-base font-bold text-right", {
              color: ticket.paid ? "#4577a9" : "#db7171",
              textDecorationLine: ticket.expired && "line-through",
            })}
          >
            {ticket.paid === "true" ? "Paid" : "Unpaid"}
          </Text>
        </View>
        <View className="w-full p-4">
          <ListItem
            title={ticket.holderName}
            secondaryText="Holder Name"
            leading={<AntDesign name="user" size={24} />}
          />
          <ListItem
            title={ticket.dateOfPurchase}
            secondaryText="Date of Purchase"
            leading={<AntDesign name="calendar" size={24} />}
          />
          <ListItem
            title={ticket.buyerName}
            secondaryText="Purchaser Account"
            leading={<Icon name="account-cash-outline" size={24} />}
          />
        </View>
        <View className="w-full p-3 flex justify-center items-center">
          <QRCode
            value={ticket.id.toString()}
            size={250}
            color="#3b628a"
            logo={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxT3Qpex819IE9wTwQdMq6EtH6Ld0j0uARBGM4NCZb3RIQWL-boilIwPU-F2n_ZkBjQ5k&usqp=CAU",
            }}
            logoBackgroundColor="transparent"
            getRef={(c) => (qrCode = c)}
          />
        </View>
      </ScrollView>
      <Toast ref={toast} />
    </SafeAreaView>
  );
};

export default Ticket;
