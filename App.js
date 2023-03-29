import { useEffect,useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View, Alert, Platform, TextInput } from 'react-native';
import { init, insertItem, fetchItems, deleteItems } from './sql';
import { scheduleNotificationHandler, sendPushNotificationHandler, Notif, } from './notif';
import * as Notifications from 'expo-notifications';
export default function App() {
  const [deletedItem,setDeleted] = useState('')
  const [createdItem,setCreated] = useState('')
  useEffect(() => {
    init()
    try{
      console.log('Initialized database');
    }catch(err) {
        console.log('Initializing db failed.');
        console.log(err);
      };
    <Notif />
  }, []);

  const addItem = async () => {
    const dbResult = await insertItem(  // creates a new record in the sql database
      { title: createdItem }
    )
    console.log(dbResult)
  }

  const fetchAll = async() => {
    const dbResult = await fetchItems() // returns an array of sql objects {id: title}
    console.log(dbResult)
  }

  const deleteItem = async() => {
    await deleteItems(
      { title: deletedItem }
    )
  }

  useEffect(() => {
    const subscription1 = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log('NOTIFICATION RECEIVED');
        console.log(notification);
        const userName = notification.request.content.data.userName;
        console.log(userName);
      }

    );
    const subscription2 = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log('NOTIFICATION RESPONSE RECEIVED');
        console.log(response);
        const userName = response.notification.request.content.data.userName;
        console.log(userName);
      }
    );
    return () => {
      subscription1.remove();
      subscription2.remove();
    };
  }, []);


  return (
    <View style={styles.container}>
      <Button
        title="Schedule Notification"
        onPress={scheduleNotificationHandler}
      />
      <Button
        title="Send Push Notification"
        onPress={sendPushNotificationHandler}
      />

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
      <Button
        title="Fetch Items"
        onPress={fetchAll}
      />
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
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextInput: {
    height: 40,
    borderWidth: 3,
    width: 300,
    backgroundColor:"#7fffd4",
    borderRadius:3,
},
});
