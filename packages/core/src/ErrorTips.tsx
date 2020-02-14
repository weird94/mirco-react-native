import React from 'react';
import {
  View,
  Text,
  Image,
  ViewStyle,
  StyleProp,
  Button,
  ImageStyle,
  TextStyle,
  TouchableOpacity
} from 'react-native';
import { ErrorTipsProps } from './createContainer';
import netError from './netError.icon';

const containerStyle: StyleProp<ViewStyle> = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f5f5f5',
  paddingBottom: 50
};

const iconStyle: StyleProp<ImageStyle> = {
  width: 130,
  height: 130,
  marginBottom: 16
};

const labelStyle: StyleProp<TextStyle> = {
  height: 22,
  fontSize: 18,
  color: '#323233',
  marginBottom: 8
};

const tipsStyle: StyleProp<TextStyle> = {
  fontSize: 12,
  height: 16.5,
  color: '#969799'
};

const ErrorTips = (props: ErrorTipsProps) => {
  return (
    <View style={containerStyle}>
      <Image source={{ uri: netError }} style={iconStyle} />
      <Text style={labelStyle}>当前网络异常</Text>
      <TouchableOpacity onPress={props.onRetry}>
        <Text style={tipsStyle}>请点击重试</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ErrorTips;
