import React from 'react';
import { connect } from 'react-redux'
import { login, logout } from '../../actions/authActions';
import SignInButton from './Buttons/SignInButton';
import { Image, View, StyleSheet, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import {
    Button,
    TextInput,
    HelperText,
    withTheme
} from 'react-native-paper';
import api from '../../Internals/apiClient';

class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            confirmedPass: '',
            badPasswords: false,
            failedAttempt: false,
        };
    }

    trySignUp() {
        // TODO: refactor this into using API
        if (!this.state.first_name | !this.state.last_name | !this.state.email |
            !this.state.password | !this.state.confirmedPass) {
            console.log('email: ' + this.state.email)
            console.log('first: ' + this.state.first_name)
            console.log('last: ' + this.state.last_name)
            console.log('pass: ' + this.state.password)
            console.log('cpass: ' + this.state.confirmedPass)
            this.setState({ failedAttempt: true })
        }
        else if (this.state.confirmedPass !== this.state.password) {
            this.setState({ badPasswords: true })
        }
        else {
            console.log("creating user")
            api.post('/create_user', {
                email: this.state.email,
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                password: this.state.password
            }).then(res => {
                // TODO: sign user in here
                api.put('/auth_user', {
                    email: this.state.email,
                    password: this.state.password
                }).then(res => {
                    const status = res.status
                    if (status === 200) {
                        const token = res.data.token
                        console.log('token: ' + res.data.token)
                        this.props.rlogin(this.state.email, token)
                    }
                    else {
                        console.log('setting failed attempt')
                        this.setState({ failedAttempt: true })
                    }
                })
                .catch(err => {
                    console.log('[ERR sign in]: ' +err)
                    this.setState({ failedAttempt: true })
                })
            })
            .catch(err => console.log(err.status))
        }
    }

    // note may want to add toggle here to join a pregnancy

    render() {
        return (
            <View style={style.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View
                        style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: this.props.theme.colors.background }}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS == "ios" ? "padding" : "height"} >
                        <Image
                            source={require('../../../assets/stork.png')}
                            resizeMode="contain"
                            style={style.logo} />
                        <TextInput
                            label='First name'
                            mode='outlined'
                            returnKeyType='done'
                            style={style.textField}
                            theme={{ roundness: 12 }}
                            onChangeText={(first_name) => this.setState({ first_name })} />
                        <TextInput
                            label='Last name'
                            mode='outlined'
                            returnKeyType='done'
                            style={style.textField}
                            theme={{ roundness: 12 }}
                            onChangeText={(last_name) => this.setState({ last_name })} />
                        <TextInput
                            label='Email'
                            mode='outlined'
                            returnKeyType='done'
                            style={style.textField}
                            theme={{ roundness: 12 }}
                            onChangeText={(email) => this.setState({ email })} />
                        <TextInput
                            label='Password'
                            mode='outlined'
                            returnKeyType='done'
                            secureTextEntry={true}
                            style={style.textField}
                            theme={{ roundness: 12 }}
                            onChangeText={(password) => this.setState({ password })} />
                        <TextInput
                            label='Confirm password'
                            mode='outlined'
                            returnKeyType='done'
                            secureTextEntry={true}
                            style={style.textField}
                            theme={{ roundness: 12 }}
                            onChangeText={(confirmedPass) => this.setState({ confirmedPass })} />
                    </KeyboardAvoidingView>
                        <HelperText
                            children={this.state.badPasswords ? 'Passwords do not match' : 'All fields must be filled in'}
                            type='error'
                            style={style.helper}
                            visible={this.state.badPasswords || this.state.failedAttempt} />
                        {/* Need this empty view for the keyboard avoiding view */}
                        <Button
                            children='Sign up'
                            mode='contained'
                            style={style.button}
                            uppercase={false}
                            onPress={() => this.trySignUp()} />
                        <SignInButton navigation={this.props.navigation} />
                        <View style={{ flex: 1 }}></View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    button: {
        marginVertical: 10,
        padding: 10,
        width: 120,
        alignSelf: 'center'
    },
    textField: {
        marginVertical: 5,
        marginHorizontal: 40,
    },
    helper: {
        marginVertical: 2,
        fontSize: 16,
        alignSelf: 'center',
    },
    logo: {
        height: 100,
        alignSelf: 'center',
        margin: 10,
        marginTop: 80,
    },
});

// maps state
const mapStateToProps = (state) => {
    return {
        username: state.authReducer.username,
        session_token: state.authReducer.session_token,
    }
}

// maps actions
const mapDispatchToProps = (dispatch) => {
    return {
        rlogin: (username, session_token) => dispatch(login(username, session_token)),
        rlogout: () => dispatch(logout()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(SignUp));