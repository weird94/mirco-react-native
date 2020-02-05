import React from 'react';
import * as ReactNative from 'react-native';
import ReactNavigation from 'react-navigation';

function _require(name: string) {
  if (name == 'REACT') {
    return React;
  } else if (name == 'REACT_NATIVE') {
    return ReactNative;
  } else if (name == 'REACT_NAVIGATION') {
    return ReactNavigation;
  } else {
    throw `require unsupported external module: ${name}`;
  }
}

export default function loadRemoteComponent(url: string, _fetch = fetch) {
  return _fetch(url)
    .then(res => res.text())
    .then(body => {
      // webpack commonjs 规范模块
      const exports: any = {};
      const createComponent = new Function('exports', 'require', body);
      createComponent(exports, _require);
      return exports.__esModule ? exports.default : exports;
    });
}
