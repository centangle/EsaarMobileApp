import * as React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { Form, Picker, Icon } from 'native-base';
import Colors from '../constants/Colors';
import Style from '../constants/Style';
import { connect } from 'react-redux';

function QuantityField(props) {
  const { item } = props;
  const {Name, quantity} = item;
  const [itemUnit, selectUnit] = React.useState('');
  const onUnitChange = (v) => {
    selectUnit(v);
  }

  const handleChange = (item,quantity) =>{
    props.dispatch({
      type:'QUANTITY_CHANGED',
      payload:{...item,quantity:quantity?parseFloat(quantity):0}})
 }
  
  return (
    <View style={[Style.outerShadow, Style.boxLayout, styles.quantityWrapper]}>
      <Text style={styles.text}>{Name}</Text>
      <View style={styles.inputsWrapper}>
        <TextInput
          style={[Style.outerShadow, Style.boxLayout, styles.quantityInput]}
          placeholder="Quantity"
          onChangeText={text => handleChange(item, text)}
          defaultValue={quantity?quantity.toString():''}
          keyboardType={'numeric'}
          maxLength={3}
        />
        <Form>
          <Picker
            note
            mode="dropdown"
            iosHeader="Select Unit"
            placeholder="Select Unit"
            iosIcon={<Icon name="arrow-down" />}
            selectedValue={itemUnit}
            onValueChange={(value) => onUnitChange(value)}
            style={styles.unitPicker}
          >
            {
              item.ItemUOMs.map(uom=>{
                return <Picker.Item key={uom.Id} label={uom.Name} value={uom.Id} />
              })
            }
          </Picker>
        </Form>
      </View>
    </View>
  );
}

export default connect()(QuantityField);

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
