import React, { useEffect, useState } from 'react'
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/core'

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { ScrollView } from 'react-native-gesture-handler'

export const ChatScreen = () => {
    const [user, setUser] = useState<FirebaseAuthTypes.User>()

    const navigator = useNavigation()

    useEffect(() => {
        const authChangeSubscriber = auth().onAuthStateChanged(user => {
            if(user) setUser(user)
            else navigator.navigate('Login' as never)
        })

        return authChangeSubscriber
    },[])

    const handleLogout = () => {
        auth().signOut()
        // navigator.navigate('Login' as never)
    }

    return (
        <ScrollView>
            <Text>ChatScreen</Text>
            <Pressable onPress = {handleLogout}><Text>Logout</Text></Pressable>
            <Text>{JSON.stringify(user, null, 3)}</Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({})
