import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput } from 'react-native';
import Style from '../constants/Style';
import { Button, Toast } from 'native-base';
import { connect } from 'react-redux';
import { emailSignInStart,signUpStart } from '../common/redux/user/user.actions';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null
    }

    this.props.navigation.setOptions({
      title: 'Login'
    });
  }

  handleSubmit() {
    const { email, password } = this.state;
    const {emailSignInStart} = this.props;

    if (this.validateLoginForm()) {
      emailSignInStart({username:email,password:password,grant_type:"password"});
    }
  }

  validateEmail = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      return false;
    }
    else {
      return true;
    }
  }

  validateLoginForm(){
    const { email, password } = this.state;
    if (!this.validateEmail(email)) {
      Toast.show({
        text: 'Please enter valid email'
      });
      return false;
    }
    
    if(password==='' || password===null){
      Toast.show({
        text: 'Please enter password'
      });
      return false;
    }else{
      return true;
    }
  }

  render() {
    return (
      <ScrollView style={[Style.pageContainer]}>
        <View style={styles.formContainer}>
          <TextInput
            style={[Style.outerShadow, Style.boxLayout, styles.quantityInput, Style.mb2]}
            placeholder="Email"
            onChangeText={email => { this.setState({ email }) }}
            defaultValue={this.state.email}
          />
          <TextInput
            style={[Style.outerShadow, Style.boxLayout, styles.quantityInput, Style.mb2]}
            placeholder="Password"
            onChangeText={password => this.setState({ password })}
            defaultValue={this.state.password}
          />
          <Button onPress={() => this.handleSubmit()} block style={[Style.boxLayout, Style.mv3]}><Text style={Style.textWhite}>Login</Text></Button>
        </View>
      </ScrollView>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  emailSignInStart: (emailAndPassword) => dispatch(emailSignInStart(emailAndPassword)),
  signUpStart:(emailAndPassword) => dispatch(signUpStart(emailAndPassword)),
});

export default connect(null, mapDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({
  formContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    padding: 20
  }
});
