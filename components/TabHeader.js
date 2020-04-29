import * as React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import { Icon } from 'native-base';

export default function TabHeader(props) {
  const { title } = props;
  return (
      <Text>{title}</Text>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    height: 50,
    width: 100
  }
})
