


import React, {  useState } from "react";
import { View, StyleSheet, Text,  Image, TouchableOpacity } from "react-native";
import MapboxGL from '@react-native-mapbox-gl/maps';

MapboxGL.setAccessToken('sk.eyJ1IjoiYWVkZWUiLCJhIjoiY2t1andhYnl0MXVneDMybnZpZmF1a2x3eSJ9.NR787DMgXRbCf0f9GfoYGg');

const App = () => {
  const [coordinates] = useState([123.1326, 11.5713]);
  return (
   <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView style={styles.map}>
          
          <MapboxGL.Camera
            zoomLevel={14}
            animationMode={'flyTo'}
            animationDuration={1100}
            centerCoordinate={coordinates}
        
          />
        <MapboxGL.PointAnnotation
        key="pointAnnotation"
        id="pointAnnotation"
        coordinate={coordinates}>
          
        <View style={{
                  height: 30, 
                  width: 30, 
                  backgroundColor: 'red', 
                  borderRadius: 50, 
                  borderColor: '#fff', 
                  borderWidth: 3
                }} />
      </MapboxGL.PointAnnotation>

        


        </MapboxGL.MapView>
        
      </View>
    </View>
  );
}

const renderAnnotations = () => {
  return (
    <MapboxGL.PointAnnotation
      key="pointAnnotation"
      id="pointAnnotation"
      coordinate={[123.236325, 11.568753]}
    >
      <View
        style={{
          height: 30,
          width: 30,
          backgroundColor: "red",
          borderRadius: 50,
          borderColor: "#fff",
          borderWidth: 3,
        }}
      />
    </MapboxGL.PointAnnotation>
    
  );
};

const styles = StyleSheet.create({
page: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#F5FCFF"
},
container: {
height: '100%',
  width: '100%',
  backgroundColor: 'deepskyblue',
},
map: {
  flex: 1
},

textContainer: {
  backgroundColor: "white",
  borderRadius: 10,
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  
},
text: {
  textAlign: "center",

  flex: 1,
},
markerContainer: {
  alignItems: "center",
  width: 120,
  backgroundColor: "transparent",
  height: 70,
},
});

export default App;