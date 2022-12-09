import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TransitionPresets } from "@react-navigation/stack";
import AntDesign from "react-native-vector-icons/AntDesign";
import Octicons from "react-native-vector-icons/Octicons";
import Ionicons from "@expo/vector-icons/Ionicons";
import HomeScreen from "./homeScreen";
import Profile from "./profile";
import MyTicketsScreen from "./myTicketsScreen";
import CustomLiveStreamScreen from "./customLiveStreamScreen";

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
        tabBarStyle: {
          position: "absolute",
          borderRadius: 20,
          marginBottom: 10,
          marginHorizontal: 10,
          paddingTop: 5,
          paddingBottom: 3,
        },
      }}
    >
      <Tab.Screen
        name="Landing"
        component={HomeScreen}
        options={{
          tabBarIcon: (props) => <Octicons name="home" size={20} {...props} />,
          title: "Home",
          tabBarLabelStyle: {
            fontSize: 12,
          },
        }}
      />
      <Tab.Screen
        name="My Tickets"
        component={MyTicketsScreen}
        options={{
          tabBarIcon: (props) => (
            <Ionicons name="receipt-outline" size={20} {...props} />
          ),
          title: "Tickets",
          tabBarLabelStyle: {
            fontSize: 12,
          },
        }}
      />
      <Tab.Screen
        name="Custom Live Stream"
        component={CustomLiveStreamScreen}
        options={{
          tabBarIcon: (props) => (
            <Ionicons name="videocam-outline" {...props} size={31} />
          ),
          title: "Live",
          tabBarLabelStyle: {
            fontSize: 12,
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: (props) => <AntDesign name="user" size={20} {...props} />,
          title: "Profile",
          tabBarLabelStyle: {
            fontSize: 12,
          },
        }}
      />
    </Tab.Navigator>
  );
}
