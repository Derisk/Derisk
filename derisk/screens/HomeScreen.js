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
  Button
} from 'react-native';
import { WebBrowser } from 'expo';

import Wallpaper from '../components/Wallpaper';
import Button from '../components/Button';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Actions, ActionConst } from 'react-native-router-flux';

import { Actions, ActionConst } from 'react-native-router-flux';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };
  constructor(props) {
    super(props);

    this.state = {
      description: ''
    };
  }

  handleSubmit() {
    const { title, marker, description } = this.state;
    if (title && marker) {
      this.setState({ errorMessage: '' });
      Actions.resultScreen({ title, marker, description });
    } else {
      this.setState({ errorMessage: "Missing Fields" })
    }
  }

  renderAlert() {
    if (this.state.errorMessage) {
      return (
        <Text style={styles.error}>
          {this.state.errorMessage}
        </Text>
      );
    }
  }

  render() {
    return (
      <Wallpaper src={require('../assets/images/wallpaper.jpg')}>
        <View style={styles.container}>
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <ScrollView style={styles.container}>
              <GooglePlacesAutocomplete
                placeholder='Enter Location'
                minLength={2}
                autoFocus={false}
                returnKeyType={'default'}
                fetchDetails={true}
                query={{
                    key: 'AIzaSyDJzgCRfB2dQTKAH56rkI369dee0ofRh20',
                    language: 'en',
                    types: '(cities)'
                }}
                onPress={(data, details = null) => {
                  this.setState({ title: details.formatted_address, marker: details.geometry.location });
                }}
                textInputProps={{
                  clearButtonMode: 'never'
                }}
                styles={{
                  textInputContainer: {
                    backgroundColor: 'rgba(0,0,0,0)',
                    borderTopWidth: 0,
                    borderBottomWidth:0
                  },
                  textInput: {
                    marginLeft: 0,
                    marginRight: 0,
                    height: 38,
                    color: '#5d5d5d',
                    fontSize: 16
                  },
                  predefinedPlacesDescription: {
                    color: '#1faadb'
                  },
                }}
                currentLocation={false}
              />
            </ScrollView>
            <TextInput placeholder='Describe your business...' multiline={true} numberOfLines={4}
                       onChangeText={(description) => this.setState({ description })}
                       value={this.state.description} />
            <Button onPress={this.handleSubmit.bind(this)}>
              GO!
            </Button>
            {this.renderAlert()}
          </ScrollView>
      </View>
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
  error: {
    borderWidth: 1
  }
});
