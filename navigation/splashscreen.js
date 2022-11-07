import React,{Component} from 'react';
import {View,ImageBackground, Image} from 'react-native';



export default class SplashScreen extends Component
{
constructor(props)
{
super(props);
setTimeout(()=>

	{
		this.props.navigation.navigate("onBoarding");
	},3000);
}

render()
{
return(
    <ImageBackground 
    style={{height:'100%', width:'100%', backgroundColor:'white'}}>
            <View
            style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Image 
                    source={require('../assets/images/logo.png')}
                    style={{
                    height:150,
                    width:150
                    }}>        
                </Image>
            </View>

    </ImageBackground>
);

}
}