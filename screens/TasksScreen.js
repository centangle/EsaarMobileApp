import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Style from '../constants/Style';
import { Button, Image } from 'native-base';

export default function TasksScreen() {
  return (
    <ScrollView style={[Style.pageContainer]}>
      <View>
        <Text style={[Style.heading, Style.mv1]}>
          Select Organization
        </Text>
        <Button style={Style.outerShadow, Style.boxLayout}>
          <Text>Button</Text>
        </Button>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    
  },
  contentContainer: {
    paddingTop: 15,
  }
});
