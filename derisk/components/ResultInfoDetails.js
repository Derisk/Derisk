import React from 'react';
import { View, Text } from 'react-native';

const ResultInfoDetails = ({ title, recommendation, daysInfo }) => {
  const DaysVisualization = daysInfo.map(info => <View key={info.day}>
    <Text>{info.day}</Text>
    <Text>{info.degrees}</Text>
  </View>);
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <Text>Recommendation</Text>
      <Text>{recommendation}</Text>
      <View style={styles.daysInfoContainer}>
        {DaysVisualization}
      </View>
    </View>
  );
};

const styles = {
  container: {
    marginTop: 15,
    flex: 1,
    backgroundColor: 'green',
    flexDirection: 'column'
  },
  daysInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
};

export default ResultInfoDetails;
