import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "react-native";
import {
  IconButton,
  Button as MaterialButton,
  Pressable,
  Divider,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import tw from "twrnc";
import { Button, TextInput } from "react-native-paper";
import LoginSvg from "../../assets/loginSvg.svg";
import { LinearGradient } from "expo-linear-gradient";
import { ImageBackground } from "react-native";
import BgImage from "../../assets/loginbg.jpg";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const navigation = useNavigation();
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
    >
      <ScrollView
        className="w-full h-full bg-transparent"
        contentContainerStyle={tw.style("flex items-center justify-center")}
      >
        <StatusBar animated={true} backgroundColor="#403a4aff" />
        <View className="mt-10 w-4/5 p-3">
          <Text
            style={tw.style("text-4xl font-extrabold text-center my-2", {
              color: "#4577a9",
            })}
          >
            Hello Again!
          </Text>
          <Text className="text-2xl text-gray-500 text-center mt-3">
            Welcome back. You've been missed
          </Text>
        </View>
        <View className="w-full flex items-center justify-center p-4">
          <TextInput
            theme={{ roundness: 30 }}
            placeholder="Email"
            style={tw.style("w-11/12 my-2 px-2 rounded-lg bg-white")}
            left={<TextInput.Icon icon="at" color="#4577a967" />}
            mode="outlined"
          />
          <TextInput
            theme={{ roundness: 30 }}
            placeholder="Password"
            secureTextEntry={secureTextEntry}
            style={tw.style("w-11/12 mb-2 px-2 bg-white")}
            left={
              <TextInput.Icon icon="lock-closed-outline" color="#4577a960" />
            }
            right={
              secureTextEntry ? (
                <TextInput.Icon
                  icon="eye-outline"
                  color="#2a4563d2"
                  onPress={() => setSecureTextEntry(false)}
                />
              ) : (
                <TextInput.Icon
                  icon="eye-off-outline"
                  color="#2a4563d2"
                  onPress={() => setSecureTextEntry(true)}
                />
              )
            }
            mode="outlined"
          />
          <Pressable
            style={tw.style("mb-4 w-4/5 px-2")}
            onPress={() => navigation.navigate("Home")}
          >
            <Text
              style={tw.style("text-base text-right", {
                color: "#4577a9",
              })}
            >
              Forgot Password?
            </Text>
          </Pressable>
          <Button
            mode="contained"
            style={tw.style("w-4/5 mt-2 h-12 rounded-full")}
            contentStyle={tw.style("h-full")}
            color="#e09467"
            labelStyle={tw.style("text-lg text-white")}
            onPress={() => navigation.navigate("Home")}
            uppercase={false}
          >
            Login
          </Button>
          <View className="w-full flex flex-row mt-10 items-center justify-center">
            <Divider style={tw.style("w-5/12")} />
            <Text className="px-4 text-lg font-bold text-gray-600">Or</Text>
            <Divider style={tw.style("w-5/12")} />
          </View>
          <MaterialButton
            mode="contained"
            style={tw.style("w-4/5 mt-10 p-0")}
            contentContainerStyle={tw.style("p-2 w-full h-12")}
            leading={(props) => (
              <Icon
                name="google"
                {...props}
                style={tw.style("text-blue-800")}
              />
            )}
            color="white"
            titleStyle={tw.style("text-lg text-blue-800")}
            uppercase={false}
            title="Signup with Gmail"
          />
          <MaterialButton
            mode="contained"
            style={tw.style("w-4/5 mt-4 h-12")}
            contentContainerStyle={tw.style("p-2 w-full h-12")}
            color="#268ceb"
            titleStyle={tw.style("text-lg text-white")}
            leading={(props) => (
              <Icon name="facebook" {...props} color="white" />
            )}
            uppercase={false}
            title="Signup with Facebook"
          />
          <View className="w-full flex flex-row mt-24 justify-center">
            <Text className="my-auto text-lg text-gray-700">
              Doesn't have an account?
            </Text>
            <Button
              mode="text"
              color="#4577a9"
              labelStyle={tw.style("text-lg")}
              uppercase={false}
              compact
              onPress={() => navigation.navigate("Signup")}
            >
              Sign Up
            </Button>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
    // </LinearGradient>
  );
};

export default LoginScreen;
