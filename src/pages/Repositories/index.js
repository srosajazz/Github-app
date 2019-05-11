import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '~/services/api';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '~/components/Header';
import styles from '~/components/Header/styles';
import {
  View, Text, AsyncStorage, ActivityIndicator,
} from 'react-native';
// import styles from './styles';

const TabIcon = ({ tintColor }) => <Icon name="blist-alt" size={20} color={tintColor} />;
TabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

export default class Repositories extends Component {
  static navigationOptions = {
    tabBarIcon: TabIcon,
  };

  state = {
    data: [],
    loading: true,
  };

  async componentDidMount() {
    const username = await AsyncStorage.getItem('@Githuber:username');
    const { data } = await api.get(`/users/${username}/repos`);

    this.setState({ data, loading: false });
  }

  renderList = () => (
    <Text>List</Text>
  );

  render() {
    const { loading } = this.state;
    return (
      <View>
        <Header title="Repositories" />
        {loading ? <ActivityIndicator style={styles.loading} /> : this.renderList()}
      </View>
    );
  }
}
