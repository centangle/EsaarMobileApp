import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { connect } from 'react-redux';

import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';
import RequestListScreen from './screens/RequestListScreen';
import DonateListScreen from './screens/DonateListScreen';
import DonateScreen from './screens/DonateScreen';
import TaskScreen from './screens/TaskScreen';
import VolunteerListScreen from './screens/VolunteerListScreen';
import SplashScreenView from './components/SplashScreenView';
import LoginScreen from './screens/LoginScreen';
import SettingsScreen from './screens/SettingsScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MainApp(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        setInitialNavigationState(await getInitialState());
      } catch (e) {
        console.warn(e);
      } finally {
        setLoadingComplete(true);
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  const { user } = props;
  const isLoggedin = user ? true: false;
  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
      <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
        <Stack.Navigator>
          {
            !isLoggedin ?
              <Stack.Screen name="Root" component={LoginScreen} /> :
              <Stack.Screen name="Root" component={BottomTabNavigator} />
          }
          <Stack.Screen name="DonateList" component={DonateListScreen} />
          <Stack.Screen name="Donate" component={DonateScreen} />
          <Stack.Screen name="RequestList" component={RequestListScreen} />
          <Stack.Screen name="VolunteerList" component={VolunteerListScreen} />
          <Stack.Screen name="Task" component={TaskScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
        {/* <Drawer.Navigator initialRouteName="Home">
  <Drawer.Screen name="Root" component={BottomTabNavigator} />
  <Drawer.Screen name="Notifications" component={NotificationsScreen} />
</Drawer.Navigator> */}
      </NavigationContainer>
    </View>

  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser
  }
}
export default connect(mapStateToProps)(MainApp);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
