import r from"react";import{TouchableOpacity as t}from"react-native";import{withNavigation as n}from"react-navigation";import{CONTAINER as e}from"@crgt/dynamic-rn";function o(){return(o=Object.assign||function(r){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&(r[e]=n[e])}return r}).apply(this,arguments)}function a(r,t){if(null==r)return{};var n,e,o=function(r,t){if(null==r)return{};var n,e,o={},a=Object.keys(r);for(e=0;e<a.length;e++)n=a[e],t.indexOf(n)>=0||(o[n]=r[n]);return o}(r,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(r);for(e=0;e<a.length;e++)n=a[e],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(r,n)&&(o[n]=r[n])}return o}var i=n((function(n){var i=n.navigation,c=n.url,l=n.children,f=a(n,["navigation","url","children"]);return r.createElement(t,o({activeOpacity:.95},f,{onPress:function(){i.navigate(e,{url:c})}}),l)}));export default i;
