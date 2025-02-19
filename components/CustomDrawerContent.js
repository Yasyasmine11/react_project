import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Image
          source={require('../assets/logo2.png')} 
          style={styles.logo}
        />
        <Text style={styles.appName}>The Cocktail Bar</Text>
        <Text style={styles.subheaderTitle}>WMD React Native</Text>

      </View>

      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff', 
    marginBottom:70
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ED7868', 
  },
  subheaderTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "gray",
  },
});

export default CustomDrawerContent;
