import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View, Alert, Platform } from 'react-native';
import { init, insertItem, fetchItems } from './sql';
import { scheduleNotificationHandler, sendPushNotificationHandler, Notif, Sub1, Sub2 } from './notif';
import * as Notifications from 'expo-notifications';
export default function App() {
  useEffect(() => {
    <Notif />
  }, []);

  const addItem = async () => {
    const dbResult = await insertItem(  // creates a new record in the sql database
      { title: 'My FIrst SQL record' }
    )
    console.log(dbResult)
  }

  const fetchAll = async() => {
    const dbResult = await fetchItems() // returns an array of sql objects {id: title}
    console.log(dbResult)

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
});
