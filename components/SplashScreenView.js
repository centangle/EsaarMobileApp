import * as React from 'react';
import { Image, View, StyleSheet, Animated } from 'react-native';
import Style from '../constants/Style';

export default function SplashScreenView(props) {
  const [fadeAnim] = React.useState(new Animated.Value(0))  // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 5000,
      }
    ).start();
  }, [])

  return (
    <View style={[Style.defaultBg, styles.container]}>
      <Animated.View                 // Special animatable View
        style={{
          ...props.style,
          opacity: fadeAnim,         // Bind opacity to animated value
        }}
      >
        <Image
          resizeMode={'contain'}
          source={require('./../assets/icons/logo-orange.png')}
          style={{ height: 50 }}
        />
      </Animated.View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 999999,
    width: '100%',
    height: '100%'
  }
});