import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default class LocationScreen extends React.Component {
    static navigationOptions = {
        title: 'Location',
    };

    render() {
        return (
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
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
});
