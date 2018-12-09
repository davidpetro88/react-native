import React from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';

export default class App extends React.Component {

    state = {
        placeName: "",
        places: []
    };

    placeNameChangeHandler = val => {
        console.log("placeNameChangeHandler = val => {");
        console.log(val);
        this.setState({
            placeName: val
        });
    };

    placeSubmitHandler = () => {
        if (this.state.placeName.trim() === "") {
            return;
        }
        this.setState(prevState => {
            return {
                places: prevState.placeName.concat(prevState.placeName)
            }
        })
    };

    render() {
        const placeOutput = this.state.places.map((place, i) => <Text key={i}> {place} </Text>);
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="An asweone place"
                        style={styles.placeInput}
                        value={this.state.placeName}
                        onChangeText={this.placeNameChangeHandler}/>
                    <Button title="Add" style={styles.placeButton} onPress={this.placeSubmitHandler}/>
                </View>
                <View> {placeOutput} </View>
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
    },
    inputContainer: {
        // flex: 1,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center"
    },
    placeInput: {
        width: '70%'
    },
    placeButton: {
        width: '30%'
    }
});
