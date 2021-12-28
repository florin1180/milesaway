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

  // console.log(currentLocation)

  const initItinerary = () => {
    const prom = new Promise((resolve, reject) => {
      db.transaction(async (tx) => {
        tx.executeSql('DROP TABLE IF EXISTS itinerary', []);
        await tx.executeSql(
          'CREATE TABLE IF NOT EXISTS itinerary(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(30), date_start DATETIME DEFAULT CURRENT_DATETIME, date_saved DATETIME DEFAULT SAVED_TIME)',
          [],
          () => {
            resolve();
          },
          (_, err) => {
            console.log(err)
            reject(err);
          }
        );
      });
    });  
    prom.then(value => { console.log(value) }).catch(err => console.log('There was an error:' + err))
  }

  const insertItinerary = (id, name, date_start, date_saved) => {
    const prom = new Promise((resolve, reject) => {
        db.transaction(async(tx) => {
          await tx.executeSql(
            'INSERT INTO itinerary(id, name, date_start,date_saved) VALUES(?,?,?,?);', 
            [1, 'Florin', '123', "456"],
            (_, result) => {
              resolve(result);
            },
            (_, err) => {
              reject(err);
            }
          );
        });
      });
    return prom;
};


  const initDetails = () => {
    const prom = new Promise((resolve, reject) => {
      db.transaction(async (tx) => {
        tx.executeSql('DROP TABLE IF EXISTS itinerary_details', []);
        await tx.executeSql(
          'CREATE TABLE IF NOT EXISTS itinerary_details(id INTEGER PRIMARY KEY AUTOINCREMENT, itinerary_id INT(10), latitude TEXT(20), longitude TEXT(20), altitude TEXT(20), synced VARCHAR(10), date TEXT(20))',
          [],
          () => {
            resolve();
          },
          (_, err) => {
            reject(err);
          }
        );
      });
    });       
    prom.then(value => { console.log(value) }).catch(err => console.log('There was an error:' + err))
  }         


  const insertDetails = (id, itinerary_id, latitude, longitude, altitude, sunced, date) => {
      const prom = new Promise((resolve, reject) => {
          db.transaction(async(tx) => {
            await tx.executeSql(
              'INSERT INTO itinerary_details(id, itinerary_id, latitude, longitude, altitude, synced, date) VALUES(?,?,?,?,?,?,?);', 
              [2, 3, currentLocation.coords.latitude, currentLocation.coords.longitude, currentLocation.coords.altitude, 'NO', currentLocation.coords.timestamp],
              (_, result) => {
                resolve(result);
              },
              (_, err) => {
                reject(err);
              }
            );
          });
        });
      return prom;
  }

  let intervalID = null;

  const getData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM itinerary_details",
        [],
        (tx, results) => {
          var data = [];
          for (let i = 0; i < results.rows.length; ++i)
            data.push(results.rows.item(i));
          console.log(data) 
        }
      )
    })
  }

  const startData = () => {
          if (intervalID !== null) return;
          intervalID = setInterval(getData, 5000);
        },
        stopData = () => {
          if (intervalID !== null) return;
          clearInterval(intervalID);
          intervalID = null;
          console.log("STOPED");
        }

    return (

      <KeyboardAvoidingView style={ styles.button } behavior="padding">
          { recording 
            ? <Button title="Stop Journey" onPress={() => {stopRecording(); stopData()}}/> 
            : <Button title="New Journey" onPress={() => {startRecording(); initItinerary(); insertItinerary(); initDetails(); insertDetails(); startData()}} /> 
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