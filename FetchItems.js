
import {  StyleSheet, Button, View, } from 'react-native';
import { fetchItems } from './sql';

export default function FetchItems(){

    const fetchAll = async () => {
        const dbResult = await fetchItems() // returns an array of sql objects {id: title}
        console.log(dbResult)
      }

    return(
      <View style = {styles.container}>
        <Button
        title="Fetch Items"
        onPress={fetchAll}
      />
      </View>


    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});