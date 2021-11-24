import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text, Platform, StyleSheet, Pressable, Alert, View, Image, ActivityIndicator } from "react-native";
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
    const [loading, setLoading] = useState<boolean>(false)
    const [authType, setAuthType] = useState<'login' | 'signup'>('signup')

    const navigation = useNavigation()


    useEffect(() => {
        auth().onAuthStateChanged((user) => {
            if(user) navigation.navigate('Chat' as never)
        })
    }, [])

    const handleSignin = async () => {
        setLoading(true)
        try {
            const userGotten = authType === 'signup' ? 
                await auth().createUserWithEmailAndPassword(username, password) :
                await auth().signInWithEmailAndPassword(username, password)


            if (userGotten) {
                setUser(userGotten)
                setLoading(false)
            }

        } catch (error: any) {
            setError(error.message.split(']')[1])
            setLoading(false)
        }
    }

    const googleSignUp = async () => {
        const { idToken } = await GoogleSignin.signIn()
        const credential = auth.GoogleAuthProvider.credential(idToken)

        return auth().signInWithCredential(credential)
    }

    return (
        <SafeAreaView style={{ flex: 1,backgroundColor: 'white' }}>
            <View style={styles.container}>
                <View>
                    <Text style={styles.heading}>
                        {authType === 'signup' ? 'Create an account' : 'Login to your account'}✌️</Text>
                    <Text style={styles.subtitle}>Welcome to a new chatting experience</Text>
                </View>

                <View style={styles.form}>
                    <Pressable
                        onPress={googleSignUp}
                        style={({ pressed }) => [styles.input, pressed && styles.pressedButton]}
                    >
                        <Image style={styles.googleImage} source={require('./google-logo.jpeg')} />
                        <Text style={{ fontSize: 16 }}>Sign in with Google</Text>
                    </Pressable>

                    {
                        error ?
                            <View style={styles.errorContainer}>
                                <Text style={styles.errorText}>{error}</Text>
                            </View> : null
                    }

                    <TextInput
                        style={[styles.input, { marginBottom: 10, marginTop: 15 }]}
                        placeholder="Email Address"
                        onChangeText={(text) => setUsername(text)}
                        value={username}
                        onFocus={() => setError('')}
                    />

                    <TextInput
                        style={[styles.input, { marginBottom: 15 }]}
                        placeholder="Password"
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        secureTextEntry={true}
                        onFocus={() => setError('')}
                    />
                    <Pressable 
                        onPress={() => setAuthType(authType === 'login' ? 'signup' : 'login')}
                        style = {{marginBottom: 15}}
                    >
                        <Text style ={{color: '#40ad40', fontWeight: '500', fontSize: 15}}>
                            {authType === 'signup' ? 'Already have an account? Sign in' : 'Don\'t have an account? Sign up'}
                        </Text>
                    </Pressable>
                    <Pressable
                        onPress={handleSignin}
                        style={[styles.input, { backgroundColor: '#40ad40', borderColor: 'transparent' }]}
                    >
                        {loading ?
                            <ActivityIndicator color='white' /> :
                            <Text style={{ color: 'white', fontSize: 18, textTransform: 'uppercase' }}>
                                {authType === 'signup' ? 'Create Account' : 'Login'}</Text>
                        }
                    </Pressable>
                </View>
            </View>
            <View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 30
    },
    heading: {
        fontSize: 26,
        lineHeight: 38,
        fontWeight: '600'
    },
    subtitle: {
        fontSize: 16,
        color: '#333'
    },
    form: {
        marginTop: 50,
    },
    pressedButton: {
        backgroundColor: 'lightgray'
    },
    googleImage: {
        width: 30,
        height: 30,
        marginRight: 10
    },
    input: {
        borderRadius: 500,
        borderWidth: 1,
        borderColor: '#d3d3d3',
        borderStyle: 'solid',
        padding: 15,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorContainer: {
        backgroundColor: '#cf0a28',
        padding: 15,
        borderRadius: 50,
        marginTop: 40
    },
    errorText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    }
})