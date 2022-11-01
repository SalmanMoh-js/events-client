import { View, Text, ScrollView } from "react-native";
import React, { useRef, useState } from "react";
import { StatusBar } from "react-native";
import {
  IconButton,
  Button as MaterialButton,
  Pressable,
  Divider,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Octicons from "react-native-vector-icons/Octicons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import tw from "twrnc";
import { Button, TextInput } from "react-native-paper";
import LoginSvg from "../../assets/loginSvg.svg";
import { LinearGradient } from "expo-linear-gradient";
import { ImageBackground } from "react-native";
import BgImage from "../../assets/loginbg.jpg";
import { useNavigation } from "@react-navigation/native";
import PhoneInput from "react-native-phone-number-input";

const SignupScreen = () => {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    phone: "",
    formattedPhone: "",
    password: "",
  });
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const phoneInput = useRef();
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
            Lets Get Started!
          </Text>
          <Text className="text-2xl text-gray-500 text-center mt-3">
            Create an account to get all the features
          </Text>
        </View>
        <View className="w-full flex items-center justify-center p-4">
          <TextInput
            theme={{ roundness: 30 }}
            placeholder="Name"
            style={tw.style("w-11/12 my-3 px-2 rounded-lg bg-white")}
            left={
              <TextInput.Icon icon="ios-person-outline" color="#4577a967" />
            }
            mode="outlined"
          />
          <PhoneInput
            ref={phoneInput}
            defaultValue={signupData.phone}
            defaultCode="ET"
            layout="first"
            onChangeText={(text) => {
              setSignupData({
                ...signupData,
                phone: text,
              });
            }}
            onChangeFormattedText={(text) => {
              setSignupData({
                ...signupData,
                formattedPhone: text,
              });
            }}
            containerStyle={tw.style(
              "w-11/12 mb-2 rounded-full bg-white border border-gray-400"
            )}
            textContainerStyle={tw.style("bg-white rounded-full")}
            flagButtonStyle={tw.style("border-r border-gray-300")}
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
          <Button
            mode="contained"
            style={tw.style("w-4/5 mt-2 h-12 rounded-full")}
            labelStyle={tw.style("text-lg text-white")}
            contentStyle={tw.style("h-full")}
            color="#e09467"
            onPress={() => navigation.navigate("Home")}
            uppercase={false}
          >
            Sign Up
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
          <View className="w-full flex flex-row mt-14 justify-center">
            <Text className="my-auto text-lg text-gray-700">
              Already have an account?
            </Text>
            <Button
              mode="text"
              color="#4577a9"
              labelStyle={tw.style("text-lg")}
              uppercase={false}
              compact
              onPress={() => navigation.navigate("Login")}
            >
              Login
            </Button>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
    // </LinearGradient>
  );
};

export default SignupScreen;
