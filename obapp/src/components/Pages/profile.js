// React Stuff
import React from 'react';
import { Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar, Button, Card, Chip, HelperText, Text, TextInput, Title, withTheme } from 'react-native-paper';
// Redux stuff
import { connect } from 'react-redux'
import { login, logout } from '../../actions/authActions'
// Other Swaddle Components
import Header from '../Atoms/Header';
// expo stuff
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import DateTimePicker from '@react-native-community/datetimepicker';
import api from '../../Internals/apiClient';


class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            first_name: 'Natalie',
            last_name: 'French',
            email: 'natalief@gmail.com',
            image: '',
            due_date: new Date(),
        };
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(
                Permissions.CAMERA_ROLL,
                Permissions.CAMERA
            );
            if (status !== 'granted') {
                alert('We need camera roll permissions, please visit settings and manually re-allow Expo to Read & Write photos.');
            }
        }
    };

    pickImage = async () => {
        await this.getPermissionAsync();
        console.log("Attempting to pick image.");
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.5,
            base64: true,
            allowsEditing: true
        });
        if (!result.cancelled) {
            // TODO post new avatar to API
            console.log('\n!! TODO: Post profile avatar to API')
            this.setState({ image: result.base64 });
        }
    };

    updateProfile() {
        if (!this.state.editing) {
            console.log('editing profile')
            this.setState({ editing: true })
        }
        else {
            console.log('saving profile')
            // TODO: Send API call
            this.setState({ editing: false })
        }
    }

    tryLogout() {
        api.put('/logout', {}, {
            headers: {
                'token': this.props.session_token
            }
        }).catch(err => console.log(err.status))
        this.props.rlogout()
    }

    componentDidMount() {
        console.log('\n!! TODO: Get profile from API')
    }

    render() {
        return (
            <View style={style.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                    style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: this.props.theme.colors.background }} >
                    <Header navigation={this.props.navigation} />
                    {/* <View style={style.inner} > */}
                        <TouchableOpacity onPress={this.pickImage}>
                            {this.state.image ? (
                                <Avatar.Image
                                    size={80}
                                    source={{ uri: `data:image/jpeg;base64,${this.state.image}` }}
                                    style={style.avatar} />
                            ) : (
                                    <Avatar.Image
                                        size={80}
                                        source={require('../../../assets/avatar.png')}
                                        style={style.avatar} />
                                )}
                            <HelperText
                                children='Tap to change profile picture'
                                style={style.helper} />
                        </TouchableOpacity>

                        <TextInput
                            label='First name'
                            mode='outlined'
                            returnKeyType='done'
                            theme={{ roundness: 12 }}
                            disabled={!this.state.editing}
                            style={style.textField}
                            onChangeText={(first_name) => this.setState({ first_name })}
                            value={this.state.first_name} />
                        <TextInput
                            label='Last name'
                            mode='outlined'
                            returnKeyType='done'
                            theme={{ roundness: 12 }}
                            disabled={!this.state.editing}
                            style={style.textField}
                            onChangeText={(last_name) => this.setState({ last_name })}
                            value={this.state.last_name} />
                        <TextInput
                            label='Email'
                            mode='outlined'
                            returnKeyType='done'
                            theme={{ roundness: 12 }}
                            disabled={!this.state.editing}
                            style={style.textField}
                            onChangeText={(email) => this.setState({ email })}
                            value={this.state.email} />
                        <TextInput
                            label='Due date'
                            mode='outlined'
                            returnKeyType='done'
                            theme={{ roundness: 12 }}
                            disabled={true}
                            style={style.textField}
                            value={this.state.due_date.getMonth() + 1 + '/' + this.state.due_date.getDate() + '/' + (this.state.due_date.getYear() + 1900)} />
                        

                        <Button
                            children={this.state.editing ? 'Save changes' : 'Edit profile'}
                            icon='pencil-outline'
                            mode='contained'
                            uppercase={false}
                            style={style.button}
                            onPress={() => this.updateProfile()} />
                        <Button
                            children={this.state.due_date ? 'Update due date' : 'Enter due date'}
                            icon='calendar-month'
                            // icon='calendar-heart'
                            mode='contained'
                            uppercase={false}
                            style={style.button}
                            onPress={() => this.props.navigation.navigate('Update due date')} />
                        <Button
                            children='Change password'
                            icon='pencil-lock-outline'
                            mode='contained'
                            uppercase={false}
                            style={style.button}
                            onPress={() => this.props.navigation.navigate('Change password')} />

                        <Button
                            children='Log out'
                            icon='logout'
                            mode='contained'
                            uppercase={false}
                            style={style.button}
                            onPress={() => this.tryLogout()} />
                        {/* </View> */}
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
        marginVertical: 5,
        padding: 10,
        alignSelf: 'center',
    },
    avatar: {
        marginTop: 20,
        alignSelf: 'center'
    },
    helper: {
        marginVertical: 2,
        // fontSize: 16,
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

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Profile));