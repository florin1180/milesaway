import React, { useContext } from 'react'
import { Button } from 'react-native-elements'
import Spacer from './Spacer'
import { Context as LocationContext } from '../context/LocationContext'
import useSaveTrack from '../hooks/useSaveTrack'
import { StyleSheet, View, TextInput, KeyboardAvoidingView } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';


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
      <Spacer>
        {/* <Input placeholder="Enter name" onChangeText={changeName} value={name} placeholderTextColor="red" /> */}
        <TextInput value={name} onChangeText={changeName}
          style={{ borderRadius: 10, textAlign: 'center', backgroundColor: '#a4c3f5', height: 40, width: "100%", borderColor: '#a4c3f5', borderWidth: 5,  marginBottom: 20, color:'white' }}
          // Adding hint in TextInput using Placeholder option.
          placeholder="Enter Journey Name Here"
          // Making the Under line Transparent.
          underlineColorAndroid="transparent"
          placeholderTextColor="white"
          
          
        />
      </Spacer>
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
        height: 230, 
        // backgroundColor: '#FF9800', 
        justifyContent: 'center', 
        alignItems: 'center',
        position: 'absolute',
        bottom: 0
      }
  });

export default TrackForm