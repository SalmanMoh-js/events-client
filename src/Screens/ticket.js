import React, { useRef } from "react";
import tw from "twrnc";
import { ScrollView, SafeAreaView, View, Text } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Badge, Chip, ListItem, Pressable } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import TicketHeader from "../Components/ticketHeader";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-fast-toast";
import QRCode from "react-native-qrcode-svg";

const Ticket = ({ route }) => {
  const navigation = useNavigation();
  const toast = useRef(null);
  let qrCode = useRef(null);
  const { ticket, cipheredTicket } = route.params;

  function isInTheFuture(date) {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    return date > today;
  }
  return (
    <SafeAreaView className="bg-white absolute top-0 h-full w-full">
      <TicketHeader />
      <ScrollView className="w-full h-full">
        <View className="p-4 pb-3 border-b border-gray-200 w-full">
          <View className="flex flex-row justify-between w-full">
            <Pressable
              onPress={() =>
                navigation.navigate("Event", {
                  eventId: ticket.eventId,
                })
              }
              style={tw.style("", {
                width: "60%",
              })}
            >
              <Text
                className={
                  !isInTheFuture(new Date(ticket.date))
                    ? "text-3xl font-extrabold text-gray-600 line-through w-full"
                    : "text-3xl font-extrabold text-gray-600 w-full break-words"
                }
              >
                {ticket.eventName}
              </Text>
            </Pressable>
            <View className="flex flex-row my-auto">
              <Chip
                label={ticket.type}
                leading={(props) => (
                  <>
                    {ticket.live === "Yes" ? (
                      <MaterialIcons name="live-tv" {...props} size={12} />
                    ) : (
                      <FontAwesome5 name="walking" {...props} size={12} />
                    )}
                  </>
                )}
                style={tw.style("ml-1 h-auto")}
                contentContainerStyle={tw.style("my-auto")}
                labelStyle={tw.style("text-xs my-auto")}
                leadingContainerStyle={tw.style("my-auto")}
              />
              {!isInTheFuture(new Date(ticket.date)) ? (
                <Badge
                  label="Expired"
                  style={tw.style("my-auto mx-1", {
                    backgroundColor: "#9ea6ad",
                  })}
                  labelStyle={tw.style("text-white")}
                  tintColor="#b4b4c5"
                />
              ) : (
                <>
                  <Chip
                    label={ticket.type}
                    leading={(props) => (
                      <MaterialIcons
                        name={ticket.live === "Yes" ? "live-tv" : ""}
                        {...props}
                        size={12}
                      />
                    )}
                    style={tw.style("ml-1")}
                    contentContainerStyle={tw.style("")}
                    labelStyle={tw.style("text-xs")}
                    leadingContainerStyle={tw.style("")}
                  />
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
                  await Clipboard.setStringAsync(cipheredTicket.toString());
                  toast.current.show("Ticket Code Copied", {
                    icon: <Icon name="content-copy" size={20} color="white" />,
                    type: "normal",
                    duration: 3000,
                    style: { padding: 0, marginTop: 20 },
                    textStyle: { padding: 0 },
                  });
                }}
              >
                <Text className="text-sm text-gray-400 ml-2">
                  {cipheredTicket.slice(0, 10)}
                  {cipheredTicket.length <= 10 ? "" : "..."}
                </Text>
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
            title={
              ticket.inPerson === "Yes" && ticket.live === "Yes"
                ? "In-person & Live Stream"
                : ticket.inPerson === "Yes" && ticket.live === "No"
                ? "In-person"
                : "Live Stream"
            }
            secondaryText="Ticket Type"
            leading={<Ionicons name="receipt-outline" size={20} />}
          />
        </View>
        <View className="w-full p-3 flex justify-center items-center">
          <QRCode
            value={cipheredTicket.toString()}
            size={250}
            color="#1e3347"
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
