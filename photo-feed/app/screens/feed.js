import React from 'react';
import { FlatList, StyleSheet, Text, View, Image } from 'react-native';

class Feed extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            photo_feed: [0,1,2,3,4],
            refresh: false
        }
    }

    loadNew = () => {
      this.setState({refesh: true});
      this.setState({photo_feed: [5,6,7,8,9],refesh: false});
    };

    render() {
        return (
            <View style={{flex:1}}>
                <View style={{height:70, paddingTop:30, backgroundColor: 'white', borderColor:'lightgrey',
                    borderBottomWidth:0.5, justifyContent:'center', alignItems:'center'}}>
                    <Text> Feed </Text>
                </View>

                <View>
                    <View>
                        <Text> Time Ago </Text>
                        <Text> @david </Text>
                    </View>
                    <View>
                        <Image source={{uri:"https://source.unsplash.com/random/500x"+Math.floor((Math.random()* 800)
                                + 500)}}  style={{resizeMode: 'cover', width: '100%', height:275}}/>
                    </View>

                    <View>
                        <Text> Caption text here... </Text>
                        <Text> View comments... </Text>
                    </View>

                </View>

            </View>
        )
    }
}

export default Feed;