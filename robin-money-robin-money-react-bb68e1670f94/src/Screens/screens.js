import { Navigation } from "react-native-navigation";

import loginScreen from "./loginScreen";
import forgetPasswordScreen from "./forgetPasswordScreen";
import SignupScreen from "./SignupScreen";

import TermConditionScreen from "./TermConditionScreen";
import mainScreen from "./mainScreen"; 

import HomeScreen from "./HomeScreen"; 
import WalletScreen from "./WalletScreen"; 
import WinnersScreen from "./WinnersScreen"; 
import ConfigScreen from "./ConfigScreen"; 

export function registerScreens() {

    Navigation.registerComponent('loginScreen', () => loginScreen);
    Navigation.registerComponent('forgetPasswordScreen', () => forgetPasswordScreen);
    Navigation.registerComponent('SignupScreen', () => SignupScreen);

    Navigation.registerComponent('TermConditionScreen', () => TermConditionScreen);
    Navigation.registerComponent('mainScreen', () => mainScreen);

    Navigation.registerComponent('HomeScreen', () => HomeScreen);
    Navigation.registerComponent('WalletScreen', () => WalletScreen);
    Navigation.registerComponent('WinnersScreen', () => WinnersScreen);
    Navigation.registerComponent('ConfigScreen', () => ConfigScreen);

    
}