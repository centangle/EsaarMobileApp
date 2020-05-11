import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput } from 'react-native';
import Style from '../constants/Style';
import { Button, Toast, Row, Col, Spinner, Left } from 'native-base';
import { connect } from 'react-redux';
import { emailSignInStart, signUpStart } from '../common/redux/user/user.actions';
import Colors from '../constants/Colors';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      loginMode: true,
      email: null,
      password: null,
      name: null,
      mobile: null,
      _email: null,
      _password: null,
    }

    this.props.navigation.setOptions({
      title: 'Login / Signup'
    });
  }

  componentDidUpdate(prevProps, prevState) {
    
    if (prevProps.user !== this.props.user) {
      console.log(this.props.user)
      const {user} = this.props;
      if(user.error!=null){
        //console.log('error arrives')
        this.setState({
          isLoading: false
        });
        Toast.show({
          text: user.error.error_description || 'Please enter valid info!',
          duration: 5000
        })
      }
    }
  }

  handleSubmit() {
    const { email, password } = this.state;
    const { emailSignInStart } = this.props;
    this.setState({
      isLoading: true
    });
    if (this.validateLoginForm()) {
      emailSignInStart({ username: email, password: password, grant_type: "password" });
    }
  }

  handleRegisterSubmit() {
    const { name, mobile, _email, _password } = this.state;
    const { signUpStart } = this.props;
    this.setState({
      isLoading: true
    });
    if (this.validateRegisterForm()) {
      signUpStart({ Email: _email, Password: _password, ConfirmPassword: _password, MobileNo: mobile, Name: name });
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

  validateLoginForm() {
    const { email, password } = this.state;
    if (!this.validateEmail(email)) {
      Toast.show({
        text: 'Please enter valid email'
      });
      this.showLoader(false);
      return false;
    }

    if (password === '' || password === null) {
      Toast.show({
        text: 'Please enter password'
      });
      this.showLoader(false);
      return false;
    } else {
      return true;
    }
  }

  validateRegisterForm() {
    const { _email, _password } = this.state;
    if (!this.validateEmail(_email)) {
      Toast.show({
        text: 'Please enter valid email'
      });
      this.showLoader(false);
      return false;
    }

    if (_password === '' || _password === null) {
      Toast.show({
        text: 'Please enter password'
      });
      this.showLoader(false);
      return false;
    } else {
      return true;
    }
  }

  formMode(mode) {
    this.setState({
      loginMode: mode == 'login' ? true : false
    })
  }

  showLoader(mode){
    this.setState({
      isLoading: mode
    });
  }

  render() {
    return (
      <ScrollView style={[Style.pageContainer]}>
        <Row>
          <Col>
            <Button style={[styles.headingBtn, this.state.loginMode === 'login' ? styles.active : '']} block transparent onPress={() => this.formMode('login')}><Text style={Style.fontSizeNormal}>Login</Text></Button>
          </Col>
          <Col>
            <Button style={[styles.headingBtn, this.state.loginMode === 'signup' ? styles.active : '']} block transparent onPress={() => this.formMode('signup')}><Text style={Style.fontSizeNormal}>Signup</Text></Button>
          </Col>
        </Row>
        
        <View style={styles.formContainer}>
          {this.state.loginMode ? <View>
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
              secureTextEntry={true}
            />
            <Button onPress={() => this.handleSubmit()} block style={[Style.boxLayout, Style.mv3]}><Text style={Style.textWhite}>Login</Text></Button>
          </View> : <View>
              <TextInput
                style={[Style.outerShadow, Style.boxLayout, styles.quantityInput, Style.mb2]}
                placeholder="Display Name"
                onChangeText={name => { this.setState({ name }) }}
                defaultValue={this.state.name}
              />
              <TextInput
                style={[Style.outerShadow, Style.boxLayout, styles.quantityInput, Style.mb2]}
                placeholder="Mobile"
                onChangeText={mobile => { this.setState({ mobile }) }}
                defaultValue={this.state.mobile}
              />
              <TextInput
                style={[Style.outerShadow, Style.boxLayout, styles.quantityInput, Style.mb2]}
                placeholder="Email"
                onChangeText={_email => { this.setState({ _email }) }}
                defaultValue={this.state._email}
              />
              <TextInput
                style={[Style.outerShadow, Style.boxLayout, styles.quantityInput, Style.mb2]}
                placeholder="Password"
                onChangeText={_password => this.setState({ _password })}
                defaultValue={this.state._password}
                secureTextEntry={true}
              />
              <Button onPress={() => this.handleRegisterSubmit()} block style={[Style.boxLayout, Style.mv3]}><Text style={Style.textWhite}>Register</Text></Button>
            </View>}
            <Image resizeMode={'contain'} style={styles.logo} source={require('./../assets/icon.png')} />
        </View>
        {this.state.isLoading?<Spinner style={styles.spinner} color={Colors.themeColorPrimary} />:null}
      </ScrollView>
    );
  }
}

const mapState = (state) => {
  const { user } = state;
  return {
    user
  }
}

const mapDispatchToProps = dispatch => ({
  emailSignInStart: (emailAndPassword) => dispatch(emailSignInStart(emailAndPassword)),
  signUpStart: (emailAndPassword) => dispatch(signUpStart(emailAndPassword)),
});

export default connect(mapState, mapDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({
  formContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    paddingTop: 100,
    paddingHorizontal: 30
  },
  headingBtn: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    borderRadius: 0,
    marginHorizontal: 5
  },
  active: {
    // borderBottomColor: Colors.themeColor,
  },
  logo:{
    marginTop: 15,
width: 150,
alignSelf: 'center'
  },
  spinner:{
    position: 'absolute',
    right: 0,
    left: 0,
    top: '50%'
  }
});
