import React, { useEffect, useState, useRef } from 'react'
import { Alert, FlatList, Image, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'
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

export const ChatScreen = ({ navigation }) => {
    const [user, setUser] = useState<FirebaseAuthTypes.User>()
    const [messages, setMessages] = useState<any>([])
    const [textMessage, setTextMessage] = useState<string>('')


    const inputRef = useRef(null)

    useEffect(() => {

        db().ref('/messages').on('child_added', snapshot => {
            setMessages(messages => [...messages, snapshot.val()])
            setTextMessage('')
        })

        const authChangeSubscriber =
            auth()
                .onAuthStateChanged(user => {
                    if (user) setUser(user)
                    else navigation.replace('Login')
                })

        return authChangeSubscriber
    }, [])

    const sendMessage = (e) => {
        if (textMessage) {
            db().ref('messages').push({
                text: e.nativeEvent.text,
                senderId: user?.uid,
                createdAt: Date.now()
            })
        }
        setTextMessage('')
        inputRef.current.focus()
    }

    return (
        <React.Fragment>
            <View style={{ flex: 1 }}>
                <FlatList
                    keyExtractor={(item) => item.createdAt}
                    data={messages}
                    renderItem={({ item }) => <ChatMessage message = {item}/>}
                />
                <TextInput
                    ref={inputRef}
                    placeholder='Send message'
                    onSubmitEditing={sendMessage}
                    onChangeText={setTextMessage}
                    value={textMessage}
                />
                <Image source={{ uri: user?.photoURL }} style={styles.image} />
                <Text>{user?.displayName}</Text>
            </View>
            <SafeAreaView />
        </React.Fragment>
    )
}

const ChatMessage = ({message}) => {
    return (
        <View>
            <Text>{JSON.stringify(message)}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 40,
        height: 40,
        borderRadius: 50,
    }
})
