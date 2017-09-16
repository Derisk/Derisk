import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';
import { MapView } from 'expo';
import Modal from 'react-native-modalbox';
import { Actions, ActionConst } from 'react-native-router-flux';

const MARKER_IDENTIFIER = "marker";

export default class ResultScreen extends React.Component {
  static navigationOptions = {
    title: 'Results',
  };

  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      sliderValue: 0.3,
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
      <View style={styles.container}>
        <MapView ref={ref => { this.map = ref; }} onRegionChange={this.onRegionChange.bind(this)} style={styles.map}>
          <MapView.Marker
            identifier={MARKER_IDENTIFIER}
            coordinate={this.state.marker.latlng}
            title={this.state.marker.title}
            description={this.state.marker.description}
          />
        </MapView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => this.modal.open()} style={styles.button}>
            <Text>TEST!</Text>
          </TouchableOpacity>
        </View>

        <Modal
          style={styles.modal}
          ref={ref => { this.modal = ref; }}
          position={"bottom"}
          swipeArea={20}
          swipeToClose={true}
          onClosed={() => this.setState({isModalOpen: false})}
          onOpen={() => this.setState({isModalOpen: true})}>
          <Text>Basic modal</Text>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  modal: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue'
  },
  buttonContainer: {
    alignSelf: 'stretch',
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'blue',
    padding: 15
  },
});
