import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Alert, ImageBackground,Image,AsyncStorage,ActivityIndicator} from 'react-native';
import { StackNavigator } from 'react-navigation';
 
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
type Props = {};

export default class App extends Component<Props> {
 
 
componentDidMount () {
    setTimeout(() => {
    //  this._retrieveData();
     this.props.navigation.navigate("Journey");
    
    }, 5000)
  }
 
 /* _retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('isLoggedIn');
        const email = await AsyncStorage.getItem('token');
 
    if (value !== null) {
      // We have data!!
      console.log(value);
      if(value == "true"){
         this.props.navigation.navigate("Journeys",{email : email});
       }else{
         this.props.navigation.navigate("SigIn");
       }
    }else{
      this.props.navigation.navigate("SigUp");
    }
   } catch (error) {
     // Error retrieving data
   }
}

*/
 
render() {

    return (
        <ImageBackground 
            source={require('../../assets/rsz_blue_bg.png')} 
            style = {{flex: 1, height: '100%', width: '100%', resizeMode : 'stretch'}}>

        <Image 
            source={require('../../assets/logo_white.png')}
            style = {{ width: '100%', height:'70%', marginTop: 100 }}
        />
        </ImageBackground>
        );
        
        
    }   
}