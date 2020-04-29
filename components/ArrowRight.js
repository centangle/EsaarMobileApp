import * as React from 'react';
import { Image } from 'react-native';

export default function TabBarIcon(props) {
  const { blue } = props;
  return <Image
  resizeMode={'contain'}
  source={
     blue ?
      require('./../assets/icons/right-arrow-blue.png')
      : require('./../assets/icons/right-arrow.png')
    }
  style={{position: 'absolute',
  right: 15,
  top:15}}
/>;
}
