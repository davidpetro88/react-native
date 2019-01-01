import React from 'react';
import {FlatList, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {database, f} from "../../config/config";
import UserAuth from "../components/userAuth";

class Comments extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedin: false,
            comments_list: []

        }
    }

    checkParams = () => {
        var params = this.props.navigation.state.params;
        if (params) {
            if (params.photoId) {
                this.setState({photoId: params.photoId})
            }
            this.fetchComments(params.photoId);
        }
    };

    addCommentToList = (comments_list, data, comment) => {
        var that = this;
        var commentObj = data[comment];
        database.ref('users').child(commentObj.author).child('username').once('value').then(function (snapshot) {
            const exist = (snapshot.val() !== null);
            if (exist) {
                data = snapshot.val();
                comments_list.push({
                    id: comment,
                    comment: commentObj.comment,
                    posted: that.timeConverter(commentObj.posted),
                    author: data,
                    authorId: commentObj.author
                });

                // that.setState({refresh: false, loggedin: false})
                that.setState({refresh: false});
            }
        }).catch(error => console.log(error));
    };

    fetchComments = (photoId: number) => {
        var that = this;
        database.ref('comments').child(photoId).orderByChild('posted').once('value')
            .then(function (snapshot) {
                const exist = (snapshot.val() !== null);
                if (exist) {
                    //    add comments to flatlist
                    data = snapshot.val();
                    var comments_list = that.state.comments_list;
                    for (var comment in data) {
                        that.addCommentToList(comments_list, data, comment)
                    }
                } else {
                    //    are no comment
                    that.setState({
                        comment_list: []
                    })
                }

            }).catch(error => console.log(error));
    };

    s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1)
    };

    uniqueId = () => {
        return this.s4() + this.s4() + '-' + this.s4() + '-' +
            this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4();
    };


    pluralCheck = (s) => {
        if (s === 1) {
            return ' ago';
        } else {
            return 's ago';
        }
    };

    timeConverter = (timestamp) => {
        var a = new Date(timestamp * 1000);
        var seconds = Math.floor((new Date() - a) / 1000);
        var intervalYear = Math.floor(seconds / 31536000);
        if (intervalYear > 1) {
            return intervalYear + ' year' + this.pluralCheck(intervalYear);
        }
        var intervalMonth = Math.floor(seconds / 2592000);
        if (intervalMonth > 1) {
            return intervalMonth + ' month' + this.pluralCheck(intervalMonth);
        }
        var intervalDay = Math.floor(seconds / 86400);
        if (intervalDay > 1) {
            return intervalDay + ' day' + this.pluralCheck(intervalDay);
        }
        var intervalHour = Math.floor(seconds / 3600);
        if (intervalHour > 1) {
            return intervalHour + ' hour' + this.pluralCheck(intervalHour);
        }
        var intervalMinute = Math.floor(seconds / 60);
        if (intervalMinute > 1) {
            return intervalMinute + ' minute' + this.pluralCheck(intervalMinute);
        }
        return Math.floor(seconds) + ' second' + this.pluralCheck(seconds);
    };

    componentDidMount = () => {
        var that = this;
        f.auth().onAuthStateChanged(function (user) {
            if (user) {
                //Logged
                alert("logged");
                that.setState({loggedin: true});
            } else {
                alert("loggedin");
                that.setState({loggedin: false});
            }

        });

        this.checkParams();
    };

    postComment() {
        var comment = this.state.comment;
        if (comment != '') {
            //process
            var imageId = this.state.photoId;
            var userId = f.auth().currentUser.uid;
            var commentId = this.uniqueId();
            var dateTime = Date.now();
            var timestamp = Math.floor(dateTime / 1000);
            this.setState({comment: ''});

            var commentObj = {
                posted: timestamp,
                author: userId,
                comment: comment
            };

            database.ref('/comments/' + imageId + '/' + commentId).set(commentObj);
            this.reloadCommentList();
        } else {
            alert("Please enter the comment before posting.")
        }
    }

    reloadCommentList = () => {
        this.setState({comment_list: []});
        this.fetchComments(this.state.photoId);
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{
                    flexDirection: 'row', height: 70, paddingTop: 30, backgroundColor: 'white',
                    borderColor: 'lightgrey', borderBottomWidth: 0.5, justifyContent: 'center',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <TouchableOpacity style={{width: 100}} onPress={() => this.props.navigation.goBack()}>
                        <Text style={{fontSize: 12, fontWeight: 'bold', paddingLeft: 10}}>go back</Text>
                    </TouchableOpacity>
                    <Text> Comments </Text>
                    <Text style={{width: 100}}> ? </Text>
                </View>
                <View style={{flex:1, width: '100%'}}>
                    {this.state.comments_list.length == 0 ? (
                        //no comments to show is empty
                        <View style={{
                            width: '100%', overflow: 'hidden', marginBottom: 5,
                            justifyContent: 'space-between', borderBottomWidth: 1, borderColor: 'grey'
                        }}>
                            <Text> No comments found... </Text>
                        </View>


                    ) : (
                        <FlatList
                            refreshing={this.state.refresh}
                            data={this.state.comments_list}
                            keyExtractor={(item, index) => index.toString()}
                            style={{flex: 1, backgroundColor: '#eee'}}
                            renderItem={({item, index}) => (
                                <View key={index} style={{
                                    width: '100%', overflow: 'hidden', marginBottom: 5,
                                    justifyContent: 'space-between', borderBottomWidth: 1, borderColor: 'grey'
                                }}>
                                    <View style={{
                                        padding: 5, width: '100%', flexDirection: 'row',
                                        justifyContent: 'space-between'
                                    }}>
                                        <Text> {item.posted} </Text>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('User',
                                            {userId: item.authorId})}>
                                            <Text> {item.author} </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{padding: 5}}>
                                        <Text> {item.comment}</Text>
                                    </View>
                                </View>

                            )}
                        />
                    )}

                    {this.state.loggedin === true ? (
                        <KeyboardAvoidingView behavior="padding" enable style={{
                             borderTopColor: 'grey', borderTopWidth: 1,
                            padding: 10, marginBottom: 15, width: '100%'
                        }}>
                            <Text style={{fontWeight: 'bold'}}> Post Comment </Text>
                            <View>
                                <TextInput
                                    editable={true}
                                    placeholder={'enter your comment here..'}
                                    onChangeText={(text) => this.setState({comment: text})}
                                    style={{
                                        marginVertical: 10, height: 50, padding: 5, borderColor: 'grey',
                                        borderRadius: 3, backgroundColor: 'white', color: 'black'
                                    }}
                                />

                                <TouchableOpacity style={{paddingVertical: 10, paddingHorizontal: 20,
                                    backgroundColor: 'blue', borderRadius: 5}}
                                                  onPress={() => this.postComment()}>
                                    <Text style={{color: 'white'}}>Post</Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>

                    ) : (
                        <UserAuth message={'Please login to view your profile'}/>
                    )}
                </View>

            </View>
        )
    }


}

export default Comments;