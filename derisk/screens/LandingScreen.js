import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import Wallpaper from '../components/Wallpaper';

import { Actions, ActionConst } from 'react-native-router-flux';

import {
  getforecast, 
  getLeisureTravelIndex,
  getAchesAndPainsIndex,
  getDrivingDifficultyIndex,
  getFrostPotentialIndex,
  getHeatCoolIndex
} from '../requests/weather'


const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

export default class LandingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }



  _leaveLanding() {
    Actions.homeScreen();
  }

  render() {
    return (
      <Wallpaper 
      src={require('../assets/images/wallpaper_alt.jpg')}
      style={styles.fullWidth}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>HOLMES</Text>
        </View>
        <TouchableOpacity style={styles.landingButton} onPress={this._leaveLanding}>
        </TouchableOpacity>
      </Wallpaper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
    marginLeft: 20,
    marginRight: 20
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.25)',
    flex: 1
  },
  logo: {
    fontSize: 60,
    fontFamily: 'Catamaran',
    color: 'white'
  },
  fullWidth: {
    flex: 1
  },
  landingButton: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
    borderColor: 'gray', 
    borderWidth: 1,
    position: 'absolute',
    top: 0
  }
});
