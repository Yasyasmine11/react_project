import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import DetailsScreen from "../screens/DetailsScreen";
import { screenOptions } from "../theme/styles";
import { View, Text, Image, StyleSheet } from "react-native";

const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
    </HomeStack.Navigator>
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
  titleContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ED7868"

  },
  subheaderTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "gray",
    marginLeft: 40,
    marginBottom: 10
  },
});
export default HomeStackNavigator;

