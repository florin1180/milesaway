import React, { Component } from 'react';
import {
AppRegistry, Image, ImageBackground, View

} from 'react-native';



export default class SplashScreen extends Component {
    constructor(props){
        super(props)
        setTimeout(() => {
            alert("BAU")
        }, 1000)
    }

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


