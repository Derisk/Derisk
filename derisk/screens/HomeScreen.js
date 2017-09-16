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

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Actions, ActionConst } from 'react-native-router-flux';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
        title: 'Input Information',
        headerLeft:<Button title='Back' onPress={() => Actions.pop()} />
    };


  constructor(props) {
    super(props);
    this.state = { 
      text: ''
    };
  }

  render() {
    return (
      <Wallpaper
      src={require('../assets/images/wallpaper.jpg')}
      >
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>

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

          <TextInput
            placeholder='Describe your business...'
            multiline={true}
            numberOfLines={4}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}/>

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
  }
});
