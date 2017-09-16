import React from 'react';
import { View, Text } from 'react-native';

import SvgUri from 'react-native-svg-uri';

const DEGREE = '\u2103'

const ResultInfoHeader = ({ degrees, climate, date }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.degreeText}>{degrees + DEGREE}</Text>
        <Text style={styles.headerText}>{climate}</Text>
        <Text style={styles.headerText}>{date}</Text>
      </View>
      <View>
        <Text>TODO ENTER ICONS (INCLUDING ARROW ICON)</Text>
        <SvgUri width="50" height="50" source={{uri: 'https://raw.githubusercontent.com/Derisk/Derisk-Client/master/derisk/assets/icons/002-package.svg'}} />
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
  textContainer: {
    left: 25
  },
  headerText: {
    color: '#fff',
    fontSize: 18
  },
  degreeText: {
    color: '#fff',
    fontSize: 24
  }
};

export default ResultInfoHeader;
