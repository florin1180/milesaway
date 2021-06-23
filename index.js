import { Component } from "react";
import { AppRegistry } from "react-native";
import App from './App'
import SignInScreen from "./src/screens/SignInScreen";
import SplashScreen from "./src/screens/SplashScreen"

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = { currentScreen: 'SplashScreen' }
        console.log('apare un screen dupa 5 secunde')
        setTimeout(() =>{
            console.log('am facut ceva dupa 5 secunde')
        }, 5000)
    }
    render() {
        const { currentScreen } = this.state
        let mainScreen = currentScreen === "SplashScreen" ? <SplashScreen /> : <SignInScreen />
        return mainScreen
    }
}

AppRegistry.registerComponent('MilesAway', () => Main)