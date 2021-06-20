// import React from 'react';
// import { StyleSheet, Text, View, MaskedViewIOS, Animated } from 'react-native';

// export default class SplashScreen extends React.Component {
//   state = {
//       loadingProgress: new Animated.Value(0),
//       animationDone: false
//   }

//   componentDidMount() {
//       Animated.timing(this.state.loadingProgress, {
//           toValue: 100,
//           duration: 1000,
//           useNativeDriver: true,
//           delay: 400
//       }).start(() => {
//           this.setState({animationDone: true})
//       })
//   }


//   render() {
//       const colorLayer = this.state.animationDone ? null : (
//         <View style={[StyleSheet.absoluteFill, { backgroundColor: "#7F23D9" }]} />
//       );

//       const whiteLayer = this.state.animationDone ? null : (
//          <View style={[StyleSheet.absoluteFill, { backgroundColor: "#FFF" }]} />
//       );

//       const imageScale = {
//           transform: [
//               {
//                   scale: this.state.loadingProgress.interpolate({
//                       inputRange: [0, 15, 100],
//                       outputRange: [0.1, 0.06, 16]
//                   })
//               }
//           ]
//       }

//       const opacity = {
//         opacity: this. state.loadingProgress.interpolate({
//           inputRange: [0, 25, 50],
//           outputRange: [0, 0, 1],
//           extrapolate: 'clamp'
//         })
//       }

//       return (
//           <View style={{ flex: 1 }}>
//               {colorLayer}

//               <MaskedViewIOS
//                   style={{ flex: 1 }}
//                   maskElement={
//                       <View style={styles.centered}>
//                           <Animated.Image
//                               source={require("./assets/splash.png")}
//                               style={[{ width: 1000, imageScale }]}
//                               resizeMode="contain"
//                           />

//                       </View>
//                   }
//                   >
//                       {whiteLayer}
//                       <Animated.View style={[opacity, styles.centered]}>
//                           <Text>Your app goes Here!</Text>
//                       </Animated.View>

//                   </MaskedViewIOS>
//           </View>
//       )
//   }
// }

// const styles = StyleSheet.create({
//   centered: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center"
//   }
// })




// import React, { Component } from 'react';
// import { StyleSheet, View, AppRegistry, Image, ImageBackground, Dimensions, Animated } from 'react-native';

// import { Asset } from 'expo-asset';
// import { AppLoading } from 'expo';
// import SplashHelper from './src/components/splash'

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
//         const imageAssets = cacheImages([require('./assets/rsz_blue_bg.png')]);

//         await Promise.all([...imageAssets]);
//     }

//     componentDidMount(){
//         const { navigate } = this.props.navigation;
        
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

import { styles } from 'expo-ui-kit';
import React, { Component } from 'react';
import {
AppRegistry, Image, ImageBackground, View

} from 'react-native';

export default class Myproject extends Component {
render() {

    return (
        <ImageBackground 
            source={require('./assets/rsz_blue_bg.png')} 
            style = {{flex: 1, height: '100%', width: '100%', resizeMode : 'stretch'}}>

        <Image 
            source={require('./assets/logo_white.png')}
            style = {{ width: '100%', height:'70%' }}
        />
        </ImageBackground>
        );
    }
}

AppRegistry.registerComponent('Myproject', () => Myproject);