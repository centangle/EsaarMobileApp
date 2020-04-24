import * as React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { StyledHomeButton } from '../components/StyledHomeButton';

export default function HomeScreen(props) {
  const goToScreen = (screen) => {
    //console.log('go to detail screen')
    props.navigation.push(screen);
  }
  return (
    <View style={styles.container}>
      <View style={styles.navWrapper}>
        <StyledHomeButton text={'Donate'} image={require('./../assets/icons/donate.png')} goToScreen={() => goToScreen('DonateList')} />
        <StyledHomeButton text={'Requests'} image={require('./../assets/icons/request.png')} goToScreen={() => goToScreen('Requests')} />
        {/* <StyledHomeButton text={'Request'} image={require('./../assets/icons/request.png')} goToScreen={() => goToScreen('RequestList')} /> */}
      </View>
      <View style={styles.navWrapper}>
        <StyledHomeButton isFull={true} text={'Register as Volunteer'} image={require('./../assets/icons/volunteer.png')} goToScreen={() => goToScreen('VolunteerList')} />
      </View>
      <View style={styles.navWrapper}>
        <StyledHomeButton text={'Organizations'} goToScreen={() => goToScreen('Organizations')} image={require('./../assets/icons/donate.png')}/>
        <StyledHomeButton text={'Settings'} goToScreen={() => goToScreen('Settings')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  navWrapper: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
});
