import React, { useEffect, useState, useRef} from 'react';
import { View,
   Image,
  BackHandler,
  Dimensions,
  Modal,
  StyleSheet,
  Animated,
  Platform,
  TouchableOpacity,
  ImageBackground,
 ScrollView,
  StatusBar,
  RefreshControl,
  Linking,
  Text,
  } from 'react-native';

//ICONS//
  import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';


//MAP //
import MapboxGL from '@react-native-mapbox-gl/maps';


//SOURCES//
import { Indicator } from './includes/indicator';
import { SliderHeader } from './includes/sliderHeader';
import { styles } from './includes/style';



// REDUX & ACTIONS //
import { useSelector, useDispatch } from 'react-redux';
import { getfaves, addfavemark, removefavemark } from '../redux/actions';



const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

MapboxGL.setAccessToken('sk.eyJ1IjoiYWVkZWUiLCJhIjoiY2t1andhYnl0MXVneDMybnZpZmF1a2x3eSJ9.NR787DMgXRbCf0f9GfoYGg');

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height
const Os = Platform.OS

//----------START-------------//
 const Details = ({navigation, route,
    showHeader = false,
    previewImageContainerStyle={},
    previewImageStyle={},
    caroselImageStyle={},
    caroselImageContainerStyle={},
    timer=2000,
    autoPlay=false,
    showIndicator=true,
    activeIndicatorStyle={},
    inActiveIndicatorStyle={},
    indicatorContainerStyle={},
    onItemChanged=(itemData) => {},
    localImg= false,
    onClick=null,
    children,
    closeIconColor="#000",
    blurRadius=50
}) => {


//THIS CONSTANTS ARE FORE HEADER IMAGES//

    const itemData = route.params.itemData;
    const [data]  = useState([
      {img: itemData.profile},
      {img: itemData.pic1},
      {img: itemData.pic2},
      {img: itemData.pic3},
      {img: itemData.pic4},
     ]);
    const scrollX = React.useRef(new Animated.Value(0)).current
    const imageW = width * 0.7;
    const imageH = imageW * 1.54;
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [imageViewer, setImageViewer] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)
    const slider = useRef(null)

    const onViewRef = React.useRef(({viewableItems})=> {
        // Use viewable items in state or as intended
        if(viewableItems.length > 0) {
            let index = viewableItems[0].index
            onItemChanged(viewableItems[0].item)
            setSelectedIndex(index)
        }
    })
    const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 })

    useEffect(() => {
        if(autoPlay) {
            startAutoPlay()
        }
    }, []);

    useEffect(() => {
        if(!imageViewer) {
            if(autoPlay) {
                startAutoPlay()
            }
        }
    }, [currentIndex, imageViewer]);

    const changeSliderListIndex = () => {
        if (slider.current) {
            if(currentIndex == data.length - 1) {
                setCurrentIndex(0)
                slider.current.scrollToIndex({
                    index: currentIndex,
                    animated: true,
                  });
            }else {
                setCurrentIndex(currentIndex+1)
                slider.current.scrollToIndex({
                  index: currentIndex,
                  animated: true,
                });
            }
        }
      };

    const startAutoPlay = () => {
        if(!imageViewer) {
            setTimeout(() => {
                changeSliderListIndex()
            }, timer)
        }
      };

//END OF CONSTANTS of HEADER IMAGES//


//----COORDINATES FOR MAP----//

        const [coordinates] = useState([itemData.coords_east, itemData.coords_north]);

//-----------END------------//



 //-----ADD TO FAVORITES----//

        const { faves, favemarks } = useSelector(state => state.favesReducer);
        const dispatch = useDispatch();
      
        const addTofavemarkList = fave => dispatch(addfavemark(fave));
        const removeFromfavemarkList = fave => dispatch(removefavemark(fave));
      
        const [refreshing, setRefreshing] = React.useState(false);
      
        const handleAddfavemark = fave => {
          addTofavemarkList(fave);
        };
      
        const handleRemovefavemark = fave => {
          removeFromfavemarkList(fave);
        };
      
      
        const ifExists = fave => {
          if (favemarks.filter(itemData => itemData.name === fave.name).length > 0) {
            return true;
          }
      
          return false;
        };
   //-----------END-------------//    
        

   //------REFRESH PAGE--------//
        const onRefresh = React.useCallback(() => {
          setRefreshing(true);
          wait(2000).then(() => setRefreshing(false));
        }, []);

   //----------END------------//    
     

