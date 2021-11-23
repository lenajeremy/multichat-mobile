import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text, Platform, StyleSheet, Pressable, Alert, View } from "react-native";
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';

import { FirebaseAuthTypes } from '@react-native-firebase/auth'
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
    const [user, setUser] = useState<FirebaseAuthTypes.UserCredential>()

    const navigation = useNavigation()


    useEffect(() => {
        if (user) navigation.navigate('Chat' as never)
    }, [user])

    const handleSignin = async () => {
        try {
            const userGotten = await auth()
                .createUserWithEmailAndPassword(username, password)

            if (userGotten) {
                setUser(userGotten)
            }

        } catch (error: any) {
            setError(error.message)
            console.log(error)
        }
    }

    const googleSignUp = async () => {
        const { idToken } = await GoogleSignin.signIn()
        const credential = auth.GoogleAuthProvider.credential(idToken)

        return auth().signInWithCredential(credential)
    }

    return (
        <SafeAreaView>
            <View>
                <Text style={{ fontSize: 24, padding: 16, textAlign: 'center' }}>Create Account</Text>
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
                <Pressable onPress={handleSignin}>
                    <Text>Create Account</Text>
                </Pressable>
            </View>

            <View>

            </View>

            <Pressable onPress={googleSignUp}>
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