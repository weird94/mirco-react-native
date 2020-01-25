import React from "react";
import { TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";

const Link = ({ navigation, url, children, ...extProps }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.95}
      {...extProps}
      onPress={() => {
        navigation.navigate(Symbol.for("remote-component-container"), { url });
      }}
    >
      {children}
    </TouchableOpacity>
  );
};

export default withNavigation(Link);
