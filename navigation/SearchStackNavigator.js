import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screenOptions } from "../theme/styles";
import SearchScreen from "../screens/SearchScreen";
import { View, Text, StyleSheet, Image } from "react-native";
import DetailsScreen from "../screens/DetailsScreen";
const SearchStack = createNativeStackNavigator();

const SearchStackNavigator = () => {
  
  return (
    <SearchStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <SearchStack.Screen name="Search" component={SearchScreen} />
      <SearchStack.Screen name="Details" component={DetailsScreen} />
    </SearchStack.Navigator>
  );
};


const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 30,
    height: 45,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ED7868"
  },
  titleContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  subheaderTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "gray",
    marginLeft: 40,
    marginBottom: 10
  },
});
export default SearchStackNavigator;
