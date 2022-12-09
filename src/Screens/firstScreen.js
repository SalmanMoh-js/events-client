import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import tw from "twrnc";
import { Button } from "react-native-paper";
import FirstSvg from "../../assets/firstSvg.svg";
import { ImageBackground } from "react-native";
import { useSelector } from "react-redux";

const FirstScreen = ({ navigation }) => {
  const { isAuthenticated, user } = useSelector((state) => state.data);
  useEffect(() => {
    if (isAuthenticated || user) {
      navigation.navigate("Home");
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    }
  }, [isAuthenticated, user]);
  return (
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
  );
};

export default FirstScreen;
