import React, { useContext } from 'react'
import { View, SafeAreaView, ImageBackground, StyleSheet } from 'react-native'
import { Button, Text } from 'react-native-elements'
// import Spacer from '../components/Spacer'
import { Context as AuthContext } from '../context/AuthContext'
import { openDatabase } from 'react-native-sqlite-storage';


const AccountScreen = ({navigation}) => {
  const { signOut } = useContext(AuthContext)

  return (
    <SafeAreaView>
      <View style={styles.text}>
        <Text h3>Utilizator: test@test.com</Text>
      {/* <Spacer>
        <Button title="Logout" onPress={signOut} />
        </Spacer> */}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  text: {
    height: 500,
    justifyContent: 'space-around'
  }
})
export default AccountScreen