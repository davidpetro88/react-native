import React from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';

import placeImage from './src/assets/beautiful-place.jpg';
import PlaceInput from "./src/components/PlaceInput/PlaceInput";
import PlaceList from "./src/components/PlaceList/PlaceList";


export default class App extends React.Component {

    state = {
        places: []
    };



    placeAddedHandler = placeName => {
        this.setState(prevState => {
            return {
                places: prevState.places.concat({key: Math.random(), value: placeName, image: placeImage})
            };
        });
    };

    placeDeletedHandler = key => {
        this.setState(prevState => {
            return {
                places: prevState.places.filter((place, i) => {
                    return place.key !== key
                })
            };
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <PlaceInput onPlaceAdded={this.placeAddedHandler} />
                <PlaceList
                    places={this.state.places}
                    // onItemPressed={this.state.places}
                    onItemDeleted={this.placeDeletedHandler}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    }
});
