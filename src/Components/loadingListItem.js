import tw from "twrnc";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {
  Surface,
  Button,
  Badge,
  Pressable,
  Avatar,
  Divider,
} from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Skeleton } from "@rneui/themed";
import { Text, View } from "react-native";

const LoadingListItem = ({ event, loading }) => {
  return (
    <View
      style={tw.style(
        "w-full rounded-2xl flex flex-col justify-between my-1 mt-2 bg-white shadow-md overflow-hidden"
      )}
    >
      <View>
        <View className="flex flex-row justify-between">
          <View className="flex flex-row">
            <View className="flex flex-row my-auto">
              <Skeleton
                animation="wave"
                width={130}
                height={130}
                style={tw.style("bg-gray-200")}
              />
              <View className="flex flex-col ml-3">
                <View className="flex flex-col mt-2 py-3">
                  <View className="flex flex-row">
                    <Skeleton
                      animation="wave"
                      width={90}
                      height={20}
                      style={tw.style("rounded-md ml-1 bg-gray-200")}
                    />
                  </View>
                  <View className="flex flex-row mt-2">
                    <Skeleton
                      animation="wave"
                      width={90}
                      height={20}
                      style={tw.style("rounded-md ml-1 bg-gray-200")}
                    />
                  </View>
                  <View className="flex flex-row mt-2">
                    <Skeleton
                      animation="wave"
                      width={90}
                      height={20}
                      style={tw.style("rounded-md ml-1 bg-gray-200")}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View className="my-auto px-3">
            <Skeleton
              animation="wave"
              width={50}
              height={20}
              style={tw.style("rounded-md my-3 bg-gray-200")}
            />
            <Skeleton
              animation="wave"
              width={50}
              height={20}
              style={tw.style("rounded-md my-3 bg-gray-200")}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default LoadingListItem;
