import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import HomeView from "../views/home";
import ProfileView from "../views/profile";

const Tab = createBottomTabNavigator();

const CustomTabBarIcon = ({ iconSource, focused, name }) => {
  return (
    <View style={styles.tabIconContainer}>
      <Image source={iconSource} style={styles.tabIcon} />
      <Text
        style={[styles.tabText, { color: focused ? "#4bce98" : "#F4F4F4" }]}
      >
        {name}
      </Text>
    </View>
  );
};

const AppNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="WorkSpace"
      screenOptions={{
        headerShown: false,
        tabBarStyle: [
          {
            borderTopWidth: 1,
            borderTopColor: "#2b3036",
            backgroundColor: "#1a1a1a",
            height: 70,  
          },
          null,
        ],
      }}
    >
      <Tab.Screen
        name="WorkSpace"
        component={HomeView}
        options={{
          tabBarLabel: "", 
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon
              iconSource={require("../assets/imgs/Home.png")}
              focused={focused}
              name="Espace de travail"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profil"
        component={ProfileView}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon
              iconSource={require("../assets/imgs/Profile.png")}
              focused={focused}
              name="Profil"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabIconContainer: {
    alignItems: "center",
    justifyContent:"center"
  },
  tabIcon:{
    marginTop:12,
  },
  tabText: {
    marginTop: 6,
    fontSize: 12,
  },
});

export default AppNavigator;
