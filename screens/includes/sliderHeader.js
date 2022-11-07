import React from 'react'
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


export const SliderHeader = ({
     leftComponent=<Icon name="arrow-back" color="#fff" size={34} />,
    rightComponent=<Icon name="share" color="#fff" size={34} />,
    centerComponent=<Text style={{color: '#fff', fontSize: 24, fontWeight: 'bold'}}>{itemData.name}</Text>,
    headerStyle={padding: 10, backgroundColor: 'rgba(0,0,0, 0.6)',}
  
}) => {


    return(
        <View style={[styles.container, headerStyle]}>
            {leftComponent ? leftComponent : <View />}
            {centerComponent ? centerComponent : <View />}
            {rightComponent ? rightComponent : <View />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})