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
  // const init = () => {
  //   const promise = new Promise((resolve, reject) => {
  //     db.transaction(async (tx) => {
  //       await tx.executeSql(
  //         'CREATE TABLE IF NOT EXISTS itinerary(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(128), date_start DEFAULT CURRENT(DATETIME), date_saved DEFAULT NULL(DATETIME))',
  //         [],
  //         () => {
  //           resolve();
  //         },
  //         (_, err) => {
  //           reject(err);
  //         }
  //       );
        // await tx.executeSql(
        //   'CREATE TABLE IF NOT EXISTS itinerary_details(id INTEGER PRIMARY KEY AUTOINCREMENT, itinerary_id INTEGER PRIMARY KEY, latitude DECIMAL(11,7), longitude DECIMAL(11,7), altitude DECIMAL(11,7), synced(YES/NO) VARCHAR(5), date DEFAULT CURRENT(DATETIME))',
        //   [],
        //   () => {
        //     resolve();
        //   },
        //   (_, err) => {
        //     reject(err);
        //   }
        // );
  //     });
  //   });
  //   return promise;
  // }

  // let Data = [{ "id": 2, "itinerary_id": "2", "latitude": "100", "longitude": "200", "altitude":"300", "synced":"yes" }, { "id": 3, "itinerary_id": "3", "latitude": "100", "longitude": "200", "altitude":"300", "synced":"yes" }];
  //   let query = "INSERT INTO itinerary_details(id, itinerary_id, latitude, longitude, altitude, synced) VALUES";
  //   for (let i = 0; i < Data.length; ++i) {
  //     query = query + "('"
  //       + Data[i].id //id
  //       + "','"
  //       + Data[i].itinerary_id
  //       + "','"
  //       + Data[i].latitude
  //       + "','"
  //       + Data[i].longitude
  //       + "','"
  //       + Data[i].altitude
  //       + "','"
  //       + Data[i].synced
  //       + "')";
  //     if (i != Data.length - 1) {
  //       query = query + ",";
  //     }
  //   }
  //   query = query + ";";
  //   console.log(query);

//   const insertDetails = (itinerary_id, latitude, longitude, altitude, synced ) => {
//     const promise = new Promise((resolve, reject) 
//         db.transaction(tx => {
//           tx.executeSql(
//             `INSERT INTO itinerary_details (itinerary_id, latitude, longitude, altitude, synced) VALUES (curentLocation.coord.accuracy etc, ?, ?, ?, ?);`,
//             [1, 100, 200, 300, 'yes'],
//             (_, result) => {
//               resolve(result);
//             },
//             (_, err) => {
//               reject(err);
//             }
//           );
//         });
//       });
//       return promise;
// };



  
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