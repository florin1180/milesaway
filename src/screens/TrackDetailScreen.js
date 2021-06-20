import React, { useContext } from 'react'
import { View, StyleSheet, SafeAreaView,FlatList, StatusBar } from 'react-native'
import { Text } from 'react-native-elements'
import { Context as TrackContext } from '../context/TrackContext'
import MapView, { Polyline } from 'react-native-maps'


const CoordsInfo = ({ longitude, latitude, altitude }) => (
  <View style ={styles.item}>
    <Text style={styles.title}>{'Longitude: ' + longitude}</Text>
    <Text style={styles.title}>{'Latitude: ' + latitude}</Text>
    <Text style={styles.title}>{'Altitude: ' + altitude}</Text>
  </View>
)


const TrackDetailScreen = ({ route, navigation }) => {
  const { state }  = useContext(TrackContext)
  const _id = route.params._id
  const track = state.find(t => t._id === _id)
  const initCoords = track.locations[0].coords
  


  const renderItem = ({ item }) => (
    <CoordsInfo 
    longitude={item.longitude} 
    latitude={item.latitude}
    altitude={item.altitude}  
    />
  )

  const SeparatorComponent = () => {
    return <View style={styles.separatorLine}/>
  }


  const Coords = track.locations.map(loc => loc.coords)
 

  return (
    <SafeAreaView style={styles.container}>
      <MapView 
        style={styles.map}
        initialRegion={{
          longitudeDelta: 0.01,
          latitudeDelta: 0.01,
          ...initCoords
        }}
      >
        <Polyline coordinates={track.locations.map(loc => loc.coords)} />
      </MapView>
      <Text style={{textAlign: 'center', margin: 30, borderBottomWidth: 2, borderBottomColor: '#009387'}} h3>Journey Name: {track.name }</Text>
      <FlatList
          data={Coords}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={SeparatorComponent}
        />
      </SafeAreaView>        

  )
}

const styles = StyleSheet.create({
  map: {
    height: '50%',
  },
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
    backgroundColor: 'white'
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
  },
  separatorLine: {
    height: 1,
    backgroundColor: '#009387',
    paddingTop: 2,
  }
})

export default TrackDetailScreen