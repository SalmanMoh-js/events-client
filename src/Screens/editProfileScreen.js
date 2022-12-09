import { View, SafeAreaView } from "react-native";
import React, { useRef } from "react";
import tw from "twrnc";
import { TextInput } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { List } from "react-native-paper";
import EditProfileHeader from "../Components/editProfileHeader";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { emptyErrors, loadUser, resetUpdate } from "../Actions/auth";
import Toast from "react-native-fast-toast";
import { useEffect } from "react";

const EditProfileScreen = ({ navigation }) => {
  const errors = useSelector((state) => state.errors);
  const { isAuthenticated, user, loading, dataUpdated } = useSelector(
    (state) => state.data
  );
  const dispatch = useDispatch();
  const [name, setName] = useState(user.name);
  const toast = useRef(null);

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
    console.log(dataUpdated);
    if (dataUpdated === "profile update") {
      toast.current.show("Profile Updated", {
        icon: <Icon name="check" size={20} color="white" />,
        placement: "bottom",
        type: "success",
        duration: 4000,
        style: { padding: 0 },
        textStyle: { padding: 0 },
      });
      dispatch(loadUser());
      setTimeout(() => {
        dispatch(resetUpdate());
      }, 5000);
    }
    if (Object.keys(errors).length !== 0) {
      if (errors.connection || errors.unknown) {
        toast.current.show("Connection problem. Please try again", {
          icon: <Icon name="alert-circle-outline" size={20} color="white" />,
          placement: "bottom",
          type: "danger",
          duration: 5000,
          style: { padding: 0 },
          textStyle: { padding: 0 },
        });
      }
      setTimeout(() => {
        dispatch(emptyErrors());
      }, 8000);
    }
  }, [dataUpdated, errors]);
  return (
    <SafeAreaView className="w-full h-full bg-white">
      <EditProfileHeader name={name} id={user.id} loading={loading} />
      <Toast ref={toast} swipeEnabled={true} />
      <View className="w-full bg-transparent h-full flex items-center">
        <View className="w-full mt-3 px-4">
          <TextInput
            label="Name"
            variant="outlined"
            style={tw.style("mt-3")}
            value={name}
            onChangeText={(e) => setName(e)}
          />
          <TextInput
            label="Email (Non-changeable)"
            variant="outlined"
            value="salmanmoh.eth@gmail.com"
            editable={false}
            style={tw.style("mt-3")}
          />
          <TextInput
            label="Phone (Non-changeable)"
            variant="outlined"
            value="+251911915279"
            editable={false}
            style={tw.style("mt-3")}
          />
          <List.Item
            title="Change Password"
            description="Change your password at anytime"
            left={(props) => (
              <List.Icon {...props} icon="lock-closed-outline" size={24} />
            )}
            style={tw.style("py-3 mt-2")}
            onPress={() => navigation.navigate("Change Password")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditProfileScreen;
