import React from 'react';
import { TouchableOpacity, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { f, auth, database, storage } from "../../config/config";

class PhotoList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            photo_feed: [],
            refresh: false,
            loading: true
        }
    }

    componentDidMount = () => {
        const { isUser, userId} = this.props;
        if(isUser == true) {
            //Profile
            //userId
            this.loadFeed(userId);
        } else {
            this.loadFeed('');
        }
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

    addToFlatList = (photo_feed, data, photo) => {

        console.log("photo_feed  ->", photo_feed);
        console.log("data  ->", data);
        console.log("photo  ->", photo);


        var that = this;
        var photoObj = data[photo];
        database.ref('users').child(photoObj.author).child('username').once('value').then(function(snapshot){
            const exist = (snapshot !== null);
            if (exist) {
                dataAuhtor = snapshot.val();
                photo_feed.push({
                    id: photo,
                    url: photoObj.url,
                    caption: photoObj.caption,
                    posted: that.timeConverter(photoObj.posted),
                    author: dataAuhtor,
                    authorId: photoObj.author
                });

                that.setState({
                    refresh: false,
                    loading: false
                });
            }
        }).catch(error => console.log(error));
    };

    loadFeed = (userId = '') => {
        this.setState({
            refresh: true,
            photo_feed: []
        });

        var that = this;
        let loadRef = database.ref('photos');
        if(userId != '') {
            loadRef = database.ref('users').child(userId).child('photos');
        }
        
        
        database.ref('photos').orderByChild('posted').once('value').then(function (snapshot) {
            const exist = (snapshot !== null);
            if (exist) {
                data = snapshot.val();
                var photo_feed = that.state.photo_feed;
                for (var photo in data) {
                    that.addToFlatList(photo_feed,data,photo);
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

                { this.state.loading == true ? (
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
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('User', {
                                            userId: item.authorId
                                        })}>
                                            <Text> {item.author} </Text>
                                        </TouchableOpacity>

                                    </View>
                                    <View>
                                        <Image
                                            source={{uri: item.url}}
                                            style={{resizeMode: 'cover', width: '100%', height: 275}}/>
                                    </View>
                                    <View style={{padding: 5}}>
                                        <Text> {item.caption} </Text>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Comments', {
                                            photoId: item.id
                                        })}>
                                            <Text style={{color: 'blue', marginTop: 10, textAlign: 'center'}}>
                                                [View comments]
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            )}/>
                }
            </View>
        )
    }
}

export default PhotoList;