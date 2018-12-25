import React from 'react';
import {FlatList, Image, Text, View} from 'react-native';
import {database} from "../../config/config";

class Feed extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            photo_feed: [],
            refresh: false,
            loading: true
        }
    }

    componentDidMount = () => {
        this.loadFeed()
    };

    pluralCheck = (s) => {
      if (s ==1) {
          return ' ago';
      } else {
          return 's ago';
      }
    };

    timeConverter = (timestamp) => {
        var a = new Date(timestamp * 1000);
        var seconds = Math.floor((new Date() - a) / 1000);
        var intervalYear = Math.floor(seconds / 31536000);
        if (intervalYear > 1){
            return intervalYear + ' year'+ this.pluralCheck(intervalYear);
        }
        var intervalMonth = Math.floor(seconds / 2592000);
        if (intervalMonth > 1){
            return intervalMonth + ' month'+ this.pluralCheck(intervalMonth);
        }
        var intervalDay = Math.floor(seconds / 86400);
        if (intervalDay > 1){
            return intervalDay + ' day'+ this.pluralCheck(intervalDay);
        }
        var intervalHour = Math.floor(seconds / 3600);
        if (intervalHour > 1){
            return intervalHour + ' hour'+ this.pluralCheck(intervalHour);
        }
        var intervalMinute = Math.floor(seconds / 60);
        if (intervalMinute > 1){
            return intervalMinute + ' minute'+ this.pluralCheck(intervalMinute);
        }
        return Math.floor(seconds) + ' second'+ this.pluralCheck(seconds);
    };

    loadFeed = () => {
        this.setState({
            refresh: true,
            photo_feed: []
        });

        var that = this;
            database.ref('photos').orderByChild('posted').once('value').then(function (snapshot) {
            const exist = (snapshot !== null);
            if (exist) {
                data = snapshot.val();
                var photo_feed = that.state.photo_feed;

                for (var photo in data) {
                    var photoObj = data[photo];
                    database.ref('users').child(photoObj.author).child('username').once('value').then(function(snapshot){
                        if (exist) {
                            data = snapshot.val();
                            photo_feed.push({
                                id: photo,
                                url: photoObj.url,
                                caption: photoObj.caption,
                                posted: that.timeConverter(photoObj.posted),
                                author: data.username
                            });

                            that.setState({
                                refresh: false,
                                loading: false
                            });
                        }
                    }).catch(error => console.log(error));

                }
            }
        }).catch(error => console.log(error));

    };

    loadNew = () => {
        this.loadFeed();
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

                {
                    this.state.loading == true ? (
                        <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                            <Text> Loading ... </Text>
                        </View>
                    ) :
                        <FlatList
                            refreshing={this.state.refresh}
                            onRefresh={this.loadNew}
                            data={this.state.photo_feed}
                            keyExtractor={(item, index) => index.toString()}
                            style={{flex: 1, backgroundColer: '#eee'}}
                            renderItem={({item, index}) => (
                                <View key={index}
                                      style={{
                                          width: '100%', overflow: 'hidden', marginBottom: 5, justifyContent: 'space-between',
                                          borderBottomWidth: 1, borderColor: 'grey'
                                      }}>
                                    <View style={{
                                        padding: 5,
                                        width: '100%',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between'
                                    }}>
                                        <Text> {item.posted} </Text>
                                        <Text> {item.author} </Text>
                                    </View>
                                    <View>
                                        <Image
                                            source={{uri: item.url}}
                                            style={{resizeMode: 'cover', width: '100%', height: 275}}/>
                                    </View>
                                    <View style={{padding: 5}}>
                                        <Text> {item.caption} </Text>
                                        <Text style={{marginTop: 10, textAlign: 'center'}}> View comments... </Text>
                                    </View>
                                </View>

                            )}/>
                }


            </View>
        )
    }
}

export default Feed;