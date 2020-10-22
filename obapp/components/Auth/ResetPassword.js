import React from 'react';
import { connect } from 'react-redux'
import { Alert, StyleSheet } from 'react-native';
import { login, logout } from '../../actions/authActions'
import { View } from 'react-native';
import {
    Button,
    TextInput
} from 'react-native-paper';

class ResetPassword extends React.Component {
    render() {
        return (
            <View style={style.container}>
                <TextInput
                    label='email'
                    //mode='outlined'
                    onChangeText={(email) => this.setState({email})}
                />
                <Button
                    style={style.button}
                    mode='contained'
                    onPress={ () => console.log("Reset password")}>
                    Reset password
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

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);