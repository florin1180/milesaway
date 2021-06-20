import React, { useEffect, useContext, setState } from 'react'
import { FlatList, TouchableOpacity, SafeAreaView, Text, StyleSheet, View, Animated } from 'react-native'
import { ListItem } from 'react-native-elements'
import { Context as TrackContext } from '../context/TrackContext'


import Swipeable from 'react-native-gesture-handler/Swipeable'
import { MaterialIcons } from '@expo/vector-icons';

const TrackListScreen = ({navigation}) => {
  const { state, fetchTracks } = useContext(TrackContext)
  


  viewHandle = (item) => {
    console.log('click on view id', item._id)
  }

  editHandle = (item) => {
    console.log('click on edit id', item._id)
  }

  deleteHandle = (_id) => {
    const filteredData = this.data.state.filter(item => item._id !== _id);
    this.setState({ data: filteredData });
  }


    

  const rightSwipe = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [1, 270],
      outputRange: [0, -1],
    });
    return (
      <>
      <TouchableOpacity activeOpacity={0.3} onPress={deleteHandle}>
        <View style={styles.deleteBox}>
          <Animated.Text style={{ transform: [{scale: scale}]}}>
          <MaterialIcons name="delete" size={37} color="red" />
          </Animated.Text>
        </View>
      </TouchableOpacity>
    
      
      <TouchableOpacity activeOpacity={0.3} onPress={editHandle}>
        <View style={styles.editBox}>
          <Animated.Text style={{ transform: [{scale: scale}]}}>
          <MaterialIcons name="edit" size={37} color="grey" />
          </Animated.Text>
        </View>
      </TouchableOpacity>
      
      
      <TouchableOpacity activeOpacity={0.3} onPress={viewHandle}>
        <View style={styles.viewBox}>
          <Animated.Text style={{ transform: [{scale: scale}]}}>
          <MaterialIcons name="preview" size={37} color="grey" />
          </Animated.Text>
        </View>
      </TouchableOpacity>

      </>
    )
    
  }

  useEffect(() => {
    const unsub = navigation.addListener('focus', () => fetchTracks())
    return unsub
  }, [navigation])
  
  return (
      <SafeAreaView style={styles.container}>
      <FlatList
        data={state}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity 
            onPress={() =>
              navigation.navigate('Journey Details', {_id:item._id})
            }>
            <Swipeable renderRightActions={rightSwipe}>
              <ListItem>
                <ListItem.Content>
                  <ListItem.Title>{item.name}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Content>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
              </Swipeable>
            </TouchableOpacity>
          );
        }}
      />
      </SafeAreaView>
  )
}


export default TrackListScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  separatorLine: {
    height: 1,
    backgroundColor: 'black',
  },
  button: {
    flex: 1,
    margin: 10,
    marginTop: 30,
    padding: 30,
  },
  deleteBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: '100%',
  },
  editBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: '100%',
  },
  viewBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: '100%',
  },
});