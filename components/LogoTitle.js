import * as React from "react";
import {Image, View, Text} from "react-native";

export default function LogoTitle() {
  return (
    <Image
      resizeMode="contain"
      source={require("./../assets/icons/logo-blue.png")}
      style={{
        height: 40,
        ...Platform.select({
          android: {
            height: 50,
            width: 100,
          },
        }),
      }}
    />
  );
}
