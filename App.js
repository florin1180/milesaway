import React, { useContext, useEffect } from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/Ionicons';

import SplashScreen from './src/screens/SplashScreen'
import AccountScreen from './src/screens/AccountScreen'
import SignInScreen from './src/screens/SignInScreen'
import SignUpScreen from './src/screens/SignUpScreen';
import TrackCreateScreen from './src/screens/TrackCreateScreen'
import TrackDetailScreen from './src/screens/TrackDetailScreen'
import TrackListScreen from './src/screens/TrackListScreen'
import LoadingScreen from './src/screens/LoadingScreen'
import { Provider as AuthProvider, Context as AuthContext } from './src/context/AuthContext'
import { Provider as LocationProvider } from './src/context/LocationContext'
import { Provider as TrackProvider } from './src/context/TrackContext'

import { DrawerContent } from './src/screens/DrawerContent'

const AuthStack = createStackNavigator()

const AuthStackScreen = () => (
  <AuthStack.Navigator screenOptions={{headerShown: false}}>
    <AuthStack.Screen name="SignIn" component={SignInScreen} />
    <AuthStack.Screen name="SignUp" component={SignUpScreen} />
  </AuthStack.Navigator>
)

const FirstStack = createStackNavigator()

const FirstStackScreen = ({navigation}) => (
  <FirstStack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#009387'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      // alignSelf: 'center',
    }
  }}>
    {/* <FirstStack.Screen name="Splash" component={SplashScreen} /> */}
    <FirstStack.Screen 
      name="Journeys" 
      component={TrackCreateScreen}
      options={{
        headerLeft: () => (
          <Icon.Button 
          name="ios-menu" 
          size={25} 
          backgroundColor="#009387"
          onPress={() => {navigation.openDrawer()}}></Icon.Button>
        )
      }} 
      />
  </FirstStack.Navigator>
)

const TrackListStack = createStackNavigator()

const TrackListScreens = ({navigation}) => (
  <TrackListStack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#009387'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }}>
    <TrackListStack.Screen 
    name="History" 
    component={TrackListScreen} 
    options={{
      headerLeft: () => (
        <Icon.Button 
        name="ios-menu" 
        size={25} 
        backgroundColor="#009387"
        onPress={() => {navigation.openDrawer()}}></Icon.Button>
      )
    }} 
    />
    <TrackListStack.Screen name="Journey Details" component={TrackDetailScreen} />
  </TrackListStack.Navigator>
)

const AccountStack = createStackNavigator()

const AccountScreens = ({navigation}) => (
  <AccountStack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#009387'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }}>
    <AccountStack.Screen
    name="Account" 
    component={AccountScreen} 
    options={{
      headerLeft: () => (
        <Icon.Button 
        name="ios-menu" 
        size={25} 
        backgroundColor="#009387"
        onPress={() => {navigation.openDrawer()}}></Icon.Button>
      )
    }} 
    />

  </AccountStack.Navigator>
)


const AppStack = createDrawerNavigator()

const AppStackScreen = ({navigation}) => (
  <AppStack.Navigator drawerContent={props => <DrawerContent {...props}/>}>
    <AppStack.Screen name="Journey" component={FirstStackScreen} />
    <AppStack.Screen name="History" component={TrackListScreens} />
    <AppStack.Screen name="Account" component={AccountScreens} />
  </AppStack.Navigator>
)


const App = () => {
  const { state } = useContext(AuthContext)

  if(state.isLoading) {
    return <LoadingScreen />
  }

  return (
    // <NavigationContainer>
    //   {state.token === null ? (
    //       <AuthStackScreen />
    //     ) : (
    //       <AppStackScreen />
    //     )
    //   }
    // </NavigationContainer>
    <SplashScreen/>
  )
}

export default () => (
  <AuthProvider>
    <LocationProvider>
      <TrackProvider>
        <App />
      </TrackProvider>
    </LocationProvider>
  </AuthProvider>
)