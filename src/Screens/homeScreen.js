import { View, Text, SafeAreaView, ScrollView, Dimensions } from "react-native";
import React, { useRef, useEffect, useState } from "react";
import tw from "twrnc";
import HomeScreenHeader from "../Components/homeScreenHeader";
import { Chip } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Carousel from "react-native-snap-carousel";
import BannerSlider from "../Components/bannerSlider";
import EventListItem from "../Components/eventListItem";
import RBSheet from "react-native-raw-bottom-sheet";
import Filter from "../Components/filter";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../Actions/userActions";
import LoadingListItem from "../Components/loadingListItem";
import { RefreshControl } from "react-native";
import { emptyErrors } from "../Actions/auth";
import Toast from "react-native-fast-toast";

export const windowWidth = Dimensions.get("window").width;
export const windowHeight = Dimensions.get("window").height;

const renderBanner = ({ item, index }) => {
  return <BannerSlider data={item} />;
};

const HomeScreen = ({ navigation }) => {
  const errors = useSelector((state) => state.errors);
  const { isAuthenticated, loading, events } = useSelector(
    (state) => state.data
  );
  const refRBSheet = useRef();
  const scrollView = useRef(null);
  const dispatch = useDispatch();
  const [dateSort, setDateSort] = useState(true);
  const [filter, setFilter] = useState(null);
  const toast = useRef(null);
  const [mainEvents, setMainEvents] = useState(events);
  useEffect(() => {
    const scrollToTop = navigation.addListener("tabPress", (e) => {
      scrollView.current.scrollTo({ x: 5, y: 5, animated: true });
    });
  }, []);
  useEffect(() => {
    if (!isAuthenticated) {
      navigation.navigate("First");
      navigation.reset({
        index: 0,
        routes: [{ name: "First" }],
      });
    }
  }, [isAuthenticated]);
  useEffect(() => {
    if (!events.length) {
      dispatch(getEvents());
    }
  }, []);
  useEffect(() => {
    setMainEvents(events);
  }, [events]);
  useEffect(() => {
    if (Object.keys(errors).length !== 0) {
      if (errors.connection || errors.unkown) {
        toast.current.show("Connection problem. Please try again", {
          icon: <Icon name="alert-circle-outline" size={20} color="white" />,
          placement: "bottom",
          type: "danger",
          duration: 5000,
          style: { marginBottom: 50 },
          textStyle: { padding: 0 },
        });
      }
      setTimeout(() => {
        dispatch(emptyErrors());
      }, 8000);
    }
  }, [errors]);
  useEffect(() => {
    let tempEvents = [];
    if (filter && filter.types.length) {
      setMainEvents([]);
      events.filter((event) => {
        if (
          filter.types.indexOf(event.type) !== -1 &&
          parseInt(event.price) >= filter.minPrice &&
          parseInt(event.price) <= filter.maxPrice
        ) {
          tempEvents.unshift(event);
        }
      });
      setMainEvents(tempEvents);
    } else if (filter) {
      setMainEvents([]);
      events.filter((event) => {
        if (
          parseInt(event.price) >= filter.minPrice &&
          parseInt(event.price) <= filter.maxPrice
        ) {
          tempEvents.unshift(event);
        }
      });
      setMainEvents(tempEvents);
    }
  }, [filter]);
  function comparePrice(a, b) {
    return a.price - b.price;
  }
  function compareDate(a, b) {
    return a.dateTime - b.dateTime;
  }
  useEffect(() => {
    setMainEvents([]);
    setMainEvents(events);
    mainEvents.map((event) => {
      event.price = parseInt(event.price);
      event.dateTime = parseInt(event.dateTime);
    });
    mainEvents.sort(compareDate);
    console.log(mainEvents);
  }, []);
  useEffect(() => {
    if (dateSort) {
      mainEvents.sort(compareDate);
    } else {
      mainEvents.sort(comparePrice);
    }
  }, [dateSort]);
  return (
    <SafeAreaView className="w-full h-full bg-gray-100">
      <HomeScreenHeader />
      <Toast ref={toast} swipeEnabled={true} />
      <ScrollView
        className="w-full p-3 bg-transparent"
        scrollsToTop={true}
        ref={scrollView}
      >
        <View
          style={tw.style(
            "mx-auto p-3 w-full flex justify-center items-center"
          )}
        >
          <Carousel
            data={events.filter((event) => event.id < 10)}
            renderItem={renderBanner}
            sliderWidth={windowWidth - 20}
            itemWidth={300}
            loop
            enableSnap
            useScrollView
            autoplay
            autoplayInterval={5000}
          />
        </View>
        <View className="w-full flex flex-row justify-between px-3 pt-3">
          <Text className="text-2xl text-gray-700 font-bold">
            Upcoming Events
          </Text>
          <Chip
            variant="filled"
            label="Sort"
            style={tw.style("bg-white mx-2")}
            trailing={(props) => (
              <Icon
                name={
                  dateSort
                    ? "sort-numeric-descending"
                    : "sort-clock-ascending-outline"
                }
                {...props}
              />
            )}
            labelStyle={tw.style("text-black")}
            onPress={() => setDateSort(!dateSort)}
          />
          <Chip
            variant={filter ? "filled" : "outlined"}
            label="Filter"
            style={tw.style(filter && "bg-white")}
            trailing={(props) => <Icon name="chevron-down" {...props} />}
            labelStyle={tw.style("text-black")}
            onPress={() => refRBSheet.current.open()}
          />
        </View>
        <ScrollView
          className="w-full pb-6"
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => {
                dispatch(getEvents());
              }}
            />
          }
        >
          {loading ? (
            <LoadingFunc />
          ) : (
            mainEvents.map((event, index) => {
              return <EventListItem event={event} key={index} />;
            })
          )}
        </ScrollView>
      </ScrollView>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: "#6e6d6d23",
          },
          draggableIcon: {
            backgroundColor: "#948d8d",
          },
          container: {
            borderRadius: 30,
            elevation: 50,
          },
        }}
        height={350}
      >
        <Filter filter={filter} setFilter={setFilter} />
      </RBSheet>
    </SafeAreaView>
  );
};

const LoadingFunc = () => {
  let i = [1, 2, 3, 4, 5, 6];
  return (
    <>
      {i.map((i) => {
        return <LoadingListItem key={i} />;
      })}
    </>
  );
};
export default HomeScreen;
