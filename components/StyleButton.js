import * as React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';
import Style from '../constants/Style';
import { Button } from 'native-base';

export default function StyleButton(props) {
  const { title, styling } = props;
  return (
    <Button primary><Text > Light </Text></Button>
  );
}

const styles = StyleSheet.create({
  btnWrapper: {
    width: 100,
    borderRadius: 14,
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    borderColor: 'transparent',
    borderWidth: 1,
  },
  text: {
    fontSize: 16,
    textAlign: 'center'
  }
});
