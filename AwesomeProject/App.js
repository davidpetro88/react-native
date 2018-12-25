import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View, TextInput} from 'react-native';
import {auth, f} from "./config/config";

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedin: false
        };
        // this.registerUser( 'us3123er@gmail.com', 'fake312')

        var that = this;
        f.auth().onAuthStateChanged(function (user) {
            if (user) {
                //Logged in
                that.setState({
                    loggedin: true
                });
                console.log("Logged in ", user)
            } else {
                // logged out
                that.setState({
                    loggedin: false
                });
                console.log("Logged out ")
            }
        })
    }

    loginUser = async (email, pass) => {
        if (email != '' && pass != '') {
            try {
                let user = await auth.signInWithEmailAndPassword(email, pass);
                console.log(user)
            } catch (error) {
                console.log(error)
            }
        } else {
            alert('Missing email or password');
        }
    };

    async loginWithFacebook() {
        const {type, token} = await Expo.Facebook.logInWithReadPermissionsAsync(
            'APP_ID',
            {permissions: ['email', 'public_profile']}
        );

        if (type === 'success') {
            const credentials = f.auth.FacebookAuthProvider.credential(token);
            f.auth().signInWithCredential(credentials).catch((error) => {
                console.log('Error ....', error)
            })
        }
    }

    signUserOut = () => {
        auth.signOut().then(() => {
            console.log('Logged out...')
        })
            .catch(() => {
                console.log('Error : ', error)
            });
    };

    registerUser = (email, password) => {
        console.log(email, password);
        auth.createUserWithEmailAndPassword(email, password)
            .then((user) => console.log(email, password, user))
            .catch((error) => console.log("Error Log in", error))
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>Open up App.js to start working on your app!</Text>
                {
                    this.state.loggedin == true ? (
                        <View>
                            <TouchableHighlight onPress={() => this.signUserOut()}
                                                style={{backgroundColor: 'red'}}>
                                <Text>Log out</Text>
                            </TouchableHighlight>
                            <Text> Logged in....</Text>

                        </View>

                    ) : (
                        <View>

                            {
                                this.state.emailloginView == true  ? (
                                    <View>
                                        <Text> Email: </Text>
                                        <TextInput onChangeText={(text) => this.setState({email: text})}
                                                   value={this.state.email}></TextInput>
                                        <Text> Password: </Text>
                                        <TextInput onChangeText={(text) => this.setState({pass: text})}
                                                   secureTextEntry={true}
                                                   value={this.state.pass}></TextInput>

                                        <TouchableHighlight onPress={() =>
                                            this.loginUser(this.state.email,this.state.pass )}
                                                            style={{backgroundColor: 'red'}}>
                                            <Text>Login</Text>
                                        </TouchableHighlight>

                                    </View>
                                ) : <View/>
                            }

                            <TouchableHighlight
                                onPress={() => this.setState({emailloginView: true})}
                                style={{backgroundColor: 'green'}}>
                                <Text style={{color: 'white'}}> Loggin with E-mail</Text>
                            </TouchableHighlight>

                            <TouchableHighlight
                                onPress={() => this.loginWithFacebook()}
                                style={{backgroundColor: 'green'}}>
                                <Text style={{color: 'white'}}> Loggin with Facebook</Text>
                            </TouchableHighlight>
                        </View>
                    )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
