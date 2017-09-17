import React from 'react';
import { View, Text } from 'react-native';

const ResultInfoHeader = ({ degrees, climate, date }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text>{degrees}</Text>
        <Text>{climate}</Text>
        <Text>{date}</Text>
      </View>
      <View>
        <Text>TODO ENTER ICONS (INCLUDING ARROW ICON)</Text>
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
};

export default ResultInfoHeader;
