import React, { useContext } from 'react'
import { StyleSheet, ActivityIndicator, TouchableWithoutFeedback, Keyboard } from 'react-native'
import MapView, { Polyline, Circle } from 'react-native-maps'
import { Context } from '../context/LocationContext'

const Map = () => {
  const { state: { currentLocation, locations } } = useContext(Context)

  // console.log(currentLocation);


  if(!currentLocation) {
    return <ActivityIndicator size="large" color="#0000ff" />
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <MapView 
      style={styles.map} 
      initialRegion={{
        ...currentLocation.coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      }}
    >
      <Polyline coordinates={locations.map((loc) => loc.coords)} />
      <Circle 
        center={currentLocation.coords}
        radius={30}
        strokeColor="rgba(158, 158, 255, 1.0)"
        fillColor="rgba(158, 158, 255, 0.3)"
      />
    </MapView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  map: {
    height: '100%',
    width: '100%',
    
  }
})

export default Map