import React, { useEffect } from 'react'
import { SafeAreaView, Text, Platform, StyleSheet, Pressable, Alert } from "react-native";
import { TextInput } from 'react-native-gesture-handler';

import { GoogleSignin } from '@react-native-google-signin/google-signin';


GoogleSignin.configure({
    webClientId: Platform.OS === 'ios' ? '838695630643-hlemgh4f3l016kna87o5i0u1dqah0288.apps.googleusercontent.com'
    : '838695630643-5fsf9n6ckv6lmk1dv7080sogajslqb2h.apps.googleusercontent.com'
})


import auth from '@react-native-firebase/auth';

export const LoginScreen: React.FC = () => {
    const [username, setUsername] = React.useState<string>("")
    const [password, setPassword] = React.useState<string>("")
    const [error, setError] = React.useState<string>("")

    const handleSignin = async () => {
        try{
            const user = await auth()
                                .createUserWithEmailAndPassword(username, password)

            if (user) {
                Alert.alert("Success", "User created")
                console.log(user)
            }

        }catch(error: any){
            setError(error.message)
            console.log(error)
        }
    }

    const googleSignUp = async () => {
        const {idToken} = await GoogleSignin.signIn()
        const credential = auth.GoogleAuthProvider.credential(idToken)

        return auth().signInWithCredential(credential)
    }

    return (
        <SafeAreaView>
            <Text>{error}</Text>
            <TextInput 
                placeholder="Username"
                onChangeText={(text) => setUsername(text)}
                value={username}
            />

            <TextInput
                placeholder="Password"
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry={true}
            />
            <Pressable onPress = {handleSignin}>
                <Text>Signin</Text>
            </Pressable>

            <Pressable onPress = {googleSignUp}>
                <Text>Sign in with Google</Text>
            </Pressable>

            <Pressable>
                <Text>Sign in with Github</Text>
            </Pressable>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    image: {
        borderRadius: 50,
        marginTop: 20,
        backgroundColor: 'red'
    }
})