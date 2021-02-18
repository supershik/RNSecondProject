// Powered By Development Here
// www.devhere.co
// Terms: https://devhere.co/terms-and-conditions
// Started in (28-05-2020)
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import {useNavigation, useTheme} from '@react-navigation/native';
import Theme from "../Theme";
import GeneralStatusBarColor from "../src/themes/GeneralStatusBarColor";

class Splash extends React.Component {
  componentDidMount() {
    setTimeout((navigation) => {
      this.props.navigation.navigate("Login");
    }, 2000);
  }

  // component did mount used to navigate to other screen

  render() {
    const { colors } = this.props;
    return (
      <View style={styles.container}>
        <GeneralStatusBarColor backgroundColor={Theme.white}
            barStyle={colors.StatusbarStyle}
        />
        {/* image and text */}
        <Image source={Theme.logofull} style={styles.logo} />
        {/* <Text style={styles.title}>Your trusted real estate</Text> */}
      </View>
    );
  }
}
// export default Splash;

// Wrap and export
export default function(props) {
  const {colors} = useTheme();

  return <Splash {...props} colors={colors} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Theme.white,
  },
  logo: {
    height: 250,
    width: 300,
    resizeMode: "contain",
  },
  title: {
    fontSize: 16,
  },
});
