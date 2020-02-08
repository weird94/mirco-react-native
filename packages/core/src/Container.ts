import Loading from './Loading';
import ErrorTips from './ErrorTips';
import { createContainer } from './createContainer';
import React from 'react';
import * as ReactNative from 'react-native';
import ReactNavigation from 'react-navigation';

function _require(name: string) {
  if (name == 'react') {
    return React;
  } else if (name == 'react-native') {
    return ReactNative;
  } else if (name == 'react-navigation') {
    return ReactNavigation;
  } else {
    throw `require unsupported external module: ${name}`;
  }
}

const Container = createContainer({
  Loading,
  ErrorTips,
  trackRenderError: (_, errorInfo) => console.error(errorInfo),
  injectRequire: _require
});

export default Container;
