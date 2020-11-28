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
        if (!this.state.password | !this.state.email) {
            this.setState({ failedAttempt: true })
        }
        else {
            console.log("loggin in: " + this.state.email)
            api.put('/auth_user', {
                email: this.state.email,
                password: this.state.password
            }).then(res => {
                console.log('got here')
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
            .catch(err => console.log('[ERR sign in]: ' +err))
        }
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
                            label='Email / Username'
                            mode='outlined'
                            returnKeyType='done'
                            style={style.textField}
                            theme={{ roundness: 12 }}
                            onChangeText={(email) => this.setState({ email })} />
                        <TextInput
                            label='Password'
                            mode='outlined'
                            returnKeyType='done'
                            style={style.textField}
                            theme={{ roundness: 12 }}
                            secureTextEntry={true}
                            underlineColor={this.props.theme.colors.background}
                            onChangeText={(password) => this.setState({ password })} />
                        <HelperText
                            children='Incorrect username / password'
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
