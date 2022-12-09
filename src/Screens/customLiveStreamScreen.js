import * as ScreenOrientation from "expo-screen-orientation";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  BackHandler,
  Image,
} from "react-native";
import { ResizeMode } from "expo-av";
import { setStatusBarHidden } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import VideoPlayer from "expo-video-player";
import tw from "twrnc";
import { useIsFocused } from "@react-navigation/native";
import LiveScreenHeader from "../Components/liveStreamHeader";
import { useNavigation } from "@react-navigation/native";

const CustomLiveStreamScreen = () => {
  const [inFullscreen, setInFullsreen] = useState(false);
  const [inFullscreen2, setInFullsreen2] = useState(false);
  const [isMute, setIsMute] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const isFocused = useIsFocused();
  const refVideo = useRef(null);
  const refVideo2 = useRef(null);
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
                uri: "https://manifest.googlevideo.com/api/manifest/hls_variant/expire/1670593859/ei/4-iSY5ScJIn81wKP0pDwAw/ip/196.188.125.165/id/GEumHK0hfdo.2/source/yt_live_broadcast/requiressl/yes/hfr/1/playlist_duration/30/manifest_duration/30/maxh/4320/maudio/1/vprv/1/go/1/pacing/0/nvgoi/1/keepalive/yes/fexp/24001373%2C24007246/dover/11/itag/0/playlist_type/DVR/sparams/expire%2Cei%2Cip%2Cid%2Csource%2Crequiressl%2Chfr%2Cplaylist_duration%2Cmanifest_duration%2Cmaxh%2Cmaudio%2Cvprv%2Cgo%2Citag%2Cplaylist_type/sig/AOq0QJ8wRgIhAPT0EYAWj41w0v17t0mi6AaHqMT_BaBEVIl_hHh8AB6NAiEAiszNGccQ81_i9yqs0Ju7oy48tMRBDRcNAnlKc4WmBOg%3D/file/index.m3u8",
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

export default CustomLiveStreamScreen;
