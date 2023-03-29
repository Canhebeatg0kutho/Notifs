import { useState } from 'react';
import { StyleSheet, Button, View, TextInput } from 'react-native';
import {  insertItem  } from './sql';
export default function CreateNewItem() {
    const [createdItem, setCreated] = useState('')
    const addItem = async () => {
        const dbResult = await insertItem(  // creates a new record in the sql database
            { title: createdItem }
        )
        console.log(dbResult)
    }

    return (
        <View>
            <TextInput
                style={styles.TextInput}
                placeholder="Type text here!"
                onChangeText={create => setCreated(create)}
                defaultValue={createdItem}
            />
            <Button
                title="Create Item"
                onPress={addItem}
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
});
