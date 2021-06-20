import React, { useContext, useCallback } from 'react'
import { SafeAreaView, StyleSheet, ImageBackground,  Keyboard, TouchableWithoutFeedback, View } from 'react-native'
import { withNavigationFocus } from '@react-navigation/compat';
import { Text } from 'react-native-elements'
import Map from '../components/Map'
import { Context as LocationContext } from '../context/LocationContext'

// import '../_mockLocation'

import useLocation from '../hooks/useLocation' 


import TrackForm from '../components/TrackForm'

const TrackCreateScreen = ({ isFocused, navigation }) => {
  const { state: { recording }, addLocation } = useContext(LocationContext)
  const callback = useCallback(location => {
    addLocation(location, recording)
  }, [recording])
  const [err] = useLocation(isFocused || recording, callback)

  
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView>
          <Map/>
          {err ? <Text>Please enable location services</Text> : null}
          <TrackForm />
        </SafeAreaView>
        </TouchableWithoutFeedback>
    );
  }
  
const styles= StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#FFF"
  }
})

export default withNavigationFocus(TrackCreateScreen)