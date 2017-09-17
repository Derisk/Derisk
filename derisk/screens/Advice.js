import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { WebBrowser } from 'expo';

import Wallpaper from '../components/Wallpaper';
import Button from '../components/Button';
import { Actions, ActionConst } from 'react-native-router-flux';


const styles = StyleSheet.create({
  btnGroup: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  hiddenBtn: {
    backgroundColor: 'transparent',
    height: 70,
    width: 150
  }
});


export class AdvOne extends React.Component {
  static navigationOptions = {
    title: 'Advice',
  };

  render() {
    return (
      <Wallpaper src={require('../assets/images/advone.png')}>
        <View style={styles.btnGroup}>
          <TouchableOpacity 
          style={styles.hiddenBtn}
          onPress={() => {
            Actions.pop();
          }}>
          </TouchableOpacity>
          <TouchableOpacity 
          style={styles.hiddenBtn}
          onPress={() => {
            Actions.advTwo();
          }}>
          </TouchableOpacity>
        </View>
      </Wallpaper>
    );
  }
}

export class AdvTwo extends React.Component {
  static navigationOptions = {
    title: 'Advice',
  };

  render() {
    return (
      <Wallpaper src={require('../assets/images/advone.png')}>
        <View style={styles.btnGroup}>
          <TouchableOpacity 
          style={styles.hiddenBtn}
          onPress={() => {
            Actions.pop();
          }}>
          </TouchableOpacity>
          <TouchableOpacity 
          style={styles.hiddenBtn}
          onPress={() => {
            Actions.advThree();
          }}>
          </TouchableOpacity>
        </View>
      </Wallpaper>
    );
  }
}

export class AdvThree extends React.Component {
  static navigationOptions = {
    title: 'Advice',
  };

  render() {
    return (
      <Wallpaper src={require('../assets/images/advone.png')}>
        <View style={styles.btnGroup}>
          <TouchableOpacity 
          style={styles.hiddenBtn}
          onPress={() => {
            Actions.pop();
          }}>
          </TouchableOpacity>
          <TouchableOpacity 
          style={styles.hiddenBtn}
          onPress={() => {
            Actions.advTwo();
          }}>
          </TouchableOpacity>
        </View>
      </Wallpaper>
    );
  }
}
