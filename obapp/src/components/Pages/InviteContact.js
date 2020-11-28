// React Stuff
import React from 'react';
import { Keyboard, KeyboardAvoidingView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Button, HelperText, TextInput, withTheme } from 'react-native-paper';
// Redux stuff
import { connect } from 'react-redux'
import { login, logout } from '../../actions/authActions'
// Other Swaddle Components
import Header from '../Atoms/Header';


class InviteContact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            invite_email: '',
            invited: false,
        };
    }

    invite() {
        this.setState({invited: !this.state.invited})
    }

    render() {
        return (
            <View style={style.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                    style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: this.props.theme.colors.background }} >
                    <Header navigation={this.props.navigation} />
                    
                        <TextInput
                            label='Email'
                            mode='outlined'
                            returnKeyType='done'
                            theme={{ roundness: 12 }}
                            onChangeText={(invite_email) => this.setState({ invite_email })}
                            style={style.textField} />
                        <HelperText
                            children={this.state.invited ? 'Contact has been invited' : 'Enter email address of contact to invite'}
                            type='info'
                            style={style.helper} />
                        <Button
                            children={this.state.invited ? 'View contacts' : 'Invite contact'}
                            icon={this.state.invited ? 'account-group' : 'email-plus-outline'}
                            mode='contained'
                            uppercase={false}
                            style={style.button}
                            onPress={() => this.invite()} />
                        
                    {/* Need this empty view for the keyboard avoiding view */}
                    <View style={{ flex: 1 }}></View>
                </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
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
        // alignItems: 'center'
    },
    button: {
        marginVertical: 10,
        padding: 10,
        alignSelf: 'center',
    },
    avatar: {
        marginTop: 20,
        alignSelf: 'center'
    },
    helper: {
        marginVertical: 2,
        fontSize: 16,
        alignSelf: 'center',
    },
    textField: {
        marginVertical: 5,
        marginHorizontal: 20,
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
        rlogin: (username, session_token) => dispatch(login(username, session_token)),
        rlogout: () => dispatch(logout()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(InviteContact));