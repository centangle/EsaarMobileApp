import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';

export function StyledHomeButton(props) {
  const {image, text, isFull} = props;
  return (
    <TouchableOpacity style={[styles.btnWrapper, isFull ? styles.btnWrapperFull : null]} onPress={() => props.goToScreen()}>
      <Image
        style={[styles.navImage, isFull ? styles.fullBtnImage : null]}
        source={image}
      />
<Text style={styles.navText}>{text}</Text>
    </TouchableOpacity>);
}

const styles = StyleSheet.create({
  btnWrapper: {
    marginHorizontal: 15,
    marginVertical: 10,
    width: 150,
    padding: 5,
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
  },
  btnWrapperFull: {
    width: '100%',
    marginHorizontal: 22,
    flex: 1,
    flexDirection: 'row'
  },
  navImage: {
    aspectRatio: 1,
    width: 120,
    height: undefined
  },
  fullBtnImage: {
    marginHorizontal: 10,
    width: 100
  },
  navText: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 0,
    fontSize: 18
  }
});
