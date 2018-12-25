import React from 'react';
import {FlatList, Image, Text, View} from 'react-native';

class Feed extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            photo_feed: [0, 1, 2, 3, 4],
            refresh: false
        }
    }

    loadNew = () => {
        this.setState({refesh: true});
        this.setState({photo_feed: [5, 6, 7, 8, 9], refesh: false});
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

                <FlatList
                    refreshing={this.state.refresh}
                    onRefresh={this.loadNew}
                    data={this.state.photo_feed}
                    keyExtractor={(item, index) => index.toString()}
                    style={{flex: 1, backgroundColer: '#eee'}}
                    renderItem={({item, index}) => (
                        <View key={index}
                              style={{width:'100%', overflow:'hidden', marginBottom:5, justifyContent:'space-between',
                              borderBottomWidth:1, borderColor:'grey'}}>
                            <View style={{padding:5, width:'100%', flexDirection:'row', justifyContent:'space-between'}}>
                                <Text> Time Ago </Text>
                                <Text> @david </Text>
                            </View>
                            <View>
                                <Image
                                    source={{uri: "https://source.unsplash.com/random/500x" + Math.floor((Math.random() * 800) + 500)}}
                                    style={{resizeMode: 'cover', width: '100%', height: 275}}/>
                            </View>
                            <View style={{padding:5}}>
                                <Text> Caption text here... </Text>
                                <Text style={{marginTop: 10, textAlign: 'center'}}> View comments... </Text>
                            </View>
                        </View>

                    )}/>
            </View>
        )
    }
}

export default Feed;