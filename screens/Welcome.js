import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Button } from 'native-base';
import * as firebase from 'firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';

class Welcome extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isUserLoggedIn: false
    };
  }

  // Check if the user is already Logged
  componentDidMount() {
    firebase.auth().onAuthStateChanged(authenticate => {
      if (authenticate) {
        this.props.navigation.navigate('Home');
        this.setState({ isUserLoggedIn: true });
      } else {
        this.setState({ isLoading: false });
      }
    });
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.isLoading && (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fff'
            }}
          >
            <ActivityIndicator size='large' style={{ color: '#2F363F' }} />
          </View>
        )}
        {!this.state.isLoading && (
          <View style={{ flex: 1 }}>
            <View
              style={{
                flex: 2,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <FontAwesome
                name='user'
                size={150}
                style={{
                  color: '#111'
                }}
              />
            </View>
            <View
              style={{
                flex: 2,
                justifyContent: 'flex-end'
              }}
            >
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.props.navigation.navigate('SignIn')}
              >
                <Text style={styles.buttonText}>Sign In</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { marginVertical: 40 }]}
                onPress={() => this.props.navigation.navigate('SignUp')}
              >
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  }
}
export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#111',
    marginHorizontal: 10
  },
  buttonText: { fontSize: 30, color: '#111', paddingVertical: 10 }
});
