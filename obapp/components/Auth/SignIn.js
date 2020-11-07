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
import { round } from 'react-native-reanimated';

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
        this.props.rlogin(this.state.email, '420')
        if (this.state.email === 'Griff' && this.state.password.length > 4) {
            console.log("Logged in!")
            console.log(this.state)
        }
        else {
            this.setState({ failedAttempt: true })
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={[style.container, { backgroundColor: this.props.theme.colors.background }]}>
                    <Image
                        source={require('../../assets/stork.png')}
                        resizeMode="contain"
                        style={style.logo} />
                    <TextInput
                        label='email'
                        mode='outlined'
                        returnKeyType='done'
                        style={style.textField}
                        theme={{roundness: 12}}
                        onChangeText={(email) => this.setState({ email })}
                        />
                    <TextInput
                        label='password'
                        mode='outlined'
                        returnKeyType='done'
                        style={style.textField}
                        theme={{roundness: 12}}
                        secureTextEntry={true}
                        underlineColor={this.props.theme.colors.background}
                        onChangeText={(password) => this.setState({ password })}
                    />
                    <HelperText
                        type='error'
                        style={style.textField}
                        visible={this.state.failedAttempt}>
                        Incorrect username/password
                </HelperText>
                    <Button
                        style={style.button}
                        mode='contained'
                        uppercase={false}
                        children='Sign in'
                        onPress={() => this.tryLogin()}/>
                    <SignUpButton navigation={this.props.navigation} />
                    <ResetPasswordButton navigation={this.props.navigation} />
                </View>
            </TouchableWithoutFeedback>
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
    logo: {
        height: 100, 
        alignSelf: 'center',
        margin: 10,
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

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(SignIn));