//IMAGE PREVIEW//
   const previewImage = () => {
    return (
           <Modal
              visible={imageViewer}
              onDismiss={() => setImageViewer(!imageViewer)}
              onRequestClose={() => setImageViewer(!imageViewer)}
            >
              <View style={StyleSheet.absoluteFillObject}>
                {data.map((val, ind) => {
                  const inputRange = [
                    (ind - 1) * width,
                     ind * width,
                     (ind + 1) * width,
                            ]
                  const opacity = scrollX.interpolate({
                      inputRange,
                      outputRange: [0, 1, 0]
                            })

                  return (
                          <Animated.Image 
                            key={`image-${ind}`}
                              source={localImg ? val.img : {uri: val.img}}
                              style={[StyleSheet.absoluteFillObject, {opacity}]}
                              blurRadius={blurRadius}
                            />
                          )
                      })}
                </View>
                    
                    <Animated.FlatList 
                        data={data}
                        keyExtractor={(_, index) => index.toString()}
                        onScroll={Animated.event(
                            [{nativeEvent: {contentOffset: {x: scrollX}}}],
                            {useNativeDriver: true}
                        )}
                        ListEmptyComponent
                        horizontal
                        pagingEnabled
                        initialScrollIndex={selectedIndex}  
                        pinchGestureEnabled={true}
                        onScrollToIndexFailed={info => {
                            const wait = new Promise(resolve => setTimeout(resolve, 500));
                            wait.then(() => {
                                slider.current?.scrollToIndex({ index: info.index, animated: true });
                            });
                        }}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item, index}) => { 
                          return (
                                <View
                                style={[styles.previewImageContainerStyle, previewImageContainerStyle]}>
                                    <TouchableOpacity onPress={() => {                                            
                                            setSelectedIndex(index)
                                            setImageViewer(!imageViewer)
                                        }} style={{position:'absolute', top: Os == "ios" ? 30 : 5 , left: 5}}>
                                        <Icon onPress={() => setImageViewer(!imageViewer)} name="close" size={34} color={closeIconColor} />
                                    </TouchableOpacity>
                                    <Image 
                                        source={localImg ? item.img : {uri: item.img}}
                                        style={[styles.previewImageStyle, previewImageStyle]}
                                    />
                                </View>
                            )
                        }}
                    /> 
          </Modal>
        )
    }


    return(

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            backgroundColor: 'white',
            paddingBottom: 20,
        }} 
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >
  
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="rgba(0,0,0,0)"
        />
 {/*----Heading Image/ Slideshow-------*/}
        <View>
            {imageViewer && previewImage()}
            <Animated.FlatList 
                ref={slider}
                data={data}
                keyExtractor={(_, index) => index.toString()}
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {x: scrollX}}}],
                    {useNativeDriver: true}
                )}
                horizontal
                pagingEnabled
                snapToInterval={width}
                decelerationRate="fast"
                pinchGestureEnabled={true}
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={onViewRef.current}
                viewabilityConfig={viewConfigRef.current}
                initialScrollIndex={selectedIndex}  
                onScrollToIndexFailed={info => {
                    const wait = new Promise(resolve => setTimeout(resolve, 500));
                    wait.then(() => {
                    flatList.current?.scrollToIndex({ index: info.index, animated: true });
                    });
                }}
                renderItem={({item, index}) => {
                    return (
                        <View style={[caroselImageContainerStyle]}>
                            <TouchableOpacity
                              activeOpacity={.9}
                              onPress={() => {
                                if(onClick) {
                                    onClick(item, index)
                                }
                                else {
                                    setSelectedIndex(index)
                                    setImageViewer(!imageViewer)
                                }
                            }}>    

                            <ImageBackground
                                    source={localImg ? item.img : {uri: item.img}}
                                    style={[styles.caroselImageStyle, caroselImageStyle]}>

                              {/*BACK BUTTON*/}
                              <View style={style.header}>
                                    <Ionicons
                                      name="chevron-back-outline"
                                      size={30}
                                      color={'white'}
                                      onPress={navigation.goBack}
                                />

                                  <Text style={{color:'black',backgroundColor:'white', padding:5}}>
                                      {itemData.class}
                                  </Text>
                              </View>           
                            </ImageBackground>
                          </TouchableOpacity>
                            
                            {children}
                        </View>
                    )
                }}
            /> 


            <View style={{flex: 1, position: 'absolute', bottom: 20, alignSelf: 'center'}}>
                {showIndicator && 
                <Indicator 
                    data={data} 
                    currenIndex={selectedIndex} 
                    indicatorContainerStyle={indicatorContainerStyle}
                    activeIndicatorStyle={activeIndicatorStyle}
                    inActiveIndicatorStyle={inActiveIndicatorStyle}
                    />}
            </View>
        </View>

 {/*Add to Favorites BUTTON*/}
        <View style={style.iconContainer}>
        <TouchableOpacity
                onPress={() =>
                  ifExists(itemData)
                    ? handleRemovefavemark(itemData)
                    : handleAddfavemark(itemData)   
                }
                activeOpacity={0.7}
                style={{
                  flexDirection: 'row',
                  padding: 2,
                  backgroundColor: ifExists(itemData) ? '#F96D41' : '#2D3038',
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 40,
                  width: 40
                }}
              >
                <MaterialCommunityIcons
                  color={ifExists(itemData) ? 'white' : '#64676D'}
                  size={24}
                  name={ifExists(itemData) ? 'favemark-outline' : 'favemark'}
                />
          </TouchableOpacity>
        </View>

 {/*--------------------Detaills---------------*/}
        <View style={{marginTop: 20, paddingHorizontal: 20}}>
              <Text style={{fontWeight: 'bold', fontSize: 18, marginLeft: 2, color:'orange'}}>
              {itemData.availability} Now
              </Text>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>{itemData.name}</Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '400',
                      color: 'grey',
                      marginTop: 5,
                    }}>
                    {itemData.address}
                  </Text>

                  <View style={{marginTop: 20}}>
                    <Text style={{lineHeight: 20, color: 'grey', textAlign: 'center', fontSize:16,fontStyle:'italic',}}>
                      {itemData.slogan}
                    </Text>
                  </View>

          <View style={{marginTop: 20}}>
            <Text style={{lineHeight: 20, color: 'grey'}}>
              {itemData.description}
            </Text>
          </View> 

        </View>
        

        <View
              style={{
                marginTop: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: 20,
                alignItems: 'center',
                paddingTop:5,
                paddingBottom: 10,
              }}>

                <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                Open Hours: 
                </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: 'gray',
                      marginRight: 15,
                    }}>
                    {itemData.available_time} - {itemData.available_time2}
                  </Text>
        </View>

         {/*------ENTRANCE------*/}
        <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingLeft: 20,
              alignItems: 'center',
              paddingBottom: 30,
              borderBottomWidth: 1,borderBottomColor: '#cccccc'
          }}>

              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                Entrance Fee
              </Text>

            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: 'grey',
                marginRight: 15,
              }}>
              Php {itemData.entrance_fee}
            </Text>
        </View>

 {/*------AVAILABILITY------*/}
        <View
          style={{
            marginTop: 20,
            paddingLeft: 20,
            paddingBottom: 30,
            borderBottomWidth: 1,borderBottomColor: '#cccccc'
          }}>

              <Text style={style.infoDetailTitle}>
                Available Every:
              </Text>

          <Text
              style={{
                fontSize: 15,
                color: 'grey',
                marginRight: 15,
                flexDirection: 'row',
                lineHeight: 22,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>

                  <Ionicons
                  color="deepskyblue"
                  size={20}
                  name='checkbox'
                  />
              {itemData.available_day1}
           </Text>


            <Text
              style={{
                fontSize: 16,
                color: 'grey',
                marginRight: 15,
              }}>
                <Ionicons
                  color="deepskyblue"
                  size={20}
                  name='checkbox'
                />
              {itemData.available_day2}
            </Text>

            <Text
              style={{
                fontSize: 16,
                color: 'grey',
                marginRight: 15,
              }}>
                <Ionicons
                  color="deepskyblue"
                  size={20}
                  name='checkbox'
                />
              {itemData.available_day3}
            </Text>

            <Text
              style={{
                fontSize: 16,
                color: 'grey',
                marginRight: 15,
              }}>
                <Ionicons
                  color="deepskyblue"
                  size={20}
                  name='checkbox'
                />
              {itemData.available_day4}
            </Text>

            <Text
              style={{
                fontSize: 16,
                color: 'grey',
                marginRight: 15,
              }}>
                <Ionicons
                  color="deepskyblue"
                  size={20}
                  name='checkbox'
                />
              {itemData.available_day5}
            </Text>

            <Text
              style={{
                fontSize: 16,
                color: 'grey',
                marginRight: 15,
              }}>
                <Ionicons
                  color="deepskyblue"
                  size={20}
                  name='checkbox'
                />
              {itemData.available_day6}
            </Text>

            <Text
              style={{
                fontSize: 16,
                color: 'grey',
                marginRight: 15,
              }}>
                <Ionicons
                  color="deepskyblue"
                  size={20}
                  name='checkbox'
                 />
              {itemData.available_day7}
            </Text>
     </View>

      <View
         style={{
          marginTop: 20,
          paddingLeft: 20,
          paddingBottom: 30,
          borderBottomWidth: 1,borderBottomColor: '#cccccc'
      }}>

          <Text style={style.infoDetailTitle}>
          Activities
          </Text>

          <Text
            style={style.infoDetail}>
              {itemData.activities}
                </Text>
        </View>

        <View
            style={{
            marginTop: 20,
            paddingLeft: 20,
            paddingBottom: 30,
            borderBottomWidth: 1,borderBottomColor: '#cccccc'
        }}>

            <Text style={style.infoDetailTitle}>
            Facilities
            </Text>

            <Text
             style={style.infoDetail}>
             {itemData.facilities}
            </Text>
        </View>

         <View
            style={{
            marginTop: 20,
            paddingLeft: 20,
            paddingBottom: 30,
            borderBottomWidth: 1,borderBottomColor: '#cccccc'
          }}>

           <Text style={style.infoDetailTitle}>
            Accommodation
            </Text>

            <Text
            style={style.infoDetail}>
            {itemData.accommodation}
            </Text>
          </View>

          <View
            style={{
            marginTop: 20,
            paddingLeft: 20,
            paddingBottom: 30,
            borderBottomWidth: 1,
            borderBottomColor: '#cccccc'
          }}>

{/*------LINKS/CONTACT-----------*/}

              <Text style={style.infoDetailTitle}>
                Contact Through:
              </Text>

               <Text
                style={{
                 color: 'grey',
                 marginRight: 10,
                 flexDirection: 'row',
                lineHeight: 40,
                justifyContent: 'space-between',
                alignItems:'center',
                marginBottom:10,
                 }}>
          
                  <MaterialCommunityIcons
                    color="blue"
                    size={35}
                    name='facefave'
                    style={{
                      margin:12,
                      marginRight:10,
                    }}/>
                        
                      <Text style={{color: 'blue', textDecorationLine:'underline', fontSize: 14,}}
                        onPress={() => Linking.openURL(`${itemData.social_media}`)}>
                         {itemData.social_media}
                      </Text>
                      </Text>

                      <Text
                        style={{
                          color: 'grey',
                          marginRight: 15,
                          flexDirection: 'row',
                          lineHeight: 40,
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom:10,
                        }}>
                        
                        <MaterialCommunityIcons
                            color="blue"
                            size={35}
                            name='email'
                            style={{
                              margin:12,
                            }}/>
                           
                           <Text style={{color: 'blue', textDecorationLine:'underline',fontSize: 14,}}
                               onPress={() => Linking.openURL(`mailto:${itemData.email}`)}>
                              {itemData.email}
                          </Text>
                      </Text>

                      <Text
                        style={{
                          color: 'grey',
                          marginRight: 15,
                          flexDirection: 'row',
                          lineHeight: 40,
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom:10,
                        }}>

                        <MaterialCommunityIcons
                            color="blue"
                            size={35}
                            name='phone'
                            style={{
                              margin:12,
                            }}
                          />
                             <Text style={{color: 'blue', marginBottom:15,marginLeft:10,textDecorationLine:'underline',fontSize: 14,}}
                               onPress={() => Linking.openURL(`tel:${itemData.contact}`)}>
                              {itemData.contact}
                            </Text>
                      </Text>
            </View>

 {/*------MAP------*/}
            <View
                style={{
                  marginTop: 20,
                  paddingLeft: 20,
                  paddingBottom: 30,
                  borderBottomWidth: 1,borderBottomColor: '#cccccc'
            }}>

                <Text style={style.infoDetailTitle}>
                   Map Location
                </Text>
           </View>

           <View style={style.container}>
              <MapboxGL.MapView style={style.map}>
                <MapboxGL.Camera
                  zoomLevel={12}
                  animationMode={'flyTo'}
                  animationDuration={1100}
                  centerCoordinate={coordinates}
                />
                  <MapboxGL.PointAnnotation coordinate={coordinates}>
                </MapboxGL.PointAnnotation>
              </MapboxGL.MapView>
            </View>

                <View
                style={{
                  marginTop: 20,
                  paddingLeft: 20,
                  paddingBottom: 30,
                  borderBottomWidth: 1,borderBottomColor: '#cccccc'
                }}>

                  <Text style={style.infoDetailTitle}>
                  Accreditation Number:
                  </Text>
                  <Text
                    style={{lineHeight: 20, color: 'grey',justifyContent:'center' , fontSize:16}}>
                    {itemData.accredit}
                  </Text> 
           </View>
        </ScrollView>
    )
}


const style = StyleSheet.create({
  btn: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    backgroundColor: '#cc89ff',
    marginHorizontal: 20,
    borderRadius: 10,
    elevation:3,
  },

  priceTag: {
    height: 40,
    alignItems: 'center',
    marginLeft: 40,
    paddingLeft: 20,
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    flexDirection: 'row',
  },
  iconContainer: {
    position: 'absolute',
    height: 60,
    width: 60,
    backgroundColor: 'black',
    top: 260,
    right: 20,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    height: 450,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    
  },
  header: {
    top:40,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },

  info_title:{
    fontSize: 16,
    fontWeight: 'bold',
    color: 'grey',
    marginLeft: 5,
  },

  slogan:{
    color: 'grey',
    marginRight: 15,
    lineHeight: 20, 
    color:'grey',
   justifyContent:'space-around',
 
  },

  infoDetailTitle:
  {
   fontSize: 20, 
    fontWeight: 'bold', 
    paddingBottom:10
  },
    infoDetail:{
      color: 'grey',
      marginRight: 15,
      lineHeight: 20, 
      color:'grey',
     justifyContent:'space-around'
  },

  infoDetail2:{
    color: 'grey',
    marginRight: 15,
    lineHeight: 20, 
    color:'grey',
    marginTop:15,
   justifyContent:'space-around'
},



  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    backgroundColor: 'white',
  },
  container: {
    height: 310,
      width: 360,
      backgroundColor: 'deepskyblue',
      padding: 10,
    },
    map: {
      flex: 1
    },
});


export default Details;
