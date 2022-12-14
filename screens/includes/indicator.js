import React from 'react'
import { StyleSheet, View } from 'react-native'


export const Indicator = ({
    data = [],
    currenIndex = 0,
    activeIndicatorStyle={},
    inActiveIndicatorStyle={},
    indicatorContainerStyle={}
}) => {
    return (
        <View style={[styles.main, indicatorContainerStyle]}>
            {data.map((value, index) => {
                if(index == currenIndex) {
                    return <View key={index} style={[styles.activeIndicatorStyle, activeIndicatorStyle]}/>    
                }else {
                    return <View key={index} style={[styles.inActiveIndicatorStyle, inActiveIndicatorStyle]}/>    
                }
            })}
        </View>
    )
}


const styles = StyleSheet.create({
    main: {
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeIndicatorStyle : {
        height: 5,
        width: 20,
        borderRadius: 100,
        backgroundColor: "cyan",
        margin: 5
    },
    inActiveIndicatorStyle: {
        height: 10,
        width: 10,
        borderRadius: 100,
        backgroundColor: "rgb(223, 231, 245)",
        margin: 5

    }
})