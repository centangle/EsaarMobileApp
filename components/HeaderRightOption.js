import * as React from 'react';
import { View } from 'react-native';
import { Button, Text, Icon } from 'native-base';

export default function HeaderRightOption(props) {
  const { icon, label, onClick, navigation,navParams } = props;
  //console.log('props', navigation);
  return (
    <View>
      <Button iconLeft transparent onPress={()=>navigation.push(onClick, navParams)}>
        { icon ?<Icon name={icon} />:null }
        { label?<Text>{label}</Text>:null }
      </Button>
    </View>
  );
}
