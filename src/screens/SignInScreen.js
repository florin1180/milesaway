import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Context as AuthContext } from '../context/AuthContext'
// import AuthForm from '../components/AuthForm'
import NavLink from '../components/NavLink'
import { Button, Text, Input } from 'react-native-elements'
import Spacer from '../components/Spacer'


const SignInScreen = ({ navigation, headerText, errorMessage, onSubmit, submitButtonText }) => {
  const { state, signIn, clearErrorMessage } = useContext(AuthContext)
  const [user_name, setUser_name] = useState('')
  const [password, setPassword] = useState('')
  // const [phone, setPhone] = useState('')
  
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => clearErrorMessage())
    return unsubscribe
  }, [navigation])

  return (
    
    <View style={styles.container} headerText="Login" >
      {/* <AuthForm  
        headerText="Login" 
        errorMessage={state.errorMessage}
        submitButtonText="Login"
        onSubmit={signIn}
      /> */}
      <Spacer>
        <Text h3>{headerText}</Text>
      </Spacer>
      <Spacer>
        <Input 
          label="User Name" 
          value={user_name} 
          onChangeText={setUser_name} 
          autoCapitalize="none" 
          autoCorrect={false} 
        />
      </Spacer>
      <Spacer>
        <Input 
          label="Password" 
          value={password} 
          onChangeText={setPassword} 
          autoCapitalize="none" 
          autoCorrect={false} 
          secureTextEntry 
        />
      </Spacer>
      { errorMessage ? (
        <Spacer>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        </Spacer>
      ) : null }
      <Spacer>
      <Button 
          title='Login'
          onPress={() => onSubmit({ user_name, password })} 
        />
        </Spacer>
      <NavLink text="Don't have an account? Register instead" routeName="SignUp" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 130,
    marginTop: 170
  }
})

export default SignInScreen