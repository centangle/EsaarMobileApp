import * as React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { Form, Picker, Icon } from 'native-base';
import Colors from '../constants/Colors';
import Style from '../constants/Style';

export default function QuantityField(props) {
  const { name } = props;
  const [text, setText] = React.useState('', '');
  const [quantity, selectQuantity] = React.useState('');
  const onQuantityChange = (v) => {
    selectQuantity(v);
  }
  return (
    <View style={[Style.outerShadow, Style.boxLayout, styles.quantityWrapper]}>
      <Text style={styles.text}>{name}</Text>
      <View style={styles.inputsWrapper}>
        <TextInput
          style={[Style.outerShadow, Style.boxLayout, styles.quantityInput]}
          placeholder="Quantity"
          onChangeText={text => setText(text)}
          defaultValue={text}
        />
        <Form>
          <Picker
            note
            mode="dropdown"
            iosHeader="Select Unit"
            placeholder="Select Unit"
            iosIcon={<Icon name="arrow-down" />}
            selectedValue={quantity}
            onValueChange={(value) => onQuantityChange(value)}
            style={styles.unitPicker}
          >
            <Picker.Item label="Kg" value="kg" />
            <Picker.Item label="Ton" value="ton" />
            <Picker.Item label="Mili Ton" value="mili-ton" />
          </Picker>
        </Form>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  quantityWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    paddingVertical: 5
  },
  quantityInput: {
    width: 80,
    padding: 10
  },
  text: {
    width: '24%',
    fontSize: 16,
    overflow: 'hidden'
  },
  inputsWrapper: {
    flexDirection: 'row',
    alignItems: 'center', //verticle align
    justifyContent: 'flex-end', //horizontal center
    width: '75%',
    // overflow: 'hidden'
  },
  unitPicker: {
    width: 145,
    overflow: 'hidden'
  }
});
