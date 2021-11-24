import React, { useEffect, useState } from 'react'
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { ScrollView, TextInput } from 'react-native-gesture-handler'

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import db from '@react-native-firebase/database'
import { SafeAreaView } from 'react-native-safe-area-context'


type Message = {
    text: string
    createdAt: number
    senderId: string
}

export const ChatScreen = () => {
    const [user, setUser] = useState<FirebaseAuthTypes.User>()
    const [messages, setMessages] = useState<any>([])

    const navigator = useNavigation()

    useEffect(() => {

        const getMessage = async () => {
            const dbMessages = await (await db().ref('messages').limitToFirst(10).once('value')).val()
            setMessages(Object.values(dbMessages))
        }

        db().ref('/messages').on('child_added', snapshot => {
            setMessages(messages => [...messages, snapshot.val()])
        })

        const authChangeSubscriber =
            auth()
                .onAuthStateChanged(user => {
                    if (user) setUser(user)
                    else navigator.navigate('Login' as never)
                })

        // getMessage()

        return authChangeSubscriber
    }, [])

    const sendMessage = (e) => {
        const newMessage = db().ref('messages').push({text: e.nativeEvent.text, senderId: user?.uid, createdAt: Date.now() })
        console.log(e.nativeEvent.text)
    }

    const handleLogout = () => {
        auth().signOut()
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Pressable onPress={handleLogout}><Text>Logout</Text></Pressable>
            <FlatList
                keyExtractor={(item) => item.createdAt}
                data={messages}
                renderItem={({ item }) => <Text>{item.text}</Text>}
            />
            <TextInput
                placeholder='Send message'
                onSubmitEditing={sendMessage}
            />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})
