import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { MapView } from 'expo';

const MARKER_IDENTIFIER = "marker";

export default class ResultScreen extends React.Component {
  static navigationOptions = {
    title: 'Results',
  };

  constructor(props) {
    super(props);

    this.state = {
      marker: {
        latlng: {
          latitude: props.marker.lat,
          longitude: props.marker.lng
        },
        title: props.title,
        description: props.description
      }
    };
  }

  componentDidMount() {
    this.map.fitToSuppliedMarkers([MARKER_IDENTIFIER]);
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  render() {
    return (
      <MapView
        ref={ref => { this.map = ref; }}
        region={this.state.region}
        onRegionChange={this.onRegionChange.bind(this)}>
        style={{ flex: 1 }}
        <MapView.Marker
          identifier={MARKER_IDENTIFIER}
          coordinate={this.state.marker.latlng}
          title={this.state.marker.title}
          description={this.state.marker.description}
        />
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  }
});
