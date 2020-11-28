// React Stuff
import React from 'react';
import { Keyboard, KeyboardAvoidingView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Button, HelperText, TextInput, withTheme } from 'react-native-paper';
// Redux stuff
import { connect } from 'react-redux'
import { login, logout } from '../../actions/authActions'
// Other Swaddle Components
import Header from '../Atoms/Header';


class changePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            old_password: '',
            new_password: '',
            confirmedPass: '',
            badPassword: false,
            emptyFields: false,
            mismatch: false,
            success: false,
        };
    }

    tryChangePassword() {
        this.setState({ emptyFields: false, badPasswords: false })
        // console.log("TODO: change password with api")
        if (this.state.success) {
            this.props.navigation.navigate('Profile')
        }
        else if (!this.state.old_password | !this.state.new_password | !this.state.confirmedPass ) {
            this.setState({ emptyFields: true })
        }
        // check new passwords match
        else if (this.state.new_password !== this.state.confirmedPass) {
            this.setState({ mismatch: true })
        }
        else {
            // check that old password is good
            if (this.state.old_password == 'bad') {
                this.setState({ badPassword: true })

            }
            else {
                console.log("TODO change password with API")
                this.setState({ success: true })
            }
        }
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
                            label='Old password'
                            mode='outlined'
                            returnKeyType='done'
                            secureTextEntry={true}
                            theme={{ roundness: 12 }}
                            onChangeText={(old_password) => this.setState({ old_password })}
                            style={style.textField} />
                        <TextInput
                            label='New password'
                            mode='outlined'
                            returnKeyType='done'
                            secureTextEntry={true}
                            theme={{ roundness: 12 }}
                            onChangeText={(new_password) => this.setState({ new_password })}
                            style={style.textField} />
                        <TextInput
                            label='Confirm password'
                            mode='outlined'
                            returnKeyType='done'
                            secureTextEntry={true}
                            theme={{ roundness: 12 }}
                            onChangeText={(confirmedPass) => this.setState({ confirmedPass })}
                            style={style.textField} />
                        <HelperText
                            children={this.state.success ? 'Password changed successfully' : (this.state.emptyFields | this.state.mismatch) ? 
                                'Passwords do not match' : 'Incorrect password'}
                            type={this.state.success ? 'info' : 'error'}
                            style={style.helper}
                            visible={this.state.emptyFields | this.state.mismatch | this.state.badPassword | this.state.success}
                            style={style.helper} />
                        <Button
                            children={this.state.success ? 'Return to profile' : 'Change password'}
                            icon={this.state.success ? 'keyboard-return' : 'pencil-lock-outline'}
                            mode='contained'
                            uppercase={false}
                            style={style.button}
                            onPress={() => this.tryChangePassword()} />
                        
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

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(changePassword));