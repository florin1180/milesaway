import React, { useContext } from 'react'
import { Button } from 'react-native-elements'
import Spacer from './Spacer'
import { Context as LocationContext } from '../context/LocationContext'
import useSaveTrack from '../hooks/useSaveTrack'
import { StyleSheet, View, TextInput, KeyboardAvoidingView } from 'react-native';
import * as SQLite from 'expo-sqlite'


const db = SQLite.openDatabase('Database.db')


const TrackForm = () => {
  

  const { state: {
    name, recording, locations, currentLocation
  }, 
    startRecording,
    stopRecording,
    changeName 
  } = useContext(LocationContext)

  const [saveTrack] = useSaveTrack()

  console.log(currentLocation)

    // let query = 'INSERT INTO itinerary_details(itinerary_id, latitude, longitude, altitude, synced) VALUES(?,?,?,?,?)', [currentLocation.coords.accuracy, currentLocation.coords.latitude, currentLocation.coords.longitude, currentLocation.coords.altitude, currentLocation.coords.speed]
    // for (let i = 0; i < currentLocation.length; ++i) {
    //   query = query + "('"
    //     + currentLocation[i].id //id
    //     + "','"
    //     + currentLocation[i].itinerary_id
    //     + "','"
    //     + currentLocation[i].latitude
    //     + "','"
    //     + currentLocation[i].longitude
    //     + "','"
    //     + currentLocation[i].altitude
    //     + "','"
    //     + currentLocation[i].synced
    //     + "')";
    //   if (i != currentLocation.length - 1) {
    //     query = query + ",";
    //   }
    // }
    // query = query + ";";
    // console.log(query);


  return (
  
    <KeyboardAvoidingView style={ styles.button } behavior="padding">
        { recording 
          ? <Button title="Stop Journey" onPress={stopRecording} /> 
          : <Button title="New Journey" onPress={startRecording} /> 
        }
      <Spacer>
        { 
          !recording && locations.length
          ? <Button title="Save Journey" onPress={saveTrack}/>
          : null
        }
      </Spacer>
      </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create(
  {
      button:{
        width: '100%', 
        height: 100, 
        // backgroundColor: '#FF9800', 
        justifyContent: 'center', 
        // alignItems: 'center',
        position: 'absolute',
        bottom: 0
      }
  });

export default TrackForm