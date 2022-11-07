
import React, {useState, useEffect} from 'react';
import { View,FlatList, StyleSheet } from 'react-native';
import Card from '../components/components/card';
import database from '@react-native-firebase/database';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

let itemsRef = database().ref('/tourist_spots');

const PlaceList = ({navigation}) => {

     let [itemsArray, setItemsArray]  = useState([]);

     React.useEffect(() => {
      itemsRef.on('value', snapshot => {
        let item = snapshot.val();
        const items = Object.values(item);
        setItemsArray(items);
      });
    }, []);
  

    const renderItem = ({item}) => {
        return (
            <Card 
                itemData={item}
                onPress={()=> navigation.navigate('Details', {itemData: item})}
            />
        );
    };

    return (
      <View style={styles.container}>
        <FlatList 
            data={itemsArray}
            renderItem={renderItem}
            keyExtractor={item => item.TS_id}
        />
      </View>
    );
};

export default PlaceList;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    width: '90%',
    alignSelf: 'center'
  },
});
