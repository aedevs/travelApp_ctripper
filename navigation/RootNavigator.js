import React from 'react';
import {StyleSheet} from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../redux/store';

/* SCREENS*/
import Home from '../screens/Home';
import Location from '../screens/Location';
import Search from '../screens/Search';
import Favemarklist from '../screens/Favemarklist';
import Hotlines from '../screens/Hotlines';

/* ASSETS*/
import colors from '../assets/colors/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

/* BOTTOM TAB*/
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

Entypo.loadFont();
MaterialCommunityIcons.loadFont();


const Tab = createBottomTabNavigator();

const RootNavigator = () => {
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
            <Entypo name="home" size={28} color={color} />
          ),
        }}
      />

       
      <Tab.Screen
        name="Map"
        component={Location}
        options={{
        tabBarIcon: ({color}) => (
          <Entypo name="location" size={28} color={color} />
                  ),
                }}
      />

      <Tab.Screen
        name="Search"
        component={Search}
        options={{
        tabBarIcon: ({color}) => (
            <Ionicons name="search" size={31} color={color} />
                  ),
                }}
      />


      <Tab.Screen
        name="Favorites"
        component={Favemarklist}
        options={{
        tabBarIcon: ({color}) => (
          <MaterialCommunityIcons name="bookmark" size={28} color={color} />
          ),
        }}
      />


      <Tab.Screen
        name="More Info"
        component={Hotlines}
        options={{
        tabBarIcon: ({color}) => (
          <MaterialCommunityIcons name="information" size={28} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 23,
    borderTopRightRadius: 23,
    paddingTop:5,
  },
});


const TabNavigator = () => {
  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RootNavigator />
    </PersistGate>
  </Provider>
  );
};
 


export default TabNavigator;
