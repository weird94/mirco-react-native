import r from"react";import{TouchableOpacity as t}from"react-native";import{withNavigation as e}from"react-navigation";function n(){return(n=Object.assign||function(r){for(var t=1;t<arguments.length;t++){var e=arguments[t];for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n])}return r}).apply(this,arguments)}function o(r,t){if(null==r)return{};var e,n,o=function(r,t){if(null==r)return{};var e,n,o={},a=Object.keys(r);for(n=0;n<a.length;n++)e=a[n],t.indexOf(e)>=0||(o[e]=r[e]);return o}(r,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(r);for(n=0;n<a.length;n++)e=a[n],t.indexOf(e)>=0||Object.prototype.propertyIsEnumerable.call(r,e)&&(o[e]=r[e])}return o}var a=e((function(e){var a=e.navigation,i=e.url,c=e.children,l=o(e,["navigation","url","children"]);return r.createElement(t,n({activeOpacity:.95},l,{onPress:function(){a.navigate(Symbol.for("remote-component-container"),{url:i})}}),c)}));export default a;
