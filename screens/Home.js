import React,{useState, useEffect,Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  RefreshControl,
  ImageBackground,
  Dimensions,
} from 'react-native';

import colors from '../assets/colors/colors';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import {SafeAreaView} from 'react-native-safe-area-context';
import logo from '../assets/images/logo.png';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import database from '@react-native-firebase/database';
import NetInfo from '@react-native-community/netinfo';

Feather.loadFont();
Entypo.loadFont();
const { width } = Dimensions.get('window');
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

let itemsRef = database().ref('/tourist_spots').orderByChild('name');
let category1 = database().ref('/tourist_spots').orderByChild('class').equalTo('Beach Attraction');
let category2 = database().ref('/tourist_spots').orderByChild('class').equalTo('Built Attraction');
let category3 = database().ref('/tourist_spots').orderByChild('class').equalTo('Event and Heritage Attraction');
let category4 = database().ref('/tourist_spots').orderByChild('class').equalTo('Entertainment Park');
let category5 = database().ref('/tourist_spots').orderByChild('class').equalTo('Museum and Art Gallery');


export default function List({navigation}) {

  
 // NetInfo configuration
 NetInfo.configure({
  reachabilityUrl: 'https://google.com',
  reachabilityTest: async response => response.status === 200,
  reachabilityLongTimeout: 30 * 1000, // 60s
  reachabilityShortTimeout: 5 * 1000, // 5s
  reachabilityRequestTimeout: 15 * 1000, // 15s
});
const containerStyle = {
  flex: 1,
};


// Connection State
const [isOnline, setIsOnline] = React.useState(true);
// effects
React.useEffect(() => {
  // Fetch connection status first time when app loads as listener is added afterwards
  NetInfo.fetch().then(state => {
    if (isOnline !== state.isConnected) {
      setIsOnline(!!state.isConnected && !!state.isInternetReachable);
    }
  });
}, []);


// listeners
NetInfo.addEventListener(state => {
  if (isOnline !== state.isConnected) {
    setIsOnline(!!state.isConnected && !!state.isInternetReachable);
  }
});

  const [refreshing, setRefreshing] = React.useState(false);

  const [itemsArray, setItemsArray] = React.useState([]);
  const [Cat1Array, setCat1Array] = React.useState([]);
  const [Cat2Array, setCat2Array] = React.useState([]);
  const [Cat3Array, setCat3Array] = React.useState([]);
  const [Cat4Array, setCat4Array] = React.useState([]);
  const [Cat5Array, setCat5Array] = React.useState([]);

  React.useEffect(() => {
    itemsRef.on('value', snapshot => {
      let item = snapshot.val();
      const items = Object.values(item);
      setItemsArray(items);
    });
  }, []);

  //*CATEGORIES*//
  React.useEffect(() => {
    category1.on('value', snapshot => {
      let item = snapshot.val();
      const items = Object.values(item);
      setCat1Array(items);
    });
  }, []);

  React.useEffect(() => {
    category2.on('value', snapshot => {
      let item = snapshot.val();
      const items = Object.values(item);
      setCat2Array(items);
    });
  }, []);

  React.useEffect(() => {
    category3.on('value', snapshot => {
      let item = snapshot.val();
      const items = Object.values(item);
      setCat3Array(items);
    });
  }, []);

  React.useEffect(() => {
    category4.on('value', snapshot => {
      let item = snapshot.val();
      const items = Object.values(item);
      setCat4Array(items);
    });
  }, []);

  React.useEffect(() => {
    category5.on('value', snapshot => {
      let item = snapshot.val();
      const items = Object.values(item);
      setCat5Array(items);
    });
  }, []);



  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
 


  const listItemView = (item) => {
    return (
      <TouchableOpacity
      onPress={()=> navigation.navigate('Details', {itemData: item})}>

            <ImageBackground
              key={item.key}
              source={{uri: item.profile }}
              style={[
                styles.discoverItem,
                {marginLeft: item.key === '1' ? 20 : 0},
              ]}
                 imageStyle={styles.discoverItemImage}>
                  <Text style={styles.discoverItemTitle}>{item.name}</Text>
                    <View style={styles.discoverItemLocationWrapper}>
                      <Entypo name="location-pin" size={18} color={colors.white} />
                       <Text style={styles.discoverItemLocationText}>{item.address}</Text>
                    </View>
            </ImageBackground>
      </TouchableOpacity>
    );
  };

  const listCat1View = (item) => {
    return (
      <TouchableOpacity
      onPress={()=> navigation.navigate('Details', {itemData: item})}>

              <ImageBackground
                key={item.key}
                source={{uri: item.profile }}
                style={[
                  styles.discoverCatItem,
                  {marginLeft: item.key === '1' ? 20 : 0},
                ]}
                imageStyle={styles.discoverCatItemImage}>
                    <Text style={styles.discoverCatItemTitle}>{item.name}</Text>
              </ImageBackground>  
      </TouchableOpacity>
    );
  };

  const listCat2View = (item) => {
    return (
      <TouchableOpacity
      onPress={()=> navigation.navigate('Details', {itemData: item})}>

        <ImageBackground
                  key={item.key}
                  source={{uri: item.profile }}
                  style={[
                    styles.discoverCatItem,
                    {marginLeft: item.key === '1' ? 20 : 0},
                  ]}
                  imageStyle={styles.discoverCatItemImage}>
                  <Text style={styles.discoverCatItemTitle}>{item.name}</Text>
                </ImageBackground>
              </TouchableOpacity>
    );
  };

  const listCat3View = (item) => {
    return (
      <TouchableOpacity
      onPress={()=> navigation.navigate('Details', {itemData: item})}>

          <ImageBackground
              key={item.key}
              source={{uri: item.profile }}
              style={[
                    styles.discoverCatItem,
                      {marginLeft: item.key === '1' ? 20 : 0},
                    ]}
                    imageStyle={styles.discoverCatItemImage}>
                <Text style={styles.discoverCatItemTitle}>{item.name}</Text>
          </ImageBackground>
      </TouchableOpacity>
    );
  };


  const listCat4View = (item) => {
    return (
      <TouchableOpacity
      onPress={()=> navigation.navigate('Details', {itemData: item})}>

          <ImageBackground
                key={item.key}
                source={{uri: item.profile }}
                style={[
                      styles.discoverCatItem,
                      {marginLeft: item.key === '1' ? 20 : 0},
                    ]}
                    imageStyle={styles.discoverCatItemImage}>
                <Text style={styles.discoverCatItemTitle}>{item.name}</Text>
           </ImageBackground>
      </TouchableOpacity>
    );
  };


  const listCat5View = (item) => {
    return (
      <TouchableOpacity
      onPress={()=> navigation.navigate('Details', {itemData: item})}>

        <ImageBackground
              key={item.key}
              source={{uri: item.profile }}
              style={[
                styles.discoverCatItem,
                {marginLeft: item.key === '1' ? 20 : 0},
              ]}

              imageStyle={styles.discoverCatItemImage}>
              <Text style={styles.discoverCatItemTitle}>{item.name}</Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };


//*HEADER SECTION AND DISCOVER*//
  return (
    
    <View style={styles.container}>
 
      <ScrollView
       refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>
          {/* Header */}
        <SafeAreaView>
        <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          width,
        }}>

        <Text style={{fontSize: 16, textAlign: 'center',backgroundColor: isOnline ? '#32CD32' : '#FF2400',color: '#fff', paddingLeft: isOnline ? 120 : 0,paddingRight: isOnline ? 120 : 0}}>
          {isOnline ? 'You are Online' : 'You are in Offline Mode. Connect to the internet to receive updates'}
   
        </Text>
      </View>
          <View style={styles.menuWrapper}>
          <Text style={styles.discoverTitle}>Carles Tripper     </Text>
            <Image source={logo} style={styles.logoImage} />
          </View>
        </SafeAreaView>


        {/* Discover */}
        <View style={styles.discoverWrapper}>
          <Text style={styles.discoverSubTitle}>Discover, Explore and Experience </Text>
          <View style={styles.discoverItemsWrapper}>
            <FlatList
              data={itemsArray}
              renderItem={({item}) => listItemView(item)}
              keyExtractor={(item) => item.key}
              horizontal
              showsHorizontalScrollIndicator={false}   
            />
          </View>
        </View>

        <View style={styles.discoverCatWrapper}>
          <Text style={styles.discoverCatTitle}>Categories </Text>
          <Text style={styles.discoverCatSubTitle}>Beach Attractions </Text>
          <View style={{ flex: 1, marginTop: 5 }}>
            <View style={styles.discoverCatItemsWrapper}>
            {Cat1Array.length === 0 ? (
              <Text style={{ color: 'grey', marginLeft:20, fontSize: 15 }}>
                No tourist spot found under this category.
              </Text>
            ) : (
              <FlatList
              data={Cat1Array}
              renderItem={({item}) => listCat1View(item)}
              keyExtractor={(item) => item.key}
              horizontal
              showsHorizontalScrollIndicator={false}   
            />      
            )}
            </View>
          </View>
        </View>


        <View style={styles.discoverCatWrapper}>
        <Text style={styles.discoverCatSubTitle}>Built Attractions</Text>
        <View style={{ flex: 1, marginTop: 5 }}>
            <View style={styles.discoverCatItemsWrapper}>
            {Cat2Array.length === 0 ? (
              <Text style={{ color: 'grey', marginLeft:20, fontSize: 15 }}>
                No tourist spot found under this category.
              </Text>
            ) : (
              <FlatList
              data={Cat2Array}
              renderItem={({item}) => listCat2View(item)}
              keyExtractor={(item) => item.key}
              horizontal
              showsHorizontalScrollIndicator={false}   
            />      
            )}
            </View>
          </View>
        </View>


        <View style={styles.discoverCatWrapper}>
        <Text style={styles.discoverCatSubTitle}>Event and Heritage Attractions</Text>
        <View style={{ flex: 1, marginTop: 5 }}>
            <View style={styles.discoverCatItemsWrapper}>
            {Cat3Array.length === 0 ? (
              <Text style={{ color: 'grey', marginLeft:20, fontSize: 15 }}>
                No tourist spot found under this category.
              </Text>
            ) : (
              <FlatList
              data={Cat3Array}
              renderItem={({item}) => listCat3View(item)}
              keyExtractor={(item) => item.key}
              horizontal
              showsHorizontalScrollIndicator={false}   
            />      
            )}
            </View>
          </View>
        </View>


        <View style={styles.discoverCatWrapper}>
        <Text style={styles.discoverCatSubTitle}>Entertainment Parks</Text>
        <View style={{ flex: 1, marginTop: 5 }}>
            <View style={styles.discoverCatItemsWrapper}>
            {Cat4Array.length === 0 ? (
              <Text style={{ color: 'grey', marginLeft:20, fontSize: 15 }}>
                No tourist spot found under this category.
              </Text>
            ) : (
              <FlatList
              data={Cat4Array}
              renderItem={({item}) => listCat4View(item)}
              keyExtractor={(item) => item.key}
              horizontal
              showsHorizontalScrollIndicator={false}   
            />      
            )}
            </View>
          </View>
        </View>

        <View style={styles.discoverCatWrapper}>
        <Text style={styles.discoverCatSubTitle}>Museum and Art Galleries </Text>
        <View style={{ flex: 1, marginTop: 5 }}>
            <View style={styles.discoverCatItemsWrapper}>
          
            {Cat5Array.length === 0 ? (
              <Text style={{ color: 'grey', marginLeft:20, fontSize: 15 }}>
                No tourist spot found under this category.
              </Text>
            ) : (
              <FlatList
              data={Cat5Array}
              renderItem={({item}) => listCat5View(item)}
              keyExtractor={(item) => item.key}
              horizontal
              showsHorizontalScrollIndicator={false}   
            />      
            )}
            </View>
          </View>
        </View>


      </ScrollView>
    </View>
  );
};


