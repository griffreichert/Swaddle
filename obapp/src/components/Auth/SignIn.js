import React from 'react';
import { connect } from 'react-redux'
import { login, logout } from '../../actions/authActions'
import { View, StyleSheet, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import {
    Button,
    HelperText,
    TextInput,
    withTheme
} from 'react-native-paper';
import ResetPasswordButton from './Buttons/ResetPasswordButton';
import SignUpButton from './Buttons/SignUpButton';
import api from '../../Internals/apiClient'

const axios = require('axios');

class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            failedAttempt: false,
        };
    }

    tryLogin() {
        // TODO: refactor this into using API
        // api.get('http://18.217.2.166:3000/auth_user').then(console.log)

        axios.put('http://18.217.2.166:3000/auth_user', {
            email: this.state.email,
            password: this.state.password
        }).then(res => {
            if (res.status === 200) {
                console.log(res.data)
                this.props.rlogin(this.state.email, res.data)
                console.log('logging in')
            }
            else {
                this.setState({ failedAttempt: true })
            }
        }).catch(err => {
            console.log(err)
            this.setState({ failedAttempt: true })
        })
    }

    render() {
        return (
            <View style={style.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS == "ios" ? "padding" : "height"}
                        style={{ flex: 1, justifyContent: 'flex-start', backgroundColor: this.props.theme.colors.background }}>
                        <Image
                            source={require('../../../assets/stork.png')}
                            resizeMode="contain"
                            style={style.logo} />
                        <TextInput
                            label='email'
                            mode='outlined'
                            returnKeyType='done'
                            style={style.textField}
                            theme={{ roundness: 12 }}
                            onChangeText={(email) => this.setState({ email })} />
                        <TextInput
                            label='password'
                            mode='outlined'
                            returnKeyType='done'
                            style={style.textField}
                            theme={{ roundness: 12 }}
                            secureTextEntry={true}
                            underlineColor={this.props.theme.colors.background}
                            onChangeText={(password) => this.setState({ password })} />
                        <HelperText
                            children='Incorrect username/password'
                            type='error'
                            style={style.helper}
                            visible={this.state.failedAttempt} />
                        <Button
                            children='Sign in'
                            // icon='login'
                            style={style.button}
                            mode='contained'
                            uppercase={false}
                            onPress={() => this.tryLogin()} />
                        <SignUpButton navigation={this.props.navigation} />
                        <ResetPasswordButton navigation={this.props.navigation} />
                    </KeyboardAvoidingView>
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
        marginHorizontal: 120,
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
        marginTop: 180,
    },
});

// maps state
const mapStateToProps = (state) => {
    return {
        email: state.authReducer.email,
        session_token: state.authReducer.session_token,
    }
}

// maps actions
const mapDispatchToProps = (dispatch) => {
    return {
        rlogin: (email, session_token) => dispatch(login(email, session_token)),
        rlogout: () => dispatch(logout()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(SignIn));
