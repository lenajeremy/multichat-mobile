import React, { useEffect, useState, useRef } from 'react'
import { FlatList, Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

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
                sender: { id: user?.uid, image: user?.photoURL, letter: user?.email?.charAt(0) },
                createdAt: Date.now(),
            })
        }
        setTextMessage('')
        inputRef.current.focus()
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', marginTop: -40 }}>
            <StatusBar barStyle='light-content' />
            <FlatList
                contentContainerStyle={styles.chatMessages}
                keyExtractor={(item) => item.createdAt}
                data={messages}
                renderItem={({ item }) => <ChatMessage message={item} />}
                ListFooterComponent={() => <View></View>}
            />
            <InputController {...{ inputRef, sendMessage, setTextMessage, textMessage }} />
        </SafeAreaView>
    )
}
interface InputControllerProps {
    inputRef: React.Ref<any>,
    sendMessage: any,
    setTextMessage: any,
    textMessage: string

}
const InputController: React.FC<InputControllerProps> = ({ inputRef, sendMessage, setTextMessage, textMessage }) => {
    return (
        <View style={styles.inputController}>
            <TextInput
            style = {styles.input}
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

    const isSelf = message.sender.id === auth().currentUser?.uid

    return (
        <View style = {{
            flexDirection: 'row', 
            alignItems: 'flex-start', 
            marginVertical: 10,
            alignSelf: isSelf ? 'flex-end' : 'flex-start'
        }}>
            {
                !isSelf ? 
                message.sender.image ? 
                <Image style={styles.image} source={{ uri: message.sender.image }} /> :
                <CircleAvatar letter = {message.sender.letter}/> :
                null
            }
            <View style={[styles.chatMessage, !isSelf && styles.notSelf]}>
                <Text style={[styles.chatText, !isSelf && {color: 'black'}]}>{message.text}</Text>
            </View>
        </View>
    )
}

const CircleAvatar : React.FC<{letter: string}> = ({letter}) => {
    return (
        <View style = {[styles.image, styles.circleAvatar]}>
            <Text style ={{fontSize: 16}}>{letter.toUpperCase()}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    image: {
        width: 30,
        height: 30,
        borderRadius: 50,
        marginRight: 10,
    },
    inputController: {
        height: 50,
        width: '100%',
        paddingHorizontal: 20,
        flexDirection: 'row'
    },
    chatMessages: {
        padding: 8,
        paddingHorizontal: 15,
    },
    chatMessage: {
        flexDirection: 'row',
        backgroundColor: '#40ad40',
        paddingHorizontal: 15,
        paddingVertical: 10,
        maxWidth: '65%',
        borderRadius: 20,
    },
    chatText: {
        color: '#fff',
        fontSize: 16
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
        width: '100%'
    },
    circleAvatar: {
        width: 30,
        height: 30,
        backgroundColor: 'lightblue',
        alignItems: 'center',
        justifyContent: 'center'
    },
    notSelf: {
        backgroundColor: '#efefef'
    }
})
