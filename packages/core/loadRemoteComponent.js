import React from "react";
import * as ReactNative from "react-native";
import ReactNavigation from "react-navigation";

function require(name) {
  if (name == "REACT") {
    return React;
  } else if (name == "REACT_NATIVE") {
    return ReactNative;
  } else if (name == "REACT_NAVIGATION") {
    return ReactNavigation;
  } else {
    throw `require unsupported external module: ${name}`;
  }
}

/**
 * 加载远端 commonjs 规范的 ReactComponent
 * @param {string} url
 */
export default function loadRemoteComponent(url) {
  return fetch(url)
    .then(res => res.text())
    .then(body => {
      // webpack commonjs 规范模块
      const exports = {};
      const createComponent = new Function("exports", "require", body);
      createComponent(exports, require);
      return exports.__esModule ? exports.default : exports;
    });
}
