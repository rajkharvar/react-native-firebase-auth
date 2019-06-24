import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { Form, Input, Item, Label } from 'native-base';
import * as firebase from 'firebase';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  login = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.navigation.navigate('Home');
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View
            style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}
          >
            <FontAwesome name='user-circle' size={150} />
            <Text style={{ fontSize: 30 }}>Login</Text>
          </View>
          {/* <View style={{ flex: 3 }}> */}
          <KeyboardAvoidingView behavior='padding' enabled style={{ flex: 3 }}>
            <Form>
              <Item
                floatingLabel
                style={{ borderColor: '#111', borderWidth: 3 }}
              >
                <Label style={{ color: '#333' }}>E-mail</Label>
                <Input
                  autoCorrect={false}
                  autoCapitalize='none'
                  onChangeText={email => this.setState({ email })}
                />
              </Item>
              <Item floatingLabel>
                <Label style={{ color: '#333' }}>Password</Label>
                <Input
                  secureTextEntry
                  autoCorrect={false}
                  autoCapitalize='none'
                  onChangeText={password => this.setState({ password })}
                />
              </Item>
              <TouchableOpacity
                onPress={() =>
                  this.login(this.state.email, this.state.password)
                }
                style={{
                  borderColor: '#111',
                  borderWidth: 2,
                  marginHorizontal: 10,
                  marginTop: 20,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <AntDesign name='login' size={50} style={{ color: '#111' }} />
              </TouchableOpacity>
            </Form>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('SignUp')}
              style={{
                justifyContent: 'center',
                marginTop: 20,
                alignItems: 'center'
              }}
            >
              <View style={{ borderBottomWidth: 1, borderBottomColor: '#333' }}>
                <Text
                  style={{
                    fontSize: 18
                  }}
                >
                  Not a Member? Sign Up
                </Text>
              </View>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
