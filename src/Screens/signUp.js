import { View, Text, ScrollView } from "react-native";
import React, { useRef, useState } from "react";
import { StatusBar } from "react-native";
import {
  IconButton,
  Button as MaterialButton,
  Pressable,
  TextInput,
  Divider,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Octicons from "react-native-vector-icons/Octicons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import tw from "twrnc";
import { Button } from "react-native-paper";
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
            placeholder="Name"
            style={tw.style("w-11/12 my-2 rounded-lgs")}
            value={signupData.name}
            autoComplete="name-family"
            onChangeText={(text) => {
              setSignupData({
                ...signupData,
                name: text,
              });
            }}
            leading={(props) => (
              <AntDesign name="user" {...props} color="#4577a967" />
            )}
            variant="outlined"
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
              "w-11/12 mb-3 rounded-md bg-white border border-gray-400"
            )}
            textContainerStyle={tw.style("bg-white rounded-md")}
            flagButtonStyle={tw.style("border-r border-gray-300")}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry={secureTextEntry}
            value={signupData.password}
            onChangeText={(text) => {
              setSignupData({
                ...signupData,
                password: text,
              });
            }}
            style={tw.style("w-11/12 mb-2")}
            leading={(props) => (
              <Feather name="lock" {...props} color="#4577a960" />
            )}
            trailing={(props) => (
              <IconButton
                icon={(props) => (
                  <Ionicons
                    name={
                      secureTextEntry
                        ? "ios-eye-off-outline"
                        : "ios-eye-outline"
                    }
                    {...props}
                    color="#4577a9"
                  />
                )}
                {...props}
                onPress={() => {
                  if (secureTextEntry) {
                    setSecureTextEntry(false);
                  } else {
                    setSecureTextEntry(true);
                  }
                }}
                style={tw.style("z-50")}
              />
            )}
            variant="outlined"
          />
          <Button
            mode="contained"
            style={tw.style("w-4/5 mt-2 h-12 rounded-xl")}
            contentStyle={tw.style("h-full")}
            color="#e09467"
            labelStyle={tw.style("text-lg text-white")}
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
          <Button
            mode="contained"
            style={tw.style("w-4/5 mt-10 h-12")}
            contentStyle={tw.style("h-full")}
            icon="google"
            color="white"
            labelStyle={tw.style("text-lg text-blue-800")}
            uppercase={false}
          >
            Sign up with Google
          </Button>
          <Button
            mode="contained"
            style={tw.style("w-4/5 mt-4 h-12")}
            contentStyle={tw.style("h-full")}
            icon="facebook"
            color="#268ceb"
            labelStyle={tw.style("text-lg text-white")}
            uppercase={false}
          >
            Sign up with Facebook
          </Button>
          <View className="w-full flex flex-row mt-16 justify-center">
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
