import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';
import RequestListScreen from './screens/RequestListScreen';
import DonateListScreen from './screens/DonateListScreen';
import DonateScreen from './screens/DonateScreen';
import TaskScreen from './screens/TaskScreen';
import VolunteerListScreen from './screens/VolunteerListScreen';
import SplashScreenView from './components/SplashScreenView';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return <SplashScreenView />;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
          <Stack.Navigator>
            <Stack.Screen name="Root" component={BottomTabNavigator} />
            <Stack.Screen name="DonateList" component={DonateListScreen} />
            <Stack.Screen name="Donate" component={DonateScreen} />
            <Stack.Screen name="RequestList" component={RequestListScreen} />
            <Stack.Screen name="VolunteerList" component={VolunteerListScreen} />
            <Stack.Screen name="Task" component={TaskScreen} />
          </Stack.Navigator>
          {/* <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Root" component={BottomTabNavigator} />
            <Drawer.Screen name="Notifications" component={NotificationsScreen} />
          </Drawer.Navigator> */}
        </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
