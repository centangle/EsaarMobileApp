import * as React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Style from '../../constants/Style';
import { Button, Icon } from 'native-base';
import ImagePickerOption from '../../components/ImagePickerOption';
import { connect } from 'react-redux';

class AddOrganisationScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      Name: '',
      NativeName: '',
      Description: '',
      ImageUrl: '',
      ImageInBase64: ''
    }

    this.props.navigation.setOptions({
      title: 'Add Organisation'
    });
  }

  selectedImages(images) {
    console.log('selected images', images)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.organization !== this.props.organization) {
      if(!this.props.organization.form.modal){
        this.props.navigation.pop();
      }
    }
  }

  addOrganisation() {
    this.props.dispatch({
      type: 'ADD_ORGANIZATION_START',
      payload: {
        "Name": this.state.Name,
        "NativeName": this.state.NativeName,
        "Description": this.state.Description,
        "ImageUrl": this.state.ImageUrl,
        "ImageInBase64": this.state.ImageInBase64,
        "Id": 0
      }
    })
  }

  render() {
    return (
      <ScrollView style={Style.pageContainer}>
        <TextInput
          style={[Style.outerShadow, Style.boxLayout, styles.formInput]}
          placeholder="Name"
          onChangeText={text => this.setState({ Name: text })}
          defaultValue={this.state.Name}
        />
        <TextInput
          style={[Style.outerShadow, Style.boxLayout, styles.formInput]}
          placeholder="Native Name"
          onChangeText={text => this.setState({ NativeName: text })}
          defaultValue={this.state.NativeName}
        />
        <TextInput
          style={[Style.outerShadow, Style.boxLayout, styles.formInput]}
          placeholder="Description"
          onChangeText={text => this.setState({ Description: text })}
          defaultValue={this.state.Description}
        />
        <View style={styles.formInput}>
          <Text style={[Style.mb2, Style.ml1, Style.colorGray]}>Select Image</Text>
          <ImagePickerOption multiImage={false} isBase64={true} onChooseImage={this.selectedImages} />
        </View>
        <Button block onPress={() => this.addOrganisation()}>
          <Icon name={'add'} />
          <Text style={[Style.textWhite, Style.fontSizeNormal]}>Add Organisation</Text>
        </Button>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  const { organization } = state;
  //console.log('org:',organization);
  return {
    organization: organization
  }
}

export default connect(mapStateToProps)(AddOrganisationScreen);

const styles = StyleSheet.create({
  formInput: {
    marginBottom: 15
  }
});
