import React from 'react';
import { Router, Scene, Actions, ActionConst } from 'react-native-router-flux';

import LocationScreen from '../screens/LocationScreen';
import ResultScreen from '../screens/ResultScreen';

import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LandingScreen from '../screens/LandingScreen'

export default class Main extends React.Component {
  _chat() {
    if (this.state.isLoading) return;

    this.setState({ isLoading: true });

    Animated.timing(
      this.growAnimated,
      {
          toValue: 1,
          duration: 300,
          easing: Easing.linear,
      }
    ).start();

    setTimeout(() => {
      Actions.ChatScreen();
    }, 500);
  }

  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="landingScreen"
            component={LandingScreen}
            animation='fade'
            hideNavBar={true}
            initial={true}
          />
          <Scene key="homeScreen"
            component={HomeScreen}
            animation='fade'
            hideNavBar={true}
          />
          <Scene key="resultsScreen"
            component={ResultScreen}
            animation='fade'
            hideNavBar={true}
          />
        </Scene>
      </Router>
    );
  }
}
