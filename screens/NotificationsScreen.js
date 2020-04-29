import * as React from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Style from '../constants/Style';

export default function NotificationsScreen() {

  const notifications = [1, 2, 3, 4]
  return (
    <ScrollView style={Style.pageContainer}>
      {
        notifications.map((notif, i) => {
          return (
            <View key={i} style={[Style.boxLayout, Style.outerShadow, styles.notifItem]}>
              <Image resizeMode={'contain'} style={styles.image} source={require('./../assets/images/saylani.png')} />
              <Text>New Message from <Text style={Style.bold}>Saylani Foundation</Text></Text>
            </View>
          );
        })
      }
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  notifItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 10
  },
  image: {
    width: 40,
    marginRight: 10
  }
});
