import React from 'react';
import PropTypes from 'prop-types';

import { View } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '~/components/Header';

// import { Container } from './styles';

const Repositories = () => (
  <View>
    <Header title="Repositories" />
  </View>
);

const TabIcon = ({ tintColor }) => <Icon name="blist-alt" size={20} color={tintColor} />;
TabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Repositories.navigationOptions = {
  tabBarIcon: TabIcon,
};

export default Repositories;
