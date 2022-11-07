import React from 'react';
import {
  StatusBar,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';



const OnBoardScreen = ({navigation}) => {
  return (
    <ScrollView>
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar translucent backgroundColor={'white'} />

      {/* Onboarding Image */}
      <Image
        source={require('../images/onBoard.jpg')}
        style={style.image}
      />

      {/* Title and text container */}
      <View style={{paddingHorizontal: 20, paddingTop: 20}}>
        {/* Title container */}
        <View>
          <Text style={style.title}>Find your</Text>
          <Text style={style.title}>sweet escape</Text>
        </View>

        {/* Text container */}
        <View style={{marginTop: 15}}>
          <Text style={style.textStyle}>
            Discover..Explore..Experience..
          </Text>
          <Text style={style.textStyle2}> CARLES</Text>
        </View>
      </View>

      {/* Button container */}
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          marginTop:10,
          marginBottom:15,
          paddingBottom: 40,
        }}>

        {/* button */}
        <TouchableOpacity onPress={() => navigation.navigate('RootNavigator')}>
          <View style={style.btn}>
            <Text style={{color: 'black',fontWeight:'bold',}}>Get Started</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    </ScrollView>
  );
};


const style = StyleSheet.create({
  image: {
    height: 420,
    width: '100%',
    borderBottomLeftRadius: 100,
  },
  indicatorContainer: {
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  indicator: {
    height: 3,
    width: 30,
    backgroundColor: "grey",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  indicatorActive: {
    backgroundColor: "lavender",
  },
  btn: {
    height: 60,
    marginHorizontal: 20,
    marginTop:25,
    backgroundColor: 'cyan',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  
  },
  title: {
    fontSize: 32, 
    fontWeight: 'bold'
  },

  textStyle: {
    fontSize: 16, 
    color: "grey"
  },

  textStyle2: {
    fontSize: 20,
    marginTop:5,
    marginBottom:5,
    color: "grey"
  },
});
export default OnBoardScreen;