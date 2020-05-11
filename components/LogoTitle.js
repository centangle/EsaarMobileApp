import * as React from 'react';
import { Image, View } from 'react-native';

export default function LogoTitle(props) {
  return (
        <Image
          resizeMode={'contain'}
          source={require('./../assets/icons/logo-orange.png')}
          style={{ height: 40}}
        />
  );
}
