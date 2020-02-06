import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  withNavigation,
  NavigationInjectedProps,
  NavigationParams,
  NavigationScreenProp,
  NavigationRoute
} from 'react-navigation';
import { CONTAINER } from '@crgt/dynamic-rn';

type NavigationProp = NavigationScreenProp<NavigationRoute<NavigationParams>, NavigationParams>;

export const checkIsContainerNavigation = (navigation: NavigationProp) => {
  const parentState = navigation.dangerouslyGetParent()?.state;
  if (parentState && parentState.routes) {
    return parentState.routes.some(route => route.routeName === CONTAINER);
  }
  return false;
};

const navigateToUrl = (navigation: NavigationProp, url: string) => {
  navigation.navigate(CONTAINER, { url });
};

export const tryNavigate = (navigation: NavigationProp, url: string) => {
  const parentNavigation = navigation.dangerouslyGetParent();
  if (!parentNavigation) {
    console.error('Error from @crgt/gtrn-link util [tryNavigate]');
  } else if (checkIsContainerNavigation(navigation)) {
    navigateToUrl(navigation, url);
  } else {
    tryNavigate(parentNavigation, url);
  }
};

type Props = NavigationInjectedProps<NavigationParams> & {
  url: string;
  children: any;
};

const Link = (props: Props) => {
  const { navigation, url, children, ...extProps } = props;
  return (
    <TouchableOpacity
      activeOpacity={0.95}
      {...extProps}
      onPress={() => {
        tryNavigate(navigation, url);
      }}
    >
      {children}
    </TouchableOpacity>
  );
};

export default withNavigation<{ url: string }>(Link);
