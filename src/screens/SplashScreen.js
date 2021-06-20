// import React, { Component } from 'react';
// import { StyleSheet, View, AppRegistry, Image, ImageBackground, Dimensions } from 'react-native';

// import { Asset } from 'expo-asset';
// import { AppLoading } from 'expo';
// import SplashHelper from '../components/splash'

// const { width, height } = Dimensions.get('window');

// function cacheImages(images) {
//     return images.map(image => {
//         if (typeof image === 'string') {
//             return Image.prefetch(image);
//         } else {
//             return Asset.fromModule(image).downloadAsync();
//         }
//     });
// }

// export default class SplashScreen extends Component {

//     constructor(props){
//         super(props)
//         this.state = {
//             isReady: false,
//             isLoggedIn : false
//         }
//     }

//     async _loadAssetsAsync() {
//         const imageAssets = cacheImages([require('../../assets/rsz_blue_bg.png')]);

//         await Promise.all([...imageAssets]);
//     }

//     componentDidMount(){
//         const { navigate } = this.props.navigation;
        
//         // do stuff while splash screen is shown
//         // After having done stuff (such as async tasks) hide the splash screen

//         this.timeoutHandle = setTimeout(()=>{
//             navigate('Journey', { k: 'v' })
//         }, 5000);
        
//     }

//     goToLogin() {
//         console.log('pressed');
//     }

//     render() {
//         if (!this.state.isReady) {
//             return (
//                 <AppLoading
//                     startAsync={this._loadAssetsAsync}
//                     onFinish={() => this.setState({ isReady: true })}
//                     onError={console.warn}
//                 />
//             );
//         }
//         return <SplashHelper />;
//     }
// }

// AppRegistry.registerComponent('SplashScreen');


