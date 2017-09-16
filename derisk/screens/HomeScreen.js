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

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Actions, ActionConst } from 'react-native-router-flux';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
      title: 'Home'
    }
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
      <Wallpaper src={require('../assets/images/bg_location.png')}>
        <View style={styles.container}>
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <ScrollView>
              <GooglePlacesAutocomplete
                placeholder='Enter Location'
                minLength={2}
                autoFocus={false}
                returnKeyType={'default'}
                fetchDetails={true}
                enablePoweredByContainer={false}
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
                    backgroundColor: '#4a5159',
                    borderColor: "#707a91",
                    justifyContent: 'center',
                    borderRadius: 15,
                  },
                  textInput: {
                    marginLeft: 0,
                    marginRight: 0,
                    height: 38,
                    color: '#fff',
                    backgroundColor: 'transparent',
                    fontSize: 16,
                    borderRadius: 15
                  },
                  predefinedPlacesDescription: {
                    color: '#1faadb'
                  },
                  container: {
                    backgroundColor: '#4a5159',
                    borderRadius: 15,
                    borderColor: '#707a91',
                    borderWidth: 1
                  },
                  description: {
                    color: '#fff',
                    backgroundColor: '#4a5159'
                  },
                  predefinedPlacesDescription: {
                    fontSize: 16
                  }
                }}
                currentLocation={false}
              />
            </ScrollView>
            <ScrollView>
              <TextInput placeholder='Describe your business...' multiline={true} numberOfLines={4}
                 onChangeText={(description) => this.setState({ description })}
                 value={this.state.description} 
                 style={styles.description}/>
            </ScrollView>
            <ScrollView>
              <Button onPress={this.handleSubmit.bind(this)}>
                GO!
              </Button>
            </ScrollView>
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
    backgroundColor: 'transparent',
  },
  contentContainer: {
    paddingTop: 30,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'space-around',
    flex: 1
  },
  error: {
    borderWidth: 1
  },
  description: {
    backgroundColor: '#4a5159',
    color: '#fff',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#707a91',
    padding: 5,
  }
});
