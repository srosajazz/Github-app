import React, { Component } from 'react';
import api from '~/services/api';

import {
  View, Text, TextInput, TouchableOpacity, StatusBar, AsyncStorage,
} from 'react-native';

import styles from './styles';
// import { async } from 'rsvp';
// import console = require('console');

export default class Welcome extends Component {
  // state
  state = {
    username: '',
  };

  // check username
  checkUserExists = async (username) => {
    const user = await api.get(`/users/${username}`);
    return user;
  };

  // Save username
  saveUser = async (username) => {
    await AsyncStorage.setItem('@Githuber:username', username);
  };

  // signIn
  signIn = async () => {
    const { username } = this.state;
    const { navigation } = this.props;

    try {
      await this.checkUserExists(username);
      await this.saveUser(username);

      navigation.navigate('Repositories');
    } catch (err) {
      console.tron.log('User does not exist');
    }
  };

  render() {
    // call user name
    const { username } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.text}>Please enter your github user name.</Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Type your user name"
            underlineColorAndroid="transparent"
            // username
            value={username}
            onChangeText={text => this.setState({ username: text })}
          />
          {/* username => onPress={this.signIn}> */}
          <TouchableOpacity style={styles.button} onPress={this.signIn}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
