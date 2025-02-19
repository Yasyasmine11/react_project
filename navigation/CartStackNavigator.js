import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screenOptions } from "../theme/styles";
import CartScreen from "../screens/CartScreen";
import { View, Text, StyleSheet, Image } from "react-native";
const CartStack = createNativeStackNavigator();

const CartStackNavigator = () => {
 
  return (
    <CartStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <CartStack.Screen name="Cart" component={CartScreen} />
    </CartStack.Navigator>
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
export default CartStackNavigator;
