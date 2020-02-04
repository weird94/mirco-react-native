import React from 'react';
import { TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import { CONTAINER } from '@crgt/dynamic-rn';

const Link = ({ navigation, url, children, ...extProps }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.95}
      {...extProps}
      onPress={() => {
        navigation.navigate(CONTAINER, { url });
      }}
    >
      {children}
    </TouchableOpacity>
  );
};

export default withNavigation(Link);
