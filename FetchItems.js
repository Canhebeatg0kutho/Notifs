
import {  Button } from 'react-native';
import { fetchItems } from './sql';

export default function FetchItems(){

    const fetchAll = async () => {
        const dbResult = await fetchItems() // returns an array of sql objects {id: title}
        console.log(dbResult)
      }

    return(
        <Button
        title="Fetch Items"
        onPress={fetchAll}
      />

    )
}