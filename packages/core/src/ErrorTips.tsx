import React from 'react';
import { View, Text, ViewStyle, StyleProp, Button } from 'react-native';
import { ErrorTipsProps } from './createContainer';

const containerStyle: StyleProp<ViewStyle> = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center'
};

const ErrorTips = (props: ErrorTipsProps) => {
  return (
    <View style={containerStyle}>
      <Text>render component error</Text>
      <Button onPress={props.onRetry} title='重试' />
    </View>
  );
};

export default ErrorTips;
