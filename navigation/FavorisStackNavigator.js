import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screenOptions } from "../theme/styles";
import FavorisScreen from "../screens/FavorisScreen";
import { View, Text, StyleSheet, Image } from "react-native";
import DetailsScreen from "../screens/DetailsScreen";

const FavorisStack = createNativeStackNavigator();

const FavorisStackNavigator = () => {

  return (
    <FavorisStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <FavorisStack.Screen name="Favoris" component={FavorisScreen} />
      <FavorisStack.Screen name="Details" component={DetailsScreen} />
    </FavorisStack.Navigator>
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
    color:"gray",
    marginLeft:40,
    marginBottom:10
  },
});

export default FavorisStackNavigator;