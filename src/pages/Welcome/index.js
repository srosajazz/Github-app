import React, { Component } from 'react';
import api from '~/services/api';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  AsyncStorage,
} from 'react-native';

import styles from './styles';

export default class Welcome extends Component {
  // state
  state = {
    username: '',
    loading: false,
    error: false,
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

    this.setState({ loading: true });

    try {
      await this.checkUserExists(username);
      await this.saveUser(username);

      navigation.navigate('User');
    } catch (err) {
      this.setState({ loading: false, error: true });
    }
  };

  render() {
    // call user name
    const { username, loading, error } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.text}>Please enter your github user name.</Text>
        {error && <Text style={styles.error}>User does not exist.</Text>}
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
            {/* <Text style={styles.buttonText}>Start</Text> */}
            {loading ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <Text style={styles.buttonText}>Start</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
