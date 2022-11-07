import React, { useEffect,useState } from 'react';
import {Text,View,FlatList,TouchableOpacity,Image,SafeAreaView } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { getfaves, addfavemark, removefavemark } from '../redux/actions';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import database from '@react-native-firebase/database';

let itemsRef = database().ref('/tourist_spots');

export default function favesList() {
  const { faves, favemarks } = useSelector(state => state.favesReducer);
  const dispatch = useDispatch();

  const fetchfaves = () => dispatch(getfaves());
  const addTofavemarkList = fave => dispatch(addfavemark(fave));
  const removeFromfavemarkList = fave => dispatch(removefavemark(fave));

  const [itemsArray, setItemsArray] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(() => {
    itemsRef.on('value', snapshot => {
      let item = snapshot.val();
      const items = Object.values(item);
      setItemsArray(items);
    });
  }, []);


  const handleAddfavemark = fave => {
    addTofavemarkList(fave);
  };

  const handleRemovefavemark = fave => {
    removeFromfavemarkList(fave);
  };


  const ifExists = fave => {
    if (favemarks.filter(item => item.id === fave.id).length > 0) {
      return true;
    }

    return false;
  };



  const renderItem = ({ item }) => {
    return (
      <View style={{ marginVertical: 12 }}>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          {/* fave Cover */}
          <Image
            source={{ uri: item.profile }}
            resizeMode='cover'
            style={{ width: 100, height: 150, borderRadius: 10 }}
          />
          {/* fave Metadata */}
          <View style={{ flex: 1, marginLeft: 12 }}>
            {/* fave Title */}
            <View>
              <Text style={{ fontSize: 22, paddingRight: 16, color: 'white' }}>
                {item.name}
              </Text>
            </View>
            {/* Meta info */}
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                alignItems: 'center'
              }}
            >
              <MaterialCommunityIcons
                color='#64676D'
                name='fave-open-page-variant'
                size={20}
              />
              <Text style={{ fontSize: 14, paddingLeft: 10, color: '#64676D' }}>
                {item.num_pages}
              </Text>
              <MaterialCommunityIcons
                color='#64676D'
                name='star'
                size={20}
                style={{ paddingLeft: 16 }}
              />
              <Text style={{ fontSize: 14, paddingLeft: 10, color: '#64676D' }}>
                {item.rating}
              </Text>
            </View>
            {/* Buttons */}
            <View style={{ marginTop: 14 }}>
              <TouchableOpacity
                onPress={() =>
                  ifExists(item)
                    ? handleRemovefavemark(item)
                    : handleAddfavemark(item)
                }
                activeOpacity={0.7}
                style={{
                  flexDirection: 'row',
                  padding: 2,
                  backgroundColor: ifExists(item) ? '#F96D41' : '#2D3038',
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 40,
                  width: 40
                }}
              >
                <MaterialCommunityIcons
                  color={ifExists(item) ? 'white' : '#64676D'}
                  size={24}
                  name={ifExists(item) ? 'favemark-outline' : 'favemark'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1E1B26' }}>
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <Text style={{ color: 'white', fontSize: 22 }}>Bestsellers</Text>
        <View style={{ flex: 1, marginTop: 8 }}>
          <FlatList
            data={itemsArray}
            keyExtractor={(item) => item.key}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}