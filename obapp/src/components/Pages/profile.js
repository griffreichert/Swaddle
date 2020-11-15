import React from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Chip, Text, Title, withTheme } from 'react-native-paper';
import { connect } from 'react-redux'
import { login, logout } from '../../actions/authActions'
import Header from '../Atoms/Header';

class Profile extends React.Component {
    render() {
        return (
            <View style={style.container}>
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                    style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: this.props.theme.colors.background }}>
                    <Header navigation={this.props.navigation} />
                    <Button
                        children='Log out'
                        icon='logout'
                        mode='contained'
                        uppercase={false}
                        style={style.button}
                        onPress={() => this.props.rlogout()}
                    />

                    {/* Need this empty view for the keyboard avoiding view */}
                    <View style={{ flex: 1 }}></View>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner: {
        flex: 1,
        margin: 20,
    },

    button: {
        marginVertical: 10,
        padding: 10,
        width: 120,
        alignSelf: 'center',
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

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Profile));