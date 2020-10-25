import React from 'react';
import { connect } from 'react-redux'
import { Alert, StyleSheet } from 'react-native';
import { login, logout } from '../../actions/authActions';
import SignInButton from './Buttons/SignInButton';
import { View } from 'react-native';
import {
    Button,
    TextInput,
    withTheme
} from 'react-native-paper';

class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmedPass: '',
        };
    }

    tryLogin() {
        // TODO: refactor this into using API
        if (this.state.confirmedPass !== this.state.password) {
            console.log("Passwords not confirmed");
        }

        if (this.state.email == 'Griff' && this.state.password == 'Password') {
            // need to call api to create user here
            this.props.rlogin()
            console.log("Logged in!")
            console.log(this.state)
            this.props.navigation.navigate('ImagePicker')
        }
        else {
            <Alert  />
            console.log("no dice")
            console.log(this.state)
        }
    }

    render() {
        return (
            <View style={[style.container, { backgroundColor: this.props.theme.colors.background }]}>
                <TextInput
                    label='email'
                    mode='outlined'
                    style={style.textField}
                    onChangeText={(email) => this.setState({email})}
                />
                <TextInput
                    label='username'
                    mode='outlined'
                    style={style.textField}
                    onChangeText={(username) => this.setState({username})}
                />
                <TextInput
                    label='password'
                    mode='outlined'
                    style={style.textField}
                    onChangeText={(password) => this.setState({password})}
                />
                <TextInput
                    label='confirm password'
                    mode='outlined'
                    style={style.textField}
                    onChangeText={(confirmedPass) => this.setState({confirmedPass})}
                />
                <Button
                    style={style.button}
                    mode='contained'
                    onPress={ () => this.tryLogin()}>
                    Sign Up
                </Button>
                <SignInButton navigation={this.props.navigation}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(SignUp));
