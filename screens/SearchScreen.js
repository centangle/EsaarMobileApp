import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput } from 'react-native';
import Style from '../constants/Style';

export default function SearchScreen() {
  const [text, setText] = React.useState('', '');
  return (
    <ScrollView style={Style.pageContainer}>
      <TextInput
          style={[Style.outerShadow, Style.boxLayout, styles.quantityInput]}
          placeholder="Search"
          onChangeText={text => setText(text)}
          defaultValue={text}
        />
    </ScrollView>
  );
}


const styles = StyleSheet.create({
});
