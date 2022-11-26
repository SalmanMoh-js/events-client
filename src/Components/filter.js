import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import AntDesign from "react-native-vector-icons/AntDesign";
import Octicons from "react-native-vector-icons/Octicons";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import { Button, Chip } from "@react-native-material/core";
import { Button as PaperButton } from "react-native-paper";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

const Filter = () => {
  const [filterOptions, setFilterOptions] = useState({
    selectedOption: "type",
    minPrice: 0,
    maxPrice: 1000,
    types: [
      "Exhibition",
      "Sport",
      "Party",
      "Concert",
      "Auction",
      "Cinema",
      "Comedy",
      "Religious",
    ],
  });
  const [filteredOptions, setFilteredOptions] = useState({
    selectedOption: "type",
    minPrice: 0,
    maxPrice: 900,
    types: [],
  });
  return (
    <View className="w-full h-full flex flex-col mt-6">
      <View className="w-full pt-2 bg-gray-200 flex flex-row">
        <Button
          title="Category"
          variant="text"
          style={tw.style(
            filterOptions.selectedOption === "type" && "bg-white"
          )}
          titleStyle={tw.style("text-black text-xs")}
          onPress={() =>
            setFilterOptions({
              ...filterOptions,
              selectedOption: "type",
            })
          }
        />
        <Button
          title="Price"
          variant="text"
          style={tw.style(
            filterOptions.selectedOption === "price" && "bg-white"
          )}
          titleStyle={tw.style("text-black")}
          onPress={() =>
            setFilterOptions({
              ...filterOptions,
              selectedOption: "price",
            })
          }
        />
      </View>
      <View className="w-full flex justify-center items-center bg-white p-3">
        {filterOptions.selectedOption === "type" ? (
          <>
            <View className="w-full flex flex-col justify-start my-1 pl-8">
              <Text className="text-base font-bold text-gray-500">
                Filter by category
              </Text>
            </View>
            <FlatList
              data={filterOptions.types}
              numColumns={3}
              keyExtractor={(item, index) => index}
              renderItem={({ item }) => (
                <Chip
                  label={item}
                  style={tw.style("m-1")}
                  labelStyle={tw.style("text-base")}
                  variant={
                    filteredOptions.types.indexOf(item) !== -1
                      ? "filled"
                      : "outlined"
                  }
                  trailing={(props) => (
                    <Icon
                      name={
                        filteredOptions.types.indexOf(item) !== -1
                          ? "check"
                          : ""
                      }
                      {...props}
                    />
                  )}
                  onPress={() => {
                    if (filteredOptions.types.indexOf(item) !== -1) {
                      setFilteredOptions({
                        ...filteredOptions,
                        types: filteredOptions.types.filter(
                          (type) => type !== item
                        ),
                      });
                    } else {
                      setFilteredOptions({
                        ...filteredOptions,
                        types: [...filteredOptions.types, item],
                      });
                    }
                  }}
                />
              )}
            />
            <PaperButton
              mode="contained"
              style={tw.style("w-full mt-4 h-12")}
              contentStyle={tw.style("h-full")}
              color="#e09467"
              labelStyle={tw.style("text-lg text-white")}
              uppercase={false}
            >
              Apply
            </PaperButton>
          </>
        ) : (
          <View className="w-full flex justify-center items-center">
            <View className="w-full flex flex-col justify-start my-1 pl-8">
              <Text className="text-base font-bold text-gray-500">
                Filter by price
              </Text>
              <Text className="text-base text-gray-500">
                {filteredOptions.minPrice}ETB - {filteredOptions.maxPrice}ETB
              </Text>
            </View>
            <View className="flex flex-row mt-10">
              <MultiSlider
                values={[filteredOptions.minPrice, filteredOptions.maxPrice]}
                onValuesChange={(values) =>
                  setFilteredOptions({
                    ...filteredOptions,
                    minPrice: values[0],
                    maxPrice: values[1],
                  })
                }
                min={0}
                max={1000}
                step={100}
                isMarkersSeparated
                optionsArray={[
                  0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000,
                ]}
                snapped
                enableLabel
                trackStyle={tw.style("", {
                  height: 6,
                })}
                markerStyle={tw.style("w-6 h-6 bg-blue-400 shadow-md")}
                markerContainerStyle={tw.style("shadow-md")}
                selectedStyle={tw.style("bg-blue-400", {
                  backgroundColor: "#4577a9",
                })}
                pressedMarkerStyle={tw.style("w-8 h-8")}
                minMarkerOverlapDistance={50}
              />
            </View>
            <PaperButton
              mode="contained"
              style={tw.style("w-full mt-4 h-12")}
              contentStyle={tw.style("h-full")}
              color="#e09467"
              labelStyle={tw.style("text-lg text-white")}
              uppercase={false}
            >
              Apply
            </PaperButton>
          </View>
        )}
      </View>
    </View>
  );
};

export default Filter;
