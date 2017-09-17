import React from 'react';
import { View, Text, Image } from 'react-native';

import SvgUri from 'react-native-svg-uri';

const DEGREE = '\u2103'

const ResultInfoHeader = ({ degrees, climate, date }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <View style={styles.degreeContainer}>
          <Text style={styles.degreeText}>{degrees + DEGREE}</Text>
          <Image style={styles.degreeImg} source={require('../assets/images/007-cloudy.png')}/>
        </View>
        <Text style={styles.headerText}>{climate}</Text>
        <Text style={styles.headerText}>{date}</Text>
      </View>
      <View style={styles.iconContainer}>
        <Image style={styles.headerImg} source={require('../assets/images/lock.png')} />
        <Image style={styles.headerImg} source={require('../assets/images/percent.png')} />
        <Image style={styles.headerImg} source={require('../assets/images/cart.png')} />
      </View>
    </View>
  );
};

const styles = {
  container: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerText: {
    color: '#fff',
    fontSize: 18
  },
  degreeText: {
    color: '#fff',
    fontSize: 48
  },
  degreeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  headerImg: {
    width: 50,
    height: 50
  },
  degreeImg: {
    width: 70,
    height: 50,
    left: 10
  },
  textContainer: {
    flex: 1,
    left: 25,
    justifyContent: 'flex-end'
  },
  iconContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: 'space-around',
    right: 25
  }
};

export default ResultInfoHeader;
