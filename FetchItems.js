import { useState } from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';
import { fetchItems } from './sql';
export default function DeletedItems() {
    const [deletedItem, setDeleted] = useState([])

    const fetchAll = async () => {
        const dbResult = await fetchItems()
        const data = await dbResult
        setDeleted(data)
        console.log(deletedItem)
      }

    return (
      <View>
      <Button
        title="Fetch Items"
        onPress={fetchAll}
      />
      {deletedItem.map((item)=>{
        <Text style={styles.text} key={item._id}>{item.title}</Text>
      })}
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
    text:{
      color:"black"
    }
});
