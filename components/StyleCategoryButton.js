import * as React from "react";
import {Image, View, Text, StyleSheet} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import Colors from "../constants/Colors";
import Style from "../constants/Style";

export default function StyleCategoryButton(props) {
  const {icon, title, selected, btnStyle} = props;
  return (
    <View
      style={[
        Style.outerShadow,
        styles.btnWrapper,
        selected ? styles.innerShadow : null,
        btnStyle,
      ]}
    >
      {icon ? (
        <Image resizeMode={"contain"} source={icon} style={styles.image} />
      ) : null}
      {title ? <Text style={styles.text}>{title}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  btnWrapper: {
    width: 100,
    padding: 12,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fbfbfb",
    borderColor: "transparent",
    borderWidth: 1,
  },
  innerShadow: {
    backgroundColor: "transparent",
    overflow: "hidden",
    shadowRadius: 5,
    shadowOpacity: 0.2,
    shadowOffset: {width: 6, height: 6},
    borderColor: Colors.defaultBackground, //'#fff'
    ...Platform.select({
      android: {
        backgroundColor: "#eee",
      },
    }),
  },
  image: {
    height: 40,
    width: 40,
    marginBottom: 6,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
  },
});
