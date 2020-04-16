import * as RN from 'react-native';

const customRequireNativeComponent = RN.requireNativeComponent;

const nativeComponentMap = Object.create(null);

const injectRequireNativeComponent = function (name) {
  if (nativeComponentMap[name]) {
    console.log('[requireNativeComponent] from cache', name);
    return nativeComponentMap[name];
  } else {
    const component = customRequireNativeComponent(name);
    nativeComponentMap[name] = component;
    return component;
  }
};

Object.defineProperty(RN, 'requireNativeComponent', {
  get() {
    return injectRequireNativeComponent;
  },
});

Object.defineProperty(RN.default, 'requireNativeComponent', {
  get() {
    return injectRequireNativeComponent;
  },
});
