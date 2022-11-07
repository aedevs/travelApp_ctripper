


import 'react-native-gesture-handler';
 
import * as React from 'react';

import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';


import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
 

//SCREENS//
import splashscreen from './navigation/splashscreen';
import RootNavigator from './navigation/RootNavigator';
import Details from './screens/Details';
import onBoarding from './navigation/onBoarding';



import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();
 
/* This is used for the Navigator/ Data Flow*/
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="splashscreen"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>

          <Stack.Screen
            name="splashscreen"
            component={splashscreen}
        options={{headerShown: false}}
          />

          <Stack.Screen
            name="onBoarding"
            component={onBoarding}
        options={{headerShown: false}}
          />

          <Stack.Screen
            name="RootNavigator"
            component={RootNavigator}
        options={{headerShown: false}}
          />

          <Stack.Screen
            name="Details"
            component={Details}
        options={{headerShown: false}}
          />

      </Stack.Navigator>
    </NavigationContainer>
  );
};


const App = () => {
	return (
	  <Provider store={store}>
	  <PersistGate loading={null} persistor={persistor}>
		<AppNavigator/>
	  </PersistGate>
	</Provider>
	);
  };
 
export default App;