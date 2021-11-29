import React, { useContext, useCallback, useEffect } from 'react'
import { SafeAreaView, StyleSheet, ImageBackground,  Keyboard, TouchableWithoutFeedback, View } from 'react-native'
import { withNavigationFocus } from '@react-navigation/compat';
import { Text } from 'react-native-elements'
import Map from '../components/Map'
import { Context as LocationContext } from '../context/LocationContext'
import * as SQLite from 'expo-sqlite'


import useLocation from '../hooks/useLocation' 


import TrackForm from '../components/TrackForm'



const db = SQLite.openDatabase('Database.db')


const TrackCreateScreen = ({ isFocused, navigation }) => {
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS itinerary(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(128) UTF-8 encoded, date_start DEFAULT CURRENT(DATETIME), date_saved DEFAULT NULL(DATETIME))'
        )
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS itinerary_details(id INTEGER PRIMARY KEY AUTOINCREMENT, itinerary_id INTEGER PRIMARY KEY, latitude DECIMAL(11,7), longitude DECIMAL(11,7), altitude DECIMAL(11,7), date DEFAULT CURRENT(DATETIME), synced(YES/NO) VARCHAR(5))'
        )
    })
  })
  
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