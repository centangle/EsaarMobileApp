import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';

import Colors from '../constants/Colors';
import { Image, View } from 'react-native';

export default function TabBarIcon(props) {
  const { home, image } = props;
  return (
    home ?
      <View style={{width: 60}}>
        <Image
          resizeMode={'contain'}
          source={image}
          style={{ height: 60,aspectRatio: 1, top: 7, alignSelf: 'center' }}
        />
        <View style={{ borderBottomWidth: 5, borderColor: Colors.themeColor, top: 0 }}></View>
      </View> :
      <Ionicons
        name={props.name}
        size={30}
        style={{ marginBottom: -3 }}
        color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
  );
}
