import { View, Text, ScrollView, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "react-native";
import {
  IconButton,
  TextInput,
  Button as MaterialButton,
  Pressable,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import tw from "twrnc";
import { Button, Divider } from "react-native-paper";
import FirstSvg from "../../assets/firstSvg.svg";
import { LinearGradient } from "expo-linear-gradient";
import { ImageBackground } from "react-native";

const FirstScreen = ({ navigation }) => {
  return (
    // <LinearGradient
    //   colors={["#e0e5f0"]}
    //   start={{ x: 0, y: 1 }}
    //   end={{ x: 1, y: 0 }}
    // >
    <ImageBackground
      source={require("../../assets/loginbg.jpg")}
      resizeMode="cover"
      blurRadius={90}
      style={tw.style("h-full")}
    >
      <StatusBar animated={true} backgroundColor="#403a4aff" />
      <View className="w-full h-full bg-transparent flex items-center p-3">
        <View
          style={tw.style("w-full h-1/2 flex justify-center items-center", {
            backgroundColor: "#4577a9",
            borderRadius: 40,
          })}
        >
          <FirstSvg />
        </View>
        <View className="w-full flex flex-col items-center justify-between py-14 px-10 my-6">
          <View>
            <Text className="text-4xl font-bold text-slate-600 text-center">
              Never miss an event with App Name
            </Text>
            <Text className="text-lg text-gray-500 text-center mt-6">
              Explore new places, new people and new experiences with us.
            </Text>
          </View>
          <View className="w-full flex flex-row justify-between mt-20">
            <Button
              mode="contained"
              style={tw.style("mt-2 h-12 rounded-lg", {
                width: "48%",
              })}
              contentStyle={tw.style("h-full")}
              color="#4577a9"
              labelStyle={tw.style("text-lg")}
              onPress={() => navigation.navigate("Signup")}
              uppercase={false}
            >
              Sign Up
            </Button>
            <Button
              mode="contained"
              style={tw.style("mt-2 h-12 rounded-lg", {
                width: "48%",
              })}
              contentStyle={tw.style("h-full")}
              color="#ffffff"
              labelStyle={tw.style("text-lg")}
              onPress={() => navigation.navigate("Login")}
              uppercase={false}
            >
              Login
            </Button>
          </View>
        </View>
      </View>
    </ImageBackground>
    // </LinearGradient>
  );
};

export default FirstScreen;
