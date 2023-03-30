import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View, Pressable, Text } from 'react-native';
import { scheduleNotificationHandler, sendPushNotificationHandler, Notif, } from './notif';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { init } from './sql';
import * as Notifications from 'expo-notifications';
import DeletedItems from './DeletedItems';
import CreateNewItem from './CreateNewItem';
import FetchItems from './FetchItems';
import ImgPicker from './ImagePicker';
const Stack = createNativeStackNavigator()


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

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Notifications', headerStyle: { backgroundColor: '#101820FF', }, headerTintColor: 'white' }}
        />
        <Stack.Screen
          name="Create"
          component={CreateNewItem}
          options={{ title: 'Create', headerStyle: { backgroundColor: '#101820FF', }, headerTintColor: 'white' }}
        />

      </Stack.Navigator>
    </NavigationContainer>


  );
}


const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <FetchItems/>
      <Pressable
        title="Go to Create screen"
        style={styles.button}
        onPress={() => navigation.navigate('Create')}
      ><Text style = {styles.text}>Go to Create screen</Text></Pressable>

      <StatusBar style="auto" />
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
  TextInput: {
    height: 40,
    borderWidth: 3,
    width: 300,
    backgroundColor: "#7fffd4",
    borderRadius: 3,
  },
  button: {
    marginTop: 20,
    borderWidth: 3,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    borderRadius:10,
    backgroundColor:"#7fffd4",
  },
  text:{
    fontSize:25
  }
});
