import { useState } from 'react';
import { StyleSheet, Button, View, TextInput } from 'react-native';
import { deleteItems } from '../sql';
export default function DeletedItems() {
    const [deletedItem, setDeleted] = useState('')

    const deleteItem = async () => {
        await deleteItems(
          { title: deletedItem }
        )
      }
    return (
        <View>
           <TextInput
        style={styles.TextInput}
        placeholder="Type text here!"
        onChangeText={remove => setDeleted(remove)}
        defaultValue={deletedItem}
      />
      <Button
        title="Delete Item"
        onPress={deleteItem}
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
