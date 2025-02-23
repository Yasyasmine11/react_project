import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackNavigator from "./HomeStackNavigator";
import CartStackNavigator from "./CartStackNavigator";
import SearchStackNavigator from "./SearchStackNavigator";
import FavorisStackNavigator from "./FavorisStackNavigator";
import AuthStackNavigator from "./AuthStackNavigator";

const Tab = createBottomTabNavigator();

const RootTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused
              ? "beer" : "beer";

          } else if (route.name === "Settings") {
            iconName = focused ? "list" : "list-outline";
          } else if (route.name === "Cart") {
            iconName = focused ? "cart" : "cart-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search";;
          } else if (route.name === "Favoris") {
            iconName = focused ? "heart" : "heart-outline";
          } else if (route.name === "Profile") {  // Nouvel icône
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#A5BB80",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarLabel: () => null,
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Search" component={SearchStackNavigator} />
      <Tab.Screen name="Favoris" component={FavorisStackNavigator} />
      <Tab.Screen name="Cart" component={CartStackNavigator} />
      <Tab.Screen 
  name="Profile" 
  component={AuthStackNavigator}
  options={{
    tabBarIcon: ({ focused, color, size }) => (
      <Ionicons 
        name={focused ? "person" : "person-outline"} 
        size={size} 
        color={color} 
      />
    ),
  }}
/>
    </Tab.Navigator>
  );
};

export default RootTabNavigator;

