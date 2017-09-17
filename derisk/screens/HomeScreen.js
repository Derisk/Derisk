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
import renderIf from 'render-if'

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Actions, ActionConst } from 'react-native-router-flux';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: '',
      showDesc: false,
      showSubmit: false
    };
  }

  handleSubmit() {
    const { title, marker, description } = this.state;
    if (title && marker) {
      Actions.resultScreen({ title, marker, description });
    }
  }

  render() {
    return (
      <Wallpaper src={require('../assets/images/bg_location.png')}>
        <View style={styles.container}>
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <ScrollView>
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
                    if (this.state.title) {
                      this.setState({showDesc: true})
                    }
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
                      fontSize: 18,
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
              {renderIf(this.state.showDesc)(
                <ScrollView style={styles.descriptionContainer}>
                  <TextInput placeholder='Describe your business...' multiline={true} numberOfLines={4}
                     onChangeText={(description) => {
                      this.setState({ description })
                      if (this.state.description) {
                        this.setState({showSubmit: true})
                      }
                    }}
                     value={this.state.description} 
                     style={styles.description}/>
                </ScrollView>
              )}
            </ScrollView>
            {renderIf(this.state.showSubmit)(
              <ScrollView style={styles.buttonContainer} contentContainerStyle={styles.buttonContentContainer}>
                <Button 
                style={styles.buttonStyle}
                onPress={this.handleSubmit.bind(this)}>
                  NEXT
                </Button>
              </ScrollView>
            )}
          </ScrollView>
      </View>
      </Wallpaper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'column',
  },
  contentContainer: {
    paddingTop: 20,
    marginLeft: 20,
    marginRight: 20,
    flexDirection: 'column',
    flex: 1,
  },
  description: {
    backgroundColor: '#4a5159',
    color: '#fff',
    borderRadius: 15,
    borderWidth: 1,
    fontSize: 18,
    borderColor: '#707a91',
    padding: 5,
  },
  descriptionContainer: {
    paddingTop: 20,
  },
  buttonContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  buttonContentContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    flex: 1,
    paddingBottom: 20,
  }
});
