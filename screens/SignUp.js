import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Form, Label, Item, Input } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as firebase from 'firebase';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      fname: '',
      lname: ''
    };
  }

  signUp = (email, password, fname, lname) => {
    if (email !== '' && password !== '' && fname !== '' && lname !== '') {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(authenticate => {
          return authenticate.user
            .updateProfile({
              displayName: fname + ' ' + lname
            })
            .then(() => {
              this.props.navigation.navigate('Home');
            });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      alert('All fields are mandatory');
    }
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View
            style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}
          >
            <AntDesign name='adduser' size={150} style={{ color: '#111' }} />
          </View>
          <KeyboardAvoidingView behavior='padding' style={{ flex: 3 }}>
            <Form>
              <Item floatingLabel>
                <Label>First Name</Label>
                <Input
                  autoCapitalize='none'
                  autoCorrect={false}
                  onChangeText={fname => this.setState({ fname })}
                />
              </Item>
              <Item floatingLabel>
                <Label>Last Name</Label>
                <Input
                  autoCapitalize='none'
                  autoCorrect={false}
                  onChangeText={lname => this.setState({ lname })}
                />
              </Item>
              <Item floatingLabel>
                <Label>E-mail</Label>
                <Input
                  autoCapitalize='none'
                  autoCorrect={false}
                  onChangeText={email => this.setState({ email })}
                />
              </Item>
              <Item floatingLabel>
                <Label>Password</Label>
                <Input
                  autoCapitalize='none'
                  secureTextEntry={true}
                  autoCorrect={false}
                  onChangeText={password => this.setState({ password })}
                />
              </Item>

              <TouchableOpacity
                onPress={() =>
                  this.signUp(
                    this.state.email,
                    this.state.password,
                    this.state.fname,
                    this.state.lname
                  )
                }
                style={{
                  borderWidth: 1,
                  borderColor: '#111',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 20
                }}
              >
                <Text style={{ paddingVertical: 10, fontSize: 18 }}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </Form>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('SignIn')}
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
                  Already a Member? Login In
                </Text>
              </View>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1
    // backgroundColor: '#fff'
  }
});
