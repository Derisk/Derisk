import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Animated,
  Dimensions,
  StyleSheet
} from 'react-native';
import { MapView } from 'expo';
import ResultInfoHeader from "../components/ResultInfoHeader";
import ResultInfoDetails from "../components/ResultInfoDetails";

const MARKER_IDENTIFIER = "marker";

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

export default class ResultScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalY: new Animated.Value(-deviceHeight),
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
    //this.map.fitToSuppliedMarkers([MARKER_IDENTIFIER]);
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  openModal() {
    Animated.timing(this.state.modalY, {
      duration: 300,
      toValue: 0
    }).start();
  }

  closeModal() {
    Animated.timing(this.state.modalY, {
      duration: 300,
      toValue: -deviceHeight
    }).start();
  }

  render() {
    const Modal = <Animated.View style={[styles.modal, { transform: [{translateY: this.state.modalY}] }]}>
      <TouchableHighlight onPress={this.closeModal.bind(this)} style={styles.button}>
        <Text style={styles.closeButton}>X</Text>
      </TouchableHighlight>
      <ResultInfoDetails title="Discount" recommendation="Expect rough weather. You should give a discount of 20% on wednesday and tuesday because it's stormy."
                         daysInfo={[
                           { day: "Sat", degrees: 16, climate: "Sunny" },
                           { day: "Sun", degrees: 17, climate: "Cloudy" },
                           { day: "Mon", degrees: 18, climate: "Rainy" },
                           { day: "Tue", degrees: 18, climate: "Very Rainy" },
                           { day: "Wed", degrees: 19, climate: "Very Rainy" },
                           { day: "Thu", degrees: 20, climate: "Cloudy" },
                           { day: "Fri", degrees: 21, climate: "Sunny" },
                         ]} />
    </Animated.View>;

    return (
      <View style={styles.container}>
        <MapView
        ref={(ref) => { console.log(ref);this.map = ref }} 
        onRegionChange={this.onRegionChange.bind(this)} 
        style={styles.map}>
          <MapView.Marker
            identifier={MARKER_IDENTIFIER}
            coordinate={this.state.marker.latlng}
            title={this.state.marker.title}
            description={this.state.marker.description}
          />
        </MapView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this.openModal.bind(this)} style={styles.button}>
            <ResultInfoHeader degrees={21} climate="Mostly Cloudy" date="Saturday, 16 Sep" />
          </TouchableOpacity>
        </View>
        {Modal}
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
  closeButton: {
    paddingRight: 10,
    paddingLeft: 10
  },
  buttonContainer: {
    alignSelf: 'stretch',
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'blue',
    paddingTop: 30,
    paddingBottom: 15
  }
});
