import { useState } from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';
import { fetchItems } from './sql';
export default function FetchItems() {
  const [deletedItem, setDeleted] = useState([])
  const fetchAll = async () => {
    try {

      const dbResult = await fetchItems()
      const data = await dbResult.json()
      setDeleted(data)
      console.log(dbResult.title)
    } catch (err) {
      console.log(err)
    }

  }

  return (
    <View>
      {deletedItem.map((itemers) => {
        <Text key={itemers.id}>{itemers.title}</Text>
      })}

      <Button
        title="Fetch Items"
        onPress={async () =>  fetchAll() }
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
  text: {
    color: "black"
  }
});
