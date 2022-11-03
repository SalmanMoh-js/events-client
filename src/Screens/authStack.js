import React from "react";
import { Easing } from "react-native";
import "react-native-gesture-handler";
import {
  createStackNavigator,
  TransitionPresets,
  TransitionSpecs,
  HeaderStyleInterpolators,
} from "@react-navigation/stack";
import { useDispatch } from "react-redux";
import BottomTab from "./bottomTab";
import LoginScreen from "./login";
import FirstScreen from "./firstScreen";
import SignupScreen from "./signUp";
import HelpScreen from "./help";
import CategoryEventScreen from "./categoryEvent";
import EditProfileScreen from "./editProfileScreen";
import ChangePasswordScreen from "./changePasswordScreen";
import Ticket from "./ticket";
import SearchScreen from "./searchScreen";
import Event from "./event";
import PurchaseTicketScreen from "./purchaseTicket";

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
const MyTransition = {
  gestureDirection: "horizontal",
  transitionSpec: {
    open: TransitionSpecs.RevealFromBottomAndroidSpec,
    close: TransitionSpecs.FadeOutToBottomAndroidSpec,
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
        name="Catagory Event"
        component={CategoryEventScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />
      <Stack.Screen
        name="Event"
        component={Event}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Ticket"
        component={Ticket}
        options={{
          headerShown: false,
          ...TransitionPresets.ModalPresentationIOS,
        }}
      />
      <Stack.Screen
        name="Purchase Ticket"
        component={PurchaseTicketScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.ModalPresentationIOS,
        }}
      />
      <Stack.Screen
        name="Edit Profile"
        component={EditProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Change Password"
        component={ChangePasswordScreen}
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
