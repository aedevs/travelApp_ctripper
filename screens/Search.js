import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
    ScrollView,
} from 'react-native';
import Card from '../components/components/card';
import {SearchBar} from 'react-native-elements';
import database from '@react-native-firebase/database';


const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
let itemsRef = database().ref('/tourist_spots').orderByChild('name');

const Search = ({navigation}) => {

  const [refreshing, setRefreshing] = React.useState(false);
  
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
 
  const [search, setSearch] = useState('');
  const [itemsArray, setItemsArray] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  React.useEffect(() => {
	itemsRef.on('value', snapshot => {
	  let item = snapshot.val();
	  const items = Object.values(item);
	  setItemsArray(items);
	  setMasterDataSource(items);

	});
  }, []);


  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
		
        
        const itemData = item.name
          ? item.name.toUpperCase()
          : ''.toUpperCase();

          
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;

      });
      setItemsArray(newData);
      setSearch(text);
    } 
    else {
      setItemsArray(masterDataSource);
      setSearch(text);
    }
  };

  const renderItem = ({item}) => {
	return (
		<Card 
			itemData={item}
			onPress={()=> navigation.navigate('Details', {itemData: item})}
		/>
	);
};



  return (
    <ScrollView
    refreshControl={
     <RefreshControl
       refreshing={refreshing}
       onRefresh={onRefresh}
     />
   }>
    <SafeAreaView style={{flex: 1, marginTop:10,}} >
		  <SearchBar
          round
          searchIcon={{size: 24}}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction('')}
          placeholder="Search here..."
          value={search}
		  platform={Platform.OS}
        />

      <View style={styles.container}>
      
        <FlatList
          data={itemsArray}
          keyExtractor={(item, index) => index.toString()}
         
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({

    container: {
      marginTop:5,
		flex: 1, 
		width: '90%',
		alignSelf: 'center',
  },
  itemStyle: {
    padding: 10,
  },
});

export default Search;