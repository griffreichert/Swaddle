import React from 'react';
import { connect } from 'react-redux'
import { Alert, StyleSheet } from 'react-native';
import { login, logout } from '../../actions/authActions'
import { View } from 'react-native';
import {
    Button,
    TextInput
} from 'react-native-paper';

class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmedPass: '',
            sessionId: '',
        };
    }

    tryLogin() {
        // TODO: refactor this into using API
        if (this.state.confirmedPass !== this.state.password) {
            console.log("Passwords not confirmed");
        }

        if (this.state.email == 'Griff' && this.state.password == 'Password') {
            // need to call api to create user here
            this.props.rdx_login()
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
            <View style={style.container}>
                <TextInput
                    label='email'
                    //mode='outlined'
                    onChangeText={(email) => this.setState({email})}
                />
                <TextInput
                    label='password'
                    style={{ marginVertical: 10 }}
                    //mode='outlined'
                    onChangeText={(password) => this.setState({password})}
                />
                <TextInput
                    label='confirm password'
                    style={{ marginVertical: 10 }}
                    //mode='outlined'
                    onChangeText={(confirmedPass) => this.setState({confirmedPass})}
                />
                <Button
                    style={style.button}
                    mode='contained'
                    onPress={ () => this.tryLogin()}>
                    Sign Up
                </Button>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        justifyContent: 'center',
    },
    button: {
        marginVertical: 10,
        padding: 10
    },
});

// maps state
const mapStateToProps = (state) => {
    return {
        login_status: state.authReducer.login_status
    }
}

// maps actions
const mapDispatchToProps = (dispatch) => {
    return {
        rdx_login: () => dispatch(login()),
        rdx_logout: () => dispatch(logout()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp
);
