import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { removefavemark } from '../redux/actions';

export default function Favlist({navigation}) {
  const { favemarks } = useSelector(state => state.favesReducer);
  const dispatch = useDispatch();

  const removeFromfavemarkList = spot => dispatch(removefavemark(fave));

  const handleRemovefavemark = spot => {
    removeFromfavemarkList(spot);
  };

  const renderItem = ({ item }) => {
    return (
   
      <TouchableOpacity
      onPress={()=> navigation.navigate('Details', {itemData: item})}>
      <View style={{ marginVertical: 12 }}>
        <View style={{ flexDirection: 'row', flex: 1 }}>
           <Image
            source={{ uri: item.profile }}
            resizeMode='cover'
            style={{ width: 100, height: 150, borderRadius: 10 }}
            />
        
            <View style={{ flex: 1, marginLeft: 12 }}>
                <View>
                    <Text style={{ fontSize: 20, paddingRight: 16, color: '#64676D' }}>
                          {item.name}
                    </Text>
                </View>
                        
                  <View
                    style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    alignItems: 'center'
                    }}>
                    
                      <MaterialCommunityIcons
                      color='#64676D'
                      name='map-marker'
                      size={20}
                      />

                        <Text style={{ fontSize: 12, paddingLeft: 10, color: '#64676D' }}>
                          {item.address}
                        </Text>
                    </View>

 {/*------ Buttons----- */}
                            
                    <View style={{ marginTop: 14 }}>
                        <TouchableOpacity
                          onPress={() => handleRemovefavemark(item.name)}
                          activeOpacity={0.7}
                          style={{
                          flexDirection: 'row',
                          padding: 2,
                          backgroundColor: 'white',
                          borderRadius: 20,
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: 35,
                          width: 35
                          }}>

                         <MaterialCommunityIcons
                           color='#D22B2B'
                           size={30}
                           name='favemark-remove'
                          />
                       </TouchableOpacity>
                    </View>
              </View>
        </View>
      </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <Text style={{ color: 'white', fontSize: 22 }}>Favorites</Text>
        <View style={{ flex: 1, marginTop: 8 }}>
          {favemarks.length === 0 ? (
            <Text style={{ color: '#64676D', fontSize: 18 }}>
              Your favorites are here.
            </Text>
          ) : (
            <FlatList
              data={favemarks}
              keyExtractor={item => item.name.toString()}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
            />
          )}
      </View>
    </View>
  </SafeAreaView>
  );
}