import * as React from "react";
import {Image} from "react-native";

export default function LogoTitle() {
  return (
    <Image
      resizeMode="contain"
      source={require("./../assets/icons/logo-orange.png")}
      style={{
        height: 40,
        resizeMode: "contain",
      }}
    />
  );
}
