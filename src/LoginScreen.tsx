import React, { useEffect } from 'react'
import { SafeAreaView, Text, Image, StyleSheet, Pressable, Alert } from "react-native";
import database from '@react-native-firebase/database'
import { TextInput } from 'react-native-gesture-handler';

export const LoginScreen: React.FC = () => {
    const [username, setUsername] = React.useState<string>("")
    const [password, setPassword] = React.useState<string>("")
    const [error, setError] = React.useState<string>("")

    const handleSignin = () => {
        Alert.alert(username + password)
    }

    return (
        <SafeAreaView>
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

            <Pressable>
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