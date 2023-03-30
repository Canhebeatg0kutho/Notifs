import { useState } from 'react';
import { StyleSheet, Button, View, TextInput, Pressable } from 'react-native';
import {  insertItem  } from './sql';
import { scheduleNotificationHandler, sendPushNotificationHandler, Notif, } from './notif';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
export default function CreateNewItem({navigation}) {
    const [createdItem, setCreated] = useState('')
    const addItem = async () => {
        const dbResult = await insertItem(  // creates a new record in the sql database
            { title: createdItem }
        )
        console.log(dbResult)
    }

    return (
        <View style = {styles.container}>
            <TextInput
                style={styles.TextInput}
                placeholder="Type text here!"
                onChangeText={create => setCreated(create)}
                defaultValue={createdItem}
            />
            <Button
                title="Save"
                onPress={ () => {addItem(); scheduleNotificationHandler(createdItem); sendPushNotificationHandler(); navigation.navigate('Home')}}
            />
        </View>
    )


}

const styles = StyleSheet.create({

    TextInput: {
        height: 40,
        borderWidth: 3,
        width: 300,
        backgroundColor: "#7fffd4",
        borderRadius: 3,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
});
