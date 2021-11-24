import React, { useEffect, useState, useRef } from 'react'
import { Alert, FlatList, Image, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { ScrollView, TextInput } from 'react-native-gesture-handler'

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import db from '@react-native-firebase/database'
import { SafeAreaView } from 'react-native-safe-area-context'


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
        <View style={{ flex: 1 }}>
            <StatusBar barStyle='light-content' />
            <FlatList
                contentContainerStyle={styles.chatMessages}
                keyExtractor={(item) => item.createdAt}
                data={messages}
                renderItem={({ item }) => <ChatMessage message={item} />}
                ListFooterComponent={() => <InputController {...{inputRef, sendMessage, setTextMessage, textMessage}}/>}
            />
            <SafeAreaView />
        </View>
    )
}
interface InputControllerProps{
    inputRef: React.Ref<any>,
    sendMessage: any,
    setTextMessage: any,
    textMessage: string

}
const InputController : React.FC<InputControllerProps> = ({ inputRef, sendMessage, setTextMessage, textMessage }) => {
    return (
        <View style={styles.inputController}>
            <TextInput
                ref={inputRef}
                placeholder='Send message'
                onSubmitEditing={sendMessage}
                onChangeText={setTextMessage}
                value={textMessage}
            />
        </View>
    )
}
const ChatMessage = ({ message }) => {
    return (
        <View style={styles.chatMessage}>
            <Text>{message.text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 40,
        height: 40,
        borderRadius: 50,
    },
    inputController: {
        height: 100,
        width: '100%',
        backgroundColor: 'green'
    },
    chatMessages: {
        paddingHorizontal: 8,
        alignItems: 'flex-start'
    },
    chatMessage: {
        backgroundColor: 'green',
        padding: 10,
        maxWidth: '50%',
        borderRadius: 14,
    }
})
