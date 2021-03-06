/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react'
import {View, Text} from 'react-native'

import firebase from 'react-native-firebase'
import Button from 'react-native-button'

import Login from './components/Login'

export default class App extends Component {
  constructor() {
    super();
    this.unsubscriber = null; // NULL FOR THE FIRST TIME
    this.state = {
      user: null,
    };
  }
  componentDidMount() { // CREATE LISTENER
    this.unsubscriber = firebase.auth().onAuthStateChanged((user) => {
      this.setState({ user });
    });
  }
  componentWillUnmount() { // REMOVE LISTENER
    if (this.unsubscriber) {
      this.unsubscriber();
    }
  }
  onSignout = () => {
    firebase.auth().signOut()
      .then(() => {
        console.log(`Signed out`);
      }).catch((error) => {
        console.log(`Signing out fail with error: ${error}`);
      })
  }
  render() {

    // IF THERE IS NO LOGGED IN USER
    if (!this.state.user) {
      return (
        <View>
          <Login />
        </View>
      );
    }

    // IF USER LOGGED IN
    return (
      <View>
        <Text>Welcome to my awesome app!</Text>
        <Button 
          containerStyle={{ padding: 10, margin: 10, borderRadius: 4, backgroundColor: 'red' }}
          style={{ fontSize: 17, color: 'white' }}
          onPress={this.onSignout}
          >Sign Out</Button>
      </View>
    );
  }
}
