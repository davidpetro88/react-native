import React from 'react';
import {Text, View} from 'react-native';
import {f} from "../../config/config";

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedin: false
        }
    }

    componentDidMount = () => {
        var that = this;
        f.auth().onAuthStateChanged(function (user) {
            if (user) {
                //Logged
                that.setState({
                    loggedin: true
                })
            } else {
                that.setState({
                    loggedin: false
                })
            }

        });
    };


    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                {
                    this.state.loggedin == true ? (
                        //are logged in
                        <Text> Profile </Text>
                    ) : (
                        //not logged in
                        <View>
                            <Text> You are not logged in </Text>
                            <Text> Please login to view your profile </Text>
                        </View>
                    )}
            </View>
        )
    }
}

export default Profile;