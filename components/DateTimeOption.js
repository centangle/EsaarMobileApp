import React, { useState } from 'react';
import { View, Button, Platform, StyleSheet, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Style from '../constants/Style';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'native-base';

export default function DateTimeOption(props) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const dateTimeSelected = () =>{
    console.log(date);
    setShow(false);
  }
  return (
    <View>
      <View style={styles.container}>
        <View style={[Style.boxLayout, Style.outerShadow, Style.innerShadow, styles.btn]}>
          <TouchableOpacity onPress={showDatepicker}>
            <Text>Choose Date</Text>
          </TouchableOpacity>
        </View>
        <View style={[Style.boxLayout, Style.outerShadow, Style.innerShadow, styles.btn]}>
          <TouchableOpacity onPress={showTimepicker}>
            <Text>Choose Time:</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        {show && (
          <View style={styles.datetime}>
            <TouchableOpacity onPress={()=>dateTimeSelected()}><Icon style={styles.checkmarkIcon} name={'checkmark'} /></TouchableOpacity>
            <DateTimePicker
              testID="dateTimePicker"
              timeZoneOffsetInMinutes={0}
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  btn: {
    height: 40,
    flex: 1,
    marginHorizontal: 5
  },
  datetime: {
    position: 'absolute',
    bottom: 0,
    height: undefined,
    width: '100%',
    backgroundColor: '#fff'
  },
  checkmarkIcon:{
    fontSize: 40,
    alignSelf: 'flex-end',
    right: 20
  }
});
