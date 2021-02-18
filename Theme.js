// Powered By Development Here
// www.devhere.co
// Terms: https://devhere.co/terms-and-conditions
// Started in (28-05-2020)

import React from "react";
import { I18nManager } from "react-native";

//importing images

const logofull = require("./assets/images/logo_full.png");

export default {
// export const Theme = {
  dark: false,

  //default colors
  white: "#fff",
  primary: "#FF0004",
  primaryLight: "#FF657E",
  secondary: "#2680EB",
  primaryMaxLight: "#ffe5e5",
  green: "#63E98C",
  blue: "#2680EB",
  textcolor: '#7E8387',
  //dark colors

  //font
  // poppins: 'Poppins-Medium',
  // poppinsbold: 'Poppins-SemiBold',
  poppins: I18nManager.isRTL ? "JFFlat-Regular" : "Poppins-Medium",
  poppinsbold: I18nManager.isRTL ? "JFFlat-Regular" : "Poppins-SemiBold",
  
  //assets
  logofull: logofull,
};

export const themeDark = {
  dark: true,
  //dark colors
  background: "#121212",
  Overlay: '#212121',
  primary: "#FFFFFF",
  primaryLight: "#BEBEBE",
  secondary: "#BEBEBE",
  primaryMaxLight: "#ffe5e5",
  green: "#63E98C",
  blue: "#2680EB",
  textcolor: '#7E8387',
  //font
  // poppins: 'Poppins-Medium',
  // poppinsbold: 'Poppins-SemiBold',
  poppins: I18nManager.isRTL ? "JFFlat-Regular" : "Poppins-Medium",
  poppinsbold: I18nManager.isRTL ? "JFFlat-Regular" : "Poppins-SemiBold",

  //assets
  logofull: logofull,
};