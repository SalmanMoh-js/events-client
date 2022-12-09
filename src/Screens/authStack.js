import React, { useEffect, useRef } from "react";
import "react-native-gesture-handler";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { useDispatch, useSelector } from "react-redux";
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
import LiveStreamScreen from "./liveStreamScreen";
import Toast from "react-native-fast-toast";

const Stack = createStackNavigator();
export default function AuthStack({ navigation }) {
  const errors = useSelector((state) => state.errors);
  const dispatch = useDispatch();
  const toast = useRef(null);
  useEffect(() => {
    if (errors && errors.token) {
      toast.current.show("Session expired. You have to re-login", {
        icon: <Icon name="alert-circle-outline" size={20} color="white" />,
        placement: "bottom",
        type: "danger",
        duration: 4000,
        style: { marginBottom: 50 },
        textStyle: { padding: 0 },
      });
      setTimeout(() => {
        dispatch(emptyErrors());
      }, 5000);
    }
  }, [errors]);
  return (
    <>
      <Toast ref={toast} swipeEnabled={true} />
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
          name="Live Stream"
          component={LiveStreamScreen}
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
    </>
  );
}
