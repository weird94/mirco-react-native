import React from "react";
import * as ReactNative from "react-native";
import ReactNavigation from "react-navigation";
import ReactNavigationStack from "react-navigation-stack";

/**
 * handle the webpack external module
 * @param {string} name module name
 */
function require(name) {
  if (name == "REACT") {
    return React;
  } else if (name == "REACT_NATIVE") {
    return ReactNative;
  } else if (name == "REACT_NAVIGATION") {
    return ReactNavigation;
  } else if (name == "REACT_NAVIGATION_STACK") {
    return ReactNavigationStack;
  } else {
    throw `require unsupported external module: ${name}`;
  }
}

/**
 * 加载远端 commonjs 规范的 ReactComponent
 * @param {string} url
 * @param {function} fetch 符合 w3c 规范的 fetch
 */
export default function loadRemoteComponent(url, fetch) {
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