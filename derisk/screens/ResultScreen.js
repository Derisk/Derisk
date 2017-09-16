import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { MapView } from 'expo';

export default class ResultScreen extends React.Component {
    static navigationOptions = {
        title: 'Results',
    };

    constructor(props) {
        super(props);

        this.state = {
            // region: {
            //     latitude: 37.78825,
            //     longitude: -122.4324,
            //     latitudeDelta: 0.0922,
            //     longitudeDelta: 0.0421,
            // },
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

    onRegionChange(region) {
        this.setState({ region });
    }

    render() {
        return (
            <MapView
                style={{ flex: 1 }}
                region={this.state.region}
                onRegionChange={this.onRegionChange.bind(this)}>
                <MapView.Marker
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
