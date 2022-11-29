import React, { useEffect } from "react";
import { RefreshControl, StatusBar } from "react-native";
import tw from "twrnc";
import { ScrollView, SafeAreaView, View, Text } from "react-native";
import { Image } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {
  Badge,
  IconButton,
  Button,
  Pressable,
} from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Button as PaperButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { URL } from "../Actions/types";
import { useState } from "react";
import { Skeleton } from "@rneui/themed";

const EventLoadingScreen = ({ viewEvent, eventId, loading }) => {
  return (
    <SafeAreaView className="bg-white h-full w-full">
      <ScrollView
        className="w-full h-full"
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => {
              viewEvent(eventId);
            }}
          />
        }
      >
        <Skeleton
          animation="wave"
          height={230}
          style={tw.style("rounded-b-3xl bg-gray-200 w-full")}
        />
        <View className="p-4 border-b border-gray-200">
          <View className="flex flex-row justify-between">
            <Skeleton
              animation="wave"
              width={120}
              height={30}
              style={tw.style("bg-gray-200")}
            />
            <View className="flex flex-row">
              <Skeleton
                animation="wave"
                width={40}
                height={20}
                style={tw.style("bg-gray-200")}
              />
            </View>
          </View>
          <View className="w-full flex flex-row mt-2 justify-between">
            <View className="flex flex-row my-auto">
              <Skeleton
                animation="wave"
                width={100}
                height={20}
                style={tw.style("bg-gray-200")}
              />
            </View>
            <Skeleton
              animation="wave"
              width={100}
              height={20}
              style={tw.style("bg-gray-200")}
            />
          </View>
        </View>
        <View className="w-full p-4">
          <Skeleton
            animation="wave"
            height={30}
            style={tw.style("bg-gray-200 w-4/5 mt-6 flex self-end")}
          />
          <Skeleton
            animation="wave"
            height={30}
            style={tw.style("bg-gray-200 w-full mt-3")}
          />
          <Skeleton
            animation="wave"
            height={30}
            style={tw.style("bg-gray-200 w-full mt-3")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EventLoadingScreen;
