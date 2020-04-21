import * as React from 'react';
import { View } from 'react-native';
import { Button, Text, Icon } from 'native-base';

export default function HeaderRightOption(props) {
  const { icon, label, onClick, navigation } = props;
  //console.log('props', navigation);
  return (
    <View>
      <Button transparent onPress={()=>navigation.push(onClick)}>
        { icon ?<Icon name={icon} />:null }
        { label?<Text>{label}</Text>:null }
      </Button>
    </View>
  );
}
