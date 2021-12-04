import React, { useContext } from 'react'
import { Button } from 'react-native-elements'
import Spacer from './Spacer'
import { Context as LocationContext } from '../context/LocationContext'
import useSaveTrack from '../hooks/useSaveTrack'
import { StyleSheet, View, TextInput, KeyboardAvoidingView } from 'react-native';


const TrackForm = () => {
  

  const { state: {
    name, recording, locations
  }, 
    startRecording,
    stopRecording,
    changeName 
  } = useContext(LocationContext)

  const [saveTrack] = useSaveTrack()

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