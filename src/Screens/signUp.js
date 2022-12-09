import { View, Text, ScrollView } from "react-native";
import React, { useRef, useState } from "react";
import { StatusBar } from "react-native";
import { Divider, ActivityIndicator } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import tw from "twrnc";
import { Button, TextInput } from "react-native-paper";
import { ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PhoneInput from "react-native-phone-number-input";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { URL } from "../Actions/types";
import axios from "axios";
import Toast from "react-native-fast-toast";

const SignupScreen = () => {
  const { isAuthenticated } = useSelector((state) => state.data);
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    phone: "",
    formattedPhone: "",
    password: "",
  });
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState(false);
  const phoneInput = useRef();
  const toast = useRef(null);
  const navigation = useNavigation();

  const signUp = async (signUpData) => {
    setLoading(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify(signUpData);
    try {
      const res = await axios.post(`${URL}/api/user`, body, config);
      setSuccess(true);
      setLoading(false);
    } catch (err) {
      if (err.response) {
        setErrors(err.response.data);
        setLoading(false);
      } else if (err.request) {
        let errs = {};
        errs.connection = true;
        setErrors(errs);
        console.log(errors);
        setLoading(false);
      } else {
        let errs = {};
        errs.unknown = true;
        setErrors(errs);
        setLoading(false);
      }
    }
  };
  function onSignUp() {
    const newSignup = {
      name: signupData.name,
      email: signupData.email,
      phone: signupData.formattedPhone,
      password: signupData.password,
    };
    signUp(newSignup);
  }
  useEffect(() => {
    if (errors && Object.keys(errors).length !== 0) {
      if (errors.checkemail) {
        toast.current.show("Email already exists.", {
          icon: <Icon name="alert-circle-outline" size={20} color="white" />,
          placement: "bottom",
          type: "warning",
          duration: 4000,
          style: { padding: 0 },
          textStyle: { padding: 0 },
        });
      }
      if (errors.connection || errors.unknown) {
        toast.current.show("Connection problem. Please try again", {
          icon: <Icon name="alert-circle-outline" size={20} color="white" />,
          placement: "bottom",
          type: "danger",
          duration: 4000,
          style: { padding: 0 },
          textStyle: { padding: 0 },
        });
      }
      setTimeout(() => {
        setErrors(null);
      }, 5000);
    }
  }, [errors]);
  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate("Home");
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    }
  }, [isAuthenticated]);
  useEffect(() => {
    console.log(success);
    if (success) {
      toast.current.show(
        "Account created. Redirecting you to the login screen.",
        {
          icon: <ActivityIndicator size="small" color="#ffffff" />,
          placement: "bottom",
          type: "normal",
          duration: 5000,
          style: { padding: 0 },
          textStyle: { padding: 0 },
        }
      );
      setTimeout(() => {
        setSuccess(false);
        navigation.navigate("Login");
      }, 5000);
    }
  }, [success, errors]);
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
        <Toast ref={toast} swipeEnabled={true} />
        <StatusBar animated={true} backgroundColor="#403a4aff" />
        <View className="mt-10 w-4/5 p-3">
          <Text
            style={tw.style("text-4xl font-extrabold text-center my-2", {
              color: "#4577a9",
            })}
          >
            Lets Get Started!
          </Text>
          <Text className="text-2xl text-gray-500 text-center mt-1">
            Create an account to get all the features
          </Text>
        </View>
        <View className="w-full flex items-center justify-center px-4 py-0">
          <TextInput
            theme={{ roundness: 30 }}
            placeholder="Name"
            style={tw.style("w-11/12 my-3 px-2 rounded-lg bg-white")}
            left={
              <TextInput.Icon icon="ios-person-outline" color="#4577a967" />
            }
            value={signupData.name}
            onChangeText={(e) =>
              setSignupData({
                ...signupData,
                name: e,
              })
            }
            mode="outlined"
          />
          <TextInput
            theme={{ roundness: 30 }}
            placeholder="Email"
            value={signupData.email}
            onChangeText={(e) =>
              setSignupData({
                ...signupData,
                email: e,
              })
            }
            style={tw.style("w-11/12 mb-3 px-2 rounded-lg bg-white")}
            left={<TextInput.Icon icon="at" color="#4577a967" />}
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
              "w-11/12 mb-1 rounded-full bg-white border border-gray-400"
            )}
            textContainerStyle={tw.style("bg-white rounded-full")}
            flagButtonStyle={tw.style("border-r border-gray-300")}
          />
          <TextInput
            theme={{ roundness: 30 }}
            placeholder="Password"
            secureTextEntry={secureTextEntry}
            style={tw.style("w-11/12 mb-2 px-2 bg-white")}
            value={signupData.password}
            onChangeText={(e) =>
              setSignupData({
                ...signupData,
                password: e,
              })
            }
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
            onPress={onSignUp}
            uppercase={false}
            loading={loading}
            disabled={
              !signupData.name ||
              !signupData.email ||
              !signupData.formattedPhone ||
              !signupData.password
            }
          >
            Sign Up
          </Button>
          <View className="w-full flex flex-row mt-10 items-center justify-center">
            <Divider style={tw.style("w-5/12")} />
            <Text className="px-4 text-lg font-bold text-gray-600">Or</Text>
            <Divider style={tw.style("w-5/12")} />
          </View>
          {/* <MaterialButton
            mode="contained"
            style={tw.style("w-4/5 mt-6 p-0")}
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
          /> */}
          <View className="w-full flex flex-row mt-6 justify-center">
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
