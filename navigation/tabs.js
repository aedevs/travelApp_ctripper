import React from 'react';
import {StyleSheet} from 'react-native';

import Home from '../components/Home';
import Location from '../components/Location';
import Search from '../components/Search';
import Bookmark from '../components/Bookmark';

import colors from '../assets/colors/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

Entypo.loadFont();
MaterialCommunityIcons.loadFont();


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: styles.tabBar,
        activeTintColor: 'deepskyblue',
        inactiveTintColor: colors.gray,
      }}
      screenOptions={{
        headerShown: false
      }}>

      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color}) => (
            <Entypo name="home" size={32} color={color} />
          ),
        }}
      />

       
        <Tab.Screen
                name="Map"
                component={Location}
                options={{
                  tabBarIcon: ({color}) => (
                    <Entypo name="location" size={30} color={color} />
                  ),
                }}
              />

              <Tab.Screen
                name="Find"
                component={Search}
                options={{
                  tabBarIcon: ({color}) => (
                    <Ionicons name="search" size={31} color={color} />
                  ),
                }}
              />


      <Tab.Screen
        name="Bookmark"
        component={Bookmark}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="bookmark" size={32} color={color} />
          ),
        }}
      />


    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },
});

export default TabNavigator;