//STYLESHEET//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: colors.white,
  },
  menuWrapper: {
    marginHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoImage: {
    width: 52,
    height: 52,
    borderRadius: 10,
  },

  discoverWrapper: {
    // marginHorizontal: 20,
    marginTop: 20,
  },

  discoverTitle: {
    fontFamily: 'Spacemono',
    fontSize: 30,
    fontWeight:'bold',
   
  },
  
  discoverSubTitle: {
    marginHorizontal: 20,
    fontFamily: 'Lato-Bold',
    fontSize: 20,
  },



  discoverCategoriesWrapper: {
    marginHorizontal: 20,
    flexDirection: 'row',
    marginTop: 20,
  },
  discoverCategoryText: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: colors.gray,
  },

  discoverItemsWrapper: {
    paddingVertical: 20,
  },

  discoverItem: {
    width: 290,
    height:450,
    justifyContent: 'flex-end',
    paddingHorizontal: 25,
    paddingVertical: 15,
    marginRight: 20, 
  },
  discoverItemImage: {
    borderRadius: 20,
    backgroundColor:"lavender",
    marginLeft:20,
  },
  discoverItemTitle: {
    fontFamily: 'Lato-Bold',
    fontSize: 18,
    color: colors.white,
  },
  discoverItemLocationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginRight: 8,
  },
  discoverItemLocationText: {
    marginLeft: 5,
    fontFamily: 'Lato-Bold',
    fontSize: 14,
    color: colors.white,
  },

  discoverCatTitle: {
    marginHorizontal: 20,
    marginBottom:30,
    fontFamily: 'Lato-Bold',
    fontSize: 20,
  },
  discoverCatSubTitle: {
    marginHorizontal: 20,
    fontFamily: 'Lato-Bold',
    fontSize: 16,
   
  },

   discoverCatWrapper: {
    // marginHorizontal: 20,
    marginTop: 10,
  },
  
  discoverCatItemsWrapper: {
    paddingVertical: 20,
    marginBottom:10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc'
  },
  discoverCatItem: {
    width: 125,
    height:150,
    justifyContent: 'flex-end',
    paddingHorizontal: 25,
    paddingVertical: 15,
    marginRight: 20, 
  },
  discoverCatItemImage: {
    borderRadius: 20,
    backgroundColor:"lavender",
    marginLeft:20,
  },
  discoverCatItemTitle: {
    fontFamily: 'Lato-Bold',
    fontSize: 15,
    color: colors.white,
  },
  discoverItemLocationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginRight: 8,
  },
  discoverItemLocationText: {
    marginLeft: 5,
    fontFamily: 'Lato-Bold',
    fontSize: 14,
    color: colors.white,
  },
});

