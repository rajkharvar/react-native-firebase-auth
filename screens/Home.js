import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'native-base';
import * as firebase from 'firebase';

class Home extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: ''
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(authenticate => {
      if (authenticate) {
        this.setState({
          email: authenticate.email,
          name: authenticate.displayName
        });
      } else {
        this.props.navigation.navigate('Welcome');
      }
    });
  }

  signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.navigation.navigate('Welcome');
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 30 }}>Welcome, {this.state.name}</Text>
        <Text style={{ fontSize: 24 }}>Email: {this.state.email}</Text>
        <Button danger full onPress={() => this.signOut()}>
          <Text style={{ color: '#fff' }}>Sign Out</Text>
        </Button>
      </View>
    );
  }
}
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40
  }
});
