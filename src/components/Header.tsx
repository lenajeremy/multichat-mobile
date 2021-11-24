import React from 'react'
import auth from '@react-native-firebase/auth'
import { Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'

const Header = () => {
    return (
        <View style = {styles.header}>
            <StatusBar barStyle = 'light-content'/>
            <Text style = {styles.headerText}>Header</Text>
            <Pressable onPress = {() => auth().signOut()}><Text style = {{color: 'white'}}>Logout</Text></Pressable>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#40ad40',
        height: 90,
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingBottom: 10,
        padding: 24,
        flexDirection: 'row'
    },
    headerText:{
        fontSize: 22,
        color: 'white',
        fontWeight:'500'
    }
})
