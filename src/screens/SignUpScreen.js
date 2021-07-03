import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Context as AuthContext } from '../context/AuthContext'
import { Button, Text, Input } from 'react-native-elements'
// import AuthForm from '../components/AuthForm'
import NavLink from '../components/NavLink'
import Spacer from '../components/Spacer'


const SignUpScreen = ({ navigation, headerText, errorMessage, onSubmit, submitButtonText }) => {
  const { state, signUp, clearErrorMessage } = useContext(AuthContext)
  const [first_name, setFirst_name] = useState('')
  const [last_name, setLast_name] = useState('')
  const [user_name, setUser_name] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => clearErrorMessage())
    return unsubscribe
  }, [navigation])
  return (
    <View style={styles.container}>
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
          label="First Name" 
          value={first_name}
          onChangeText={setFirst_name} 
          autoCapitalize="none" 
          autoCorrect={false} 
        />
      </Spacer>
      <Spacer>
        <Input 
          label="Last Name" 
          value={last_name}
          onChangeText={setLast_name} 
          autoCapitalize="none" 
          autoCorrect={false} 
        />
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
          label="Email" 
          value={email} 
          onChangeText={setEmail} 
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
          title='Register'
          onPress={() => onSubmit({ user_name, password })} 
        />
        </Spacer>
      <NavLink text="Already have an account? Login in Instead" routeName="SignIn" />
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

export default SignUpScreen