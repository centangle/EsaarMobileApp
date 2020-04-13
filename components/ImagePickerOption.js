import * as React from 'react';
import { Button, Image, View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import Style from '../constants/Style';
import { Icon } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class ImagePickerOption extends React.Component {
  state = {
    images: [],
  };

  render() {
    let { image } = this.state;
    return (
      <View style={styles.container}>
        <View style={[Style.outerShadow, Style.boxLayout, styles.itemWrapper]}>
          <TouchableOpacity onPress={this._pickImage}>
            <Icon style={styles.addIcon} name={'add'} />
          </TouchableOpacity>
        </View>
        {this.state.images &&
          this.state.images.map((image, i) => {
            return (
              <View key={i} style={[Style.outerShadow, Style.boxLayout, styles.itemWrapper]}>
                <Image resizeMode={'cover'} source={{ uri: image }} style={styles.imageStyle} />
              </View>
            )
          })
        }
      </View>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ images: [...this.state.images, result.uri] });
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  itemWrapper: {
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10
  },
  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 20
  },
  addIcon: { fontSize: 80, color: '#666' }
});
