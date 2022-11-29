import { View, Text, SafeAreaView } from "react-native";
import React, { useRef } from "react";
import tw from "twrnc";
import { IconButton, TextInput } from "@react-native-material/core";
import { Button, List } from "react-native-paper";
import ChangePasswordHeader from "../Components/changePasswordHeader";
import { updatePassword } from "../Actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { emptyErrors, resetUpdate } from "../Actions/auth";
import Toast from "react-native-fast-toast";

const ChangePasswordScreen = ({ navigation }) => {
  const errors = useSelector((state) => state.errors);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const { isAuthenticated, user, dataUpdated, loading } = useSelector(
    (state) => state.data
  );
  const [newProfile, setNewProfile] = useState({
    oldPassword: "",
    password: "",
    conPassword: "",
  });
  const dispatch = useDispatch();
  const toast = useRef(null);
  function onPasswordUpdate() {
    const updatedPassword = {
      oldPassword: newProfile.oldPassword,
      newPassword: newProfile.password,
      id: user.id,
    };
    dispatch(updatePassword(updatedPassword));
  }

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.navigate("Main");
      navigation.reset({
        index: 0,
        routes: [{ name: "Main" }],
      });
    }
  }, [isAuthenticated]);
  useEffect(() => {
    console.log(dataUpdated);
    if (dataUpdated === "password update") {
      toast.current.show("Password Changed", {
        icon: <Icon name="check" size={20} color="white" />,
        placement: "bottom",
        type: "success",
        duration: 4000,
        style: { padding: 0 },
        textStyle: { padding: 0 },
      });
      navigation.goBack();
      setTimeout(() => {
        dispatch(resetUpdate());
      }, 5000);
    }
    if (Object.keys(errors).length !== 0) {
      if (errors.password) {
        toast.current.show("Password is incorrect", {
          icon: <Icon name="alert-circle-outline" size={20} color="white" />,
          placement: "bottom",
          type: "danger",
          duration: 4000,
          style: { padding: 0 },
          textStyle: { padding: 0 },
        });
      }
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
      }, 5000);
    }
  }, [dataUpdated, errors]);
  return (
    <SafeAreaView className="w-full h-full bg-white">
      <ChangePasswordHeader />
      <Toast ref={toast} swipeEnabled={true} />
      <View className="w-full bg-transparent h-full flex items-center">
        <View className="w-full mt-3 px-4">
          <TextInput
            label="Current Password"
            secureTextEntry={secureTextEntry}
            value={newProfile.oldPassword}
            onChangeText={(e) =>
              setNewProfile({
                ...newProfile,
                oldPassword: e,
              })
            }
            leading={(props) => (
              <Icon name="lock-clock" {...props} color="#4577a9" />
            )}
            trailing={(props) => (
              <>
                {secureTextEntry ? (
                  <IconButton
                    icon={(props) => (
                      <Ionicons
                        name="ios-eye-outline"
                        {...props}
                        color="#4577a9"
                      />
                    )}
                    {...props}
                    onPress={() => setSecureTextEntry(false)}
                  />
                ) : (
                  <IconButton
                    icon={(props) => (
                      <Ionicons
                        name="ios-eye-off-outline"
                        {...props}
                        color="#4577a9"
                      />
                    )}
                    {...props}
                    onPress={() => setSecureTextEntry(true)}
                  />
                )}
              </>
            )}
            variant="outlined"
            style={tw.style("mt-3")}
          />
          <TextInput
            label="New Password"
            secureTextEntry={secureTextEntry}
            value={newProfile.password}
            onChangeText={(e) =>
              setNewProfile({
                ...newProfile,
                password: e,
              })
            }
            leading={(props) => (
              <Feather name="lock" {...props} color="#4577a9" />
            )}
            trailing={(props) => (
              <>
                {secureTextEntry ? (
                  <IconButton
                    icon={(props) => (
                      <Ionicons
                        name="ios-eye-outline"
                        {...props}
                        color="#4577a9"
                      />
                    )}
                    {...props}
                    onPress={() => setSecureTextEntry(false)}
                  />
                ) : (
                  <IconButton
                    icon={(props) => (
                      <Ionicons
                        name="ios-eye-off-outline"
                        {...props}
                        color="#4577a9"
                      />
                    )}
                    {...props}
                    onPress={() => setSecureTextEntry(true)}
                  />
                )}
              </>
            )}
            variant="outlined"
            style={tw.style("mt-3")}
          />
          <TextInput
            label="Confirm Password"
            secureTextEntry={secureTextEntry}
            value={newProfile.conPassword}
            onChangeText={(e) =>
              setNewProfile({
                ...newProfile,
                conPassword: e,
              })
            }
            leading={(props) => (
              <Feather name="lock" {...props} color="#4577a9" />
            )}
            variant="outlined"
            style={tw.style("mt-3")}
          />
          <Button
            mode="contained"
            style={tw.style("w-1/2 my-3 h-12 rounded-full mx-auto")}
            labelStyle={tw.style("text-base text-white font-bold")}
            contentStyle={tw.style("h-full")}
            color="#658fdd"
            uppercase={false}
            disabled={
              !newProfile.oldPassword ||
              !newProfile.password ||
              newProfile.password !== newProfile.conPassword
            }
            onPress={onPasswordUpdate}
            loading={loading}
          >
            Update Password
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;
