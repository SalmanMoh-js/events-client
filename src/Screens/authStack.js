import React from "react";
import { Easing } from "react-native";
import "react-native-gesture-handler";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { useDispatch } from "react-redux";
import BottomTab from "./bottomTab";
import LoginScreen from "./login";
import FirstScreen from "./firstScreen";
import Announcments from "./Announcements";
import SignupScreen from "./signUp";
import HelpScreen from "./help";

const Stack = createStackNavigator();
const config = {
  animation: "spring",
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};
const closeConfig = {
  animation: "timing",
  config: {
    duration: 300,
    easing: Easing.linear,
  },
};
export default function AuthStack({ navigation }) {
  const dispatch = useDispatch();
  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen
        name="First"
        component={FirstScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={BottomTab}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Announcements"
        component={Announcments}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Help"
        component={HelpScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
