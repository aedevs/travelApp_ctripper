import React from 'react';
import { Text,Image, View , StyleSheet, ScrollView, Linking,TouchableOpacity} from 'react-native';

const HelloWorldApp = () => {
  return (
    <ScrollView> 

        <View
          style={{
            marginTop: 50,
            paddingLeft:5,
            paddingRight:5,
            paddingBottom: 30,
        }}>

            <Text style={style.Title}>
            For more Info, Visit:
            </Text>

        <View>
            <Text
              style={{lineHeight: 20,textAlign:'center',marginBottom:5, color: 'grey',justifyContent:'center' , fontSize:16}}>
              Department of Tourism
            </Text>
            <TouchableOpacity onPress={() => Linking.openURL(`https://beta.tourism.gov.ph/`)}>
                <Image
                source={require('../assets/images/dot.png')}
                style={style.image}
                />
            </TouchableOpacity>
        </View>

        <View style={{paddingTop:20}}>
             <Text
                style={{lineHeight: 20,textAlign:'center',marginBottom:5, color: 'grey',justifyContent:'center' , fontSize:16}}>
                Carles Tourism
              </Text>
              <TouchableOpacity onPress={() => Linking.openURL(`https://www.facebook.com/CarlesTourismOfficial`)}>
                  <Image
                    source={require('../assets/images/carles.jpg')}
                    style={style.image}
                    />
              </TouchableOpacity>
        </View>
        </View>


        <View
          style={{
            marginTop: 50,
            paddingLeft:5,
            paddingRight:5,     
        }}>

              <Text style={style.Title}>
                In Case of Emergency, Please Contact: 
              </Text>
        </View>

           <View style={{ paddingBottom: 30,}}>

            <TouchableOpacity  onPress={() => Linking.openURL(`tel:+639171385886`)}>
                <View style={style.btn}>
                  <Text style={{color: 'black',fontWeight:'bold',}}> Carles MDRRM Office</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity  onPress={() => Linking.openURL(`tel:+63985986203`)}>
                <View style={style.btn}>
                  <Text style={{color: 'black',fontWeight:'bold',}}>  Carles PNP</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity  onPress={() => Linking.openURL(`tel:+639063362644`)}>
                <View style={style.btn}>
                  <Text style={{color: 'black',fontWeight:'bold',}}> Carles BFP</Text>
                </View>
            </TouchableOpacity>
  
             <TouchableOpacity  onPress={() => Linking.openURL(`tel:+639178428412`)}>
                <View style={style.btn}>
                  <Text style={{color: 'black',fontWeight:'bold',}}> Coast Guard</Text>
                </View>
             </TouchableOpacity>

            <TouchableOpacity  onPress={() => Linking.openURL(`tel:+639171385886`)}>
                  <View style={style.btn}>
                    <Text style={{color: 'black',fontWeight:'bold',}}> Carles Rural Health Unit</Text>
                  </View>
            </TouchableOpacity>
          </View>
    </ScrollView>
  );
}


const style = StyleSheet.create({
imageGroup:{
paddingTop:25,

},

  image:{
      width:90,
      height:90,
      marginLeft:130,
      paddingRight:5,
      paddingBottom: 50,
  }
  ,
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

Title:
{
 fontSize: 18, 
  fontWeight: 'bold', 
  paddingBottom:20,
  textAlign:'center'
},

  Organization:{
    color: 'black',
    fontSize:15,
    fontWeight:'bold',
    paddingBottom:8,
    lineHeight: 20, 
   justifyContent:'space-around',
   textAlign:'center' ,
},

Number:{
  lineHeight: 20, 
  color: 'grey',
  textAlign:'center' ,
   fontSize:16,
   textDecorationLine:'underline',
},
btn: {
  height: 50,
  marginHorizontal:40,
  marginTop:25,
  backgroundColor: 'cyan',
  borderRadius: 15,
  justifyContent: 'center',
  alignItems: 'center',
},

});

export default HelloWorldApp;