import * as React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Style from '../constants/Style';
import { Button, Icon, Text } from 'native-base';
import { signOutStart } from '../common/redux/user/user.actions';
import { connect } from 'react-redux';

function SettingsScreen({navigation, signOutStart}) {
  console.log(navigation);
  const signout = () =>{
    signOutStart();
    navigation.pop();
    //navigation.navigate('LoginRoot');
  }

  return (
    <ScrollView style={Style.pageContainer}>
      <Button onPress={()=>signout()} block danger large iconRight><Text>Signout</Text><Icon name='exit' /></Button>
    </ScrollView>
  );
}

const mapDispatchToProps = dispatch => ({
  signOutStart: () => dispatch(signOutStart())
});

export default connect(null, mapDispatchToProps)(SettingsScreen);

const styles = StyleSheet.create({
});
