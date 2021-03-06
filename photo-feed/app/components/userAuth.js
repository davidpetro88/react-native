import React from 'react';
import {FlatList, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { Icon } from 'react-native-elements'
import {auth, database, f} from "../../config/config";

class UserAuth extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            authStep: 0,
            email: '',
            pass: '',
            moveScreen: false

        }
    }

    login = async () => {
        let email = this.state.email;
        let pass = this.state.pass;
        if(email !== '' && pass !== '') {
            try {
                let user = await auth.signInWithEmailAndPassword(email, pass)
            }catch (error) {
                console.log(error);
                alert(error);
            }
        } else {
            alert( "Email or Password is empty")
        }
    };

    createUserObje = (userObj, email) => {

        let uObj = {
            name: 'Enter name',
            username: '@name',
            avatar: 'http://www.gravatar.com/avatar',
            email: email
        };
        database.ref('users').child(userObj.uid).set(uObj);
    };

    signUp = async () => {
        let email = this.state.email;
        let pass = this.state.pass;
        if(email !== '' && pass !== '') {
            try {
                let user = await auth.createUserWithEmailAndPassword(email, pass)
                    .then((userObj) => this.createUserObje(userObj.user, email))
                    .catch(error =>  {
                        console.log(error);
                        alert(error);
                    });
            }catch (error) {
                console.log(error);
                alert(error);
            }
        } else {
            alert( "Email or Password is empty")
        }
    };

    componentDidMount = () => {

    };

    render() {
        return (
            <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
                    <Text> You are not logged in </Text>
                    <Text> {this.props.message} </Text>
                { this.state.authStep == 0 ? (
                    <View style={{marginVertical:20, flexDirection: 'row'}}>
                        <TouchableOpacity onPress={() => this.setState({authStep:1})}>
                            <Text style={{fontWeight:'bold', color: 'green'}}> Login </Text>
                        </TouchableOpacity>

                        <Text style={{marginHorizontal:10}}> or </Text>

                        <TouchableOpacity onPress={() => this.setState({authStep:2})}>
                            <Text style={{fontWeight:'bold', color: 'blue'}}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={{marginVertical:20}}>
                        { this.state.authStep == 1 ? (
                            <View>
                                <TouchableOpacity onPress={() => this.setState({authStep:0})}
                                                  style={{borderBottomWidth:1, paddingVertical:5, marginBottom: 10,
                                    borderBottomColor: 'black'}}>
                                    <View style={{flexDirection: 'row'}}>
                                        <Icon
                                            name='arrow-left'
                                            type='evilicon'
                                            color='#000'
                                        />
                                        <Text style={{fontWeight: 'bold'}}>Cancel</Text>
                                    </View>
                                </TouchableOpacity>
                                    <Text style={{fontWeight: 'bold', marginBottom:20}}> Login </Text>
                                    <Text>Email Address: </Text>
                                    <TextInput
                                        editable={true}
                                        keyboardType={'email-address'}
                                        placeholder={'enter your email address...'}
                                        onChangeText={(text) => this.setState({email: text})}
                                        value={this.state.email}
                                        style={{width:250, marginVertical: 10, borderWidth:1,  padding:5,
                                            borderColor: 'grey', borderRadius:3}} />
                                    <Text>Password: </Text>
                                    <TextInput
                                        editable={true}
                                        secureTextEntry={true}
                                        placeholder={'enter your password...'}
                                        onChangeText={(text) => this.setState({pass: text})}
                                        value={this.state.pass}
                                        style={{width:250, marginVertical: 10, borderWidth:1,  padding:5,
                                            borderColor: 'grey', borderRadius:3}} />
                                <TouchableOpacity onPress={() => this.login()}
                                                  style={{backgroundColor:'green', paddingVertical:10,
                                                      paddingHorizontal:20, borderRadius: 5}}>
                                    <Text style={{color: 'white'}}>Login</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View>
                                <TouchableOpacity onPress={() => this.setState({authStep:0})}
                                                  style={{borderBottomWidth:1, paddingVertical:5, marginBottom: 10,
                                                      borderBottomColor: 'black'}}>
                                    <View style={{flexDirection: 'row'}}>
                                        <Icon
                                            name='arrow-left'
                                            type='evilicon'
                                            color='#000'
                                        />
                                        <Text style={{fontWeight: 'bold'}}>Cancel</Text>
                                    </View>
                                </TouchableOpacity>
                                <Text style={{fontWeight: 'bold', marginBottom:20}}> Sign Up </Text>
                                <Text>Email Address: </Text>
                                <TextInput
                                    editable={true}
                                    keyboardType={'email-address'}
                                    placeholder={'enter your email address...'}
                                    onChangeText={(text) => this.setState({email: text})}
                                    value={this.state.email}
                                    style={{width:250, marginVertical: 10, borderWidth:1,  padding:5,
                                        borderColor: 'grey', borderRadius:3}} />
                                <Text>Password: </Text>
                                <TextInput
                                    editable={true}
                                    secureTextEntry={true}
                                    placeholder={'enter your password...'}
                                    onChangeText={(text) => this.setState({pass: text})}
                                    value={this.state.pass}
                                    style={{width:250, marginVertical: 10, borderWidth:1,  padding:5,
                                        borderColor: 'grey', borderRadius:3}} />
                                <TouchableOpacity onPress={() => this.signUp()}
                                                  style={{backgroundColor:'blue', paddingVertical:10,
                                                      paddingHorizontal:20, borderRadius: 5}}>
                                    <Text style={{color: 'white'}}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>

                )}
            </View>
        )
    }
}

export default UserAuth;