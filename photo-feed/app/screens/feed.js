import React from 'react';
import { TouchableOpacity, FlatList, Image, Text, View } from 'react-native';
import { database } from "../../config/config";
import PhotoList from "../components/photoList";

class Feed extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{
                    height: 70, paddingTop: 30, backgroundColor: 'white', borderColor: 'lightgrey',
                    borderBottomWidth: 0.5, justifyContent: 'center', alignItems: 'center'
                }}>
                    <Text> Feed </Text>
                </View>

                <PhotoList isUser={false} navigation={this.props.navigation}/>

            </View>
        )
    }
}

export default Feed;