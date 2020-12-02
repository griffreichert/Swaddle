import React from 'react';
import { connect } from 'react-redux'
import { Image, Keyboard, KeyboardAvoidingView, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { login, logout } from '../../actions/authActions'
import { View } from 'react-native';
import {
    Button,
    TextInput,
    HelperText,
    withTheme
} from 'react-native-paper';
import SignInButton from './Buttons/SignInButton';

class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            submitted: false,
            badAttempt: false,
        };
    }

    tryReset() {
        this.setState({ badAttempt: false });
        // need to send api call here
        if (this.state.email.includes('@')) {
            this.setState({ submitted: true });
        }
        else {
            this.setState({ badAttempt: true });
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
                            label='Email'
                            mode='outlined'
                            returnKeyType='done'
                            theme={{ roundness: 12 }}
                            style={style.textField}
                            onChangeText={(email) => this.setState({ email })} />
                        <HelperText
                            children={this.state.badAttempt ? 'Please enter a valid email' : 
                                'An email has been sent to ' + this.state.email + ' to reset your password'}
                            type={this.state.badAttempt ? 'error' : 'info'}
                            style={style.helper}
                            visible={this.state.submitted || this.state.badAttempt} />
                        <Button
                            children='Reset password'
                            style={style.button}
                            mode='contained'
                            uppercase={false}
                            onPress={() => this.tryReset()} />
                        <SignInButton navigation={this.props.navigation} />
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
        width: 180,
        alignSelf: 'center',
    },
    textField: {
        marginVertical: 5,
        marginHorizontal: 40,
    },
    helper: {
        marginVertical: 2,
        marginHorizontal: 20,
        textAlign: 'center',
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
        login_status: state.authReducer.login_status,
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

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(ResetPassword));