import React, { useEffect } from "react";
import { StatusBar } from "react-native";
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
import AntDesign from "react-native-vector-icons/AntDesign";
import { Button as PaperButton } from "react-native-paper";

const Event = ({ route }) => {
  const navigation = useNavigation();
  const { event } = route.params;
  return (
    <SafeAreaView className="bg-white h-full w-full flex items-center">
      <ScrollView className="w-full h-full">
        <Image
          source={{
            uri: event.banner,
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
              <Text className="text-sm text-gray-400 ml-2">{event.venue}</Text>
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
          <Text className="text-lg text-gray-500 break-words m-4 text-justify">
            {event.desc} Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Rem tenetur consequuntur debitis! Reiciendis modi nostrum,
            perferendis accusamus quisquam, voluptate in assumenda, cumque fuga
            architecto harum!
          </Text>
        </View>
      </ScrollView>
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
      <View className="flex flex-row justify-between absolute top-0 w-full px-3 h-fit bg-gradient-to-b from-gray-600 to-gray-200">
        <IconButton
          icon={(props) => <Icon name="arrow-left" {...props} color="white" />}
          style={tw.style("")}
          onPress={() => navigation.goBack()}
        />
      </View>
    </SafeAreaView>
  );
};

export default Event;
