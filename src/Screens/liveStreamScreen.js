import * as ScreenOrientation from "expo-screen-orientation";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  BackHandler,
  Image,
} from "react-native";
import { ResizeMode } from "expo-av";
import React, { useEffect, useRef, useState } from "react";
import VideoPlayer from "expo-video-player";
import tw from "twrnc";
import { useIsFocused } from "@react-navigation/native";
import LiveScreenHeader from "../Components/liveStreamHeader";
import { useNavigation } from "@react-navigation/native";

const LiveStreamScreen = ({ route }) => {
  const [inFullscreen, setInFullsreen] = useState(false);
  const [isMute, setIsMute] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const { event } = route.params;
  const isFocused = useIsFocused();
  const refVideo = useRef(null);
  const refScrollView = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    const backAction = async () => {
      if (Dimensions.get("window").width > Dimensions.get("window").height) {
        setInFullsreen(!inFullscreen);
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.DEFAULT
        );
        navigation.setOptions({
          tabBarStyle: {
            position: "absolute",
            display: "flex",
            borderRadius: 20,
            marginBottom: 10,
            marginHorizontal: 10,
            paddingTop: 5,
            paddingBottom: 3,
          },
        });
      } else {
        navigation.goBack();
      }
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    if (!isFocused) {
      backHandler.remove();
    }
    return () => backHandler.remove();
  }, []);
  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: {
        position: "absolute",
        display: "flex",
        borderRadius: 20,
        marginBottom: 10,
        marginHorizontal: 10,
        paddingTop: 5,
        paddingBottom: 3,
      },
    });
  }, []);

  return (
    <SafeAreaView style={tw.style("bg-white flex h-full")}>
      {!inFullscreen && <LiveScreenHeader />}
      <ScrollView
        scrollEnabled={!inFullscreen}
        ref={refScrollView}
        onContentSizeChange={() => {
          if (inFullscreen) {
            refScrollView.current.scrollToEnd({ animated: true });
          }
        }}
        style={tw.style("bg-white flex h-full")}
        contentContainerStyle={tw.style("flex justify-center items-center")}
      >
        {videoError ? (
          <Image
            source={{
              uri: "https://forums.opera.com/assets/uploads/files/1576932927254-capture.png",
            }}
            className="w-full h-60"
          />
        ) : (
          <VideoPlayer
            videoProps={{
              shouldPlay: isFocused,
              resizeMode: ResizeMode.CONTAIN,
              source: {
                uri: event.liveStreamLink,
              },
              isMuted: !isMute,
              ref: refVideo,
              onError: () => setVideoError(true),
            }}
            mute={{
              enterMute: () => setIsMute(true),
              exitMute: () => setIsMute(false),
              isMute,
              visible: true,
            }}
            fullscreen={{
              enterFullscreen: async () => {
                setInFullsreen(!inFullscreen);
                await ScreenOrientation.lockAsync(
                  ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
                );
                refVideo.current.setStatusAsync({
                  shouldPlay: true,
                });
                navigation.setOptions({
                  tabBarStyle: {
                    position: "absolute",
                    display: "none",
                    borderRadius: 20,
                    marginBottom: 10,
                    marginHorizontal: 10,
                    paddingTop: 5,
                    paddingBottom: 3,
                  },
                });
              },
              exitFullscreen: async () => {
                setInFullsreen(!inFullscreen);
                await ScreenOrientation.lockAsync(
                  ScreenOrientation.OrientationLock.DEFAULT
                );
                navigation.setOptions({
                  tabBarStyle: {
                    position: "absolute",
                    display: "flex",
                    borderRadius: 20,
                    marginBottom: 10,
                    marginHorizontal: 10,
                    paddingTop: 5,
                    paddingBottom: 3,
                  },
                });
              },
              inFullscreen,
            }}
            style={{
              videoBackgroundColor: "black",
              height: inFullscreen ? Dimensions.get("window").width : 230,
              width: inFullscreen ? Dimensions.get("window").height : 420,
            }}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default LiveStreamScreen;
