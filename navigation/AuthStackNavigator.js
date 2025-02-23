import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/login";
import RegisterScreen from "../screens/auth/register";
import { View, Text, StyleSheet } from "react-native";

const AuthStack = createNativeStackNavigator();

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <AuthStack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{
          title: 'Connexion'
        }}
      />
      <AuthStack.Screen 
        name="Register" 
        component={RegisterScreen} 
        options={{
          title: 'Inscription'
        }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;