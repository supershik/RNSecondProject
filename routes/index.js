// Powered By Development Here
// www.devhere.co
// Terms: https://devhere.co/terms-and-conditions
// Started in (28-05-2020)
import "react-native-gesture-handler";
import React, { Component } from "react";
import { View } from "react-native";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import GeneralStatusBarColor from "../src/themes/GeneralStatusBarColor";
import { connect } from "react-redux";
//screens
import Splash from "../screens/Splash";
import Login from "../screens/Login";
import {themeLight, themeDark} from '../src/themes/themes';

const Stack = createStackNavigator();

// stack navigator
class Route extends Component {
  render() {
    console.log(this.props.theme);
    const themeData = this.props.theme === 'dark' ? themeDark : themeLight;

    return (
      <View style={{ flex: 1 }}>
        {/* <GeneralStatusBarColor backgroundColor={themeData.colors.ba}
          barStyle={themeData.colors.StatusbarStyle}
        /> */}

        <NavigationContainer theme={themeData}>
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { theme } = state.config;
  return {
    theme,
  };
};

export default connect(
  mapStateToProps,
  {}
)(Route);
