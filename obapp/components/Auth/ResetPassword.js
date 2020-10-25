import React from 'react';
import { connect } from 'react-redux'
import { Alert, StyleSheet } from 'react-native';
import { login, logout } from '../../actions/authActions'
import { View } from 'react-native';
import {
    Button,
    TextInput,
    withTheme
} from 'react-native-paper';
import SignInButton from './Buttons/SignInButton';

class ResetPassword extends React.Component {
    render() {
        return (
            <View style={[style.container, { backgroundColor: this.props.theme.colors.background }]}>
                <TextInput
                    label='email'
                    mode='outlined'
                    style={style.textField}
                    onChangeText={(email) => this.setState({ email })}
                />
                <Button
                    style={style.button}
                    mode='contained'
                    onPress={() => console.log("Reset password")}>
                    Reset password
                </Button>
                <SignInButton navigation={this.props.navigation} />
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
        marginHorizontal: 80,
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

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(ResetPassword));