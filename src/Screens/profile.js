import { View, Text, SafeAreaView, ScrollView, Dimensions } from "react-native";
import React, { useRef } from "react";
import tw from "twrnc";
import { Avatar, Chip, Surface } from "@react-native-material/core";
import AntDesign from "react-native-vector-icons/AntDesign";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import ProfileScreenHeader from "../Components/profileScreenHeader";
import { List } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Actions/auth";

const ProfileScreen = ({ navigation }) => {
  const errors = useSelector((state) => state.errors);
  const { isAuthenticated, user, loading } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  return (
    <SafeAreaView className="w-full h-full bg-white">
      <ProfileScreenHeader />
      <ScrollView
        className="w-full py-3 bg-transparent h-full"
        contentContainerStyle={tw.style("flex items-center ")}
      >
        <Avatar
          icon={(props) => (
            <AntDesign name="user" {...props} color="#c78915ff" />
          )}
          size={100}
          style={tw.style("mt-8", {
            backgroundColor: "#739fca67",
          })}
        />
        <Text className="w-full text-center text-2xl mt-3 mb-1 text-slate-600 font-semibold">
          {user?.name}
        </Text>
        <Text className="w-full text-center text-lg text-gray-500 font-light">
          {user?.phone}
        </Text>
        <View className="w-full mt-6 px-4">
          <List.Item
            title="Help & Support"
            left={(props) => (
              <List.Icon {...props} icon="help-buoy-outline" size={24} />
            )}
            right={(props) => (
              <Icon name="chevron-right" size={24} {...props} />
            )}
            style={tw.style("py-3")}
            onPress={() => navigation.navigate("Help")}
          />
          <List.Item
            title="Privacy Policy"
            left={(props) => (
              <List.Icon {...props} icon="shield-outline" size={24} />
            )}
            right={(props) => (
              <Icon name="chevron-right" size={24} {...props} />
            )}
            style={tw.style("py-3")}
          />
          <List.Item
            title="Terms & Condition"
            left={(props) => (
              <List.Icon {...props} icon="document-text-outline" size={24} />
            )}
            right={(props) => (
              <Icon name="chevron-right" size={24} {...props} />
            )}
            style={tw.style("py-3")}
          />
          <List.Item
            title="Logout"
            left={(props) => (
              <List.Icon {...props} icon="exit-outline" color="#ee6a6a" />
            )}
            style={tw.style("py-3")}
            onPress={() => {
              dispatch(logout());
              navigation.navigate("First");
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
