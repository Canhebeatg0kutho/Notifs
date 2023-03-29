import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View, Alert, Platform, TextInput } from 'react-native';
import { scheduleNotificationHandler, sendPushNotificationHandler, Notif, } from './notif';
import { init } from './sql';
import * as Notifications from 'expo-notifications';
import DeletedItems from './DeletedItems';
import CreateNewItem from './CreateNewItem';
import FetchItems from './FetchItems';
import ImgPicker from './ImagePicker';

export default function App() {
  useEffect(() => {
    init()
    try {
      console.log('Initialized database');
    } catch (err) {
      console.log('Initializing db failed.');
      console.log(err);
    };
    <Notif />
  }, []);

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
      <ImgPicker/>
      <Button
        title="Schedule Notification"
        onPress={scheduleNotificationHandler}
      />
      <Button
        title="Send Push Notification"
        onPress={sendPushNotificationHandler}
      />
     <FetchItems/>
     <CreateNewItem/>
     <DeletedItems/>
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
    backgroundColor: "#7fffd4",
    borderRadius: 3,
  },
});
