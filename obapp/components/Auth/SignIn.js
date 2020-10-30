import React from 'react';
import { connect } from 'react-redux'
import { login, logout } from '../../actions/authActions'
import { StyleSheet, View } from 'react-native';
import {
    Button,
    HelperText,
    TextInput,
    withTheme
} from 'react-native-paper';
import ResetPasswordButton from './Buttons/ResetPasswordButton';
import SignUpButton from './Buttons/SignUpButton';

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
        if (this.state.email === 'Griff' && this.state.password.length > 4) {
            this.props.rlogin(this.state.email, '420')
            console.log("Logged in!")
            console.log(this.state)
            // this.props.navigation.navigate('ImagePicker')
        }
        else {
            this.setState({failedAttempt: true})
        }
    }

    render() {
        return (
            <View style={[style.container, { backgroundColor: this.props.theme.colors.background }]}>
                <TextInput
                    label='email'
                    style={style.textField}
                    mode='outlined'
                    onChangeText={(email) => this.setState({email})}
                    />
                <TextInput
                    label='password'
                    style={style.textField}
                    secureTextEntry={true}
                    mode='outlined'
                    underlineColor={this.props.theme.colors.background}
                    onChangeText={(password) => this.setState({password})}
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
                    onPress={ () => this.tryLogin()}>
                    Sign in
                </Button>
                <SignUpButton navigation={this.props.navigation}/>
                <ResetPasswordButton navigation={this.props.navigation}/>
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
        fontFamily: 'Rubik-Italic',
    },
    textField: {
        marginVertical: 5,
        marginHorizontal: 40,
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
