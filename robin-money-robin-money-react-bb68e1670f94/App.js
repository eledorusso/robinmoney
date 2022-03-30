import React from 'react';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './src/Screens/screens';
import startTabs from './src/Screens/StartMainTabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
registerScreens();

Navigation.events().registerAppLaunchedListener(async () => {

  Navigation.setDefaultOptions({
    topBar: {
      visible: false,
      drawBehind: true,
      animated: true
    },
    layout: { orientation: ["portrait"] },

    statusBar: {
      backgroundColor: "#FFFFFF",
      style: "dark",
    },

  });


  try {
    // await GoogleSignin.signOut();
    // AsyncStorage.setItem('@userToken', "");
    const value = await AsyncStorage.getItem('@userToken')
    console.log('scnzzz', value)
    if (value !== null) {
      startTabs();
    } else {

      Navigation.setRoot({
        root: {
          stack: {
            children: [ 
              {
                component: {
                  name: 'loginScreen'
                }
              }
            ],
          }
        }
      });

    }

  } catch (e) {
    // error reading value
    console.log('scnzzz', e)
  }

});






