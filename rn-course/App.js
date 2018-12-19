import React from 'react';
import {StyleSheet, View} from 'react-native';
import {connect, Provider} from 'react-redux';

import PlaceInput from "./src/components/PlaceInput/PlaceInput";
import PlaceList from "./src/components/PlaceList/PlaceList";
import PlaceDetail from "./src/components/PlaceDetail/PlaceDetail";
import {addPlace, deletePlace, deselectPlace, selectPlace} from './src/store/actions/index';
import configureStore from './src/store/configureStore';

class App extends React.Component {

    placeAddedHandler = placeName => {
        this.props.onAddPlace(placeName);
        console.log("Place Add")
    };

    placeDeletedHandler = () => {
        this.props.onDeletePlace();
    };

    modalClosedHandler = () => {
        this.props.onDeselectPlace();
    };

    placeSelectedHandler = key => {
        this.props.onSelectPlace(key);
    };

    render() {
        return (
            <View style={styles.container}>
                <PlaceDetail
                    selectedPlace={this.props.selectedPlace}
                    onItemDeleted={this.placeDeletedHandler}
                    onModalClosed={this.modalClosedHandler}
                />
                <PlaceInput onPlaceAdded={this.placeAddedHandler} />
                <PlaceList
                    places={this.props.places}
                    // onItemPressed={this.state.places}
                    // onItemDeleted={this.placeDeletedHandler}
                    onItemSelected={this.placeSelectedHandler}
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

const mapStateToProps = state => {
    return {
        places: state.places.places,
        selectedPlace: state.places.selectedPlace
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: name => dispatch(addPlace(name)),
        onDeletePlace: () => dispatch(deletePlace()),
        onSelectPlace: key => dispatch(selectPlace(key)),
        onDeselectPlace: () => dispatch(deselectPlace())
    };
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
const store = configureStore();
const RNRedux = () => (
    <Provider store={store}>
        <ConnectedApp />
    </Provider>
);

export default RNRedux;