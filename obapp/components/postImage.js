import React from 'react';
import Header from './Header';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { View, StyleSheet, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import {
    Button,
    TextInput,
    Subheading,
    withTheme
} from 'react-native-paper'
/* Image Picker Object
Link to documentation: https://docs.expo.io/versions/latest/sdk/imagepicker/
Allows user to select an image from their phone and returns that image
 */
import { connect } from 'react-redux'
import { login, logout } from '../actions/authActions'

class PostImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            mTitle: '',
            mCaption: ''
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
            quality: 1,
            base64: true,
        });

        if (!result.cancelled) {
            this.setState({ image: result.base64 });
            
        }
    };

    tryPost() {
        console.log("posting image")
        this.props.navigation.navigate('Home', {
            screen: 'Feed',
            params: {image: this.state.image}
        })
    }

    render() {
        return (
            <View style={style.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS == "ios" ? "padding" : "height"}
                        style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: this.props.theme.colors.background }}>
                        <Header navigation={this.props.navigation} />
                        <Button
                            children='Pick a photo'
                            icon="camera"
                            mode="outlined"
                            uppercase={false}
                            theme={{ roundness: 0 }}
                            onPress={this.pickImage}
                            style={{ padding: 10, marginBottom: 10 }} />
                        {this.state.image && <Image
                            style={{ height: 180, margin: 20 }}
                            resizeMode="contain"
                            source={{ uri: `data:image/jpeg;base64,${this.state.image}` }}
                        />}
                        <Subheading
                            children='Message title'
                            style={{ alignSelf: 'center', color: this.props.theme.colors.primary }} />
                        <TextInput
                            mode='outlined'
                            returnKeyType='done'
                            onChangeText={(mTitle) => this.setState({ mTitle })}
                            style={{ marginVertical: 5, marginHorizontal: 20 }} />
                        <Subheading
                            children='Caption'
                            style={{ alignSelf: 'center', color: this.props.theme.colors.primary }} />
                        <TextInput
                            // label='title'
                            // theme={{roundness: 0}}
                            mode='outlined'
                            returnKeyType='done'
                            multiline={true}
                            blurOnSubmit={true}
                            style={{ marginVertical: 5, marginHorizontal: 20, height: 80 }} />
                        <Button
                            children='Send'
                            icon='send'
                            mode='contained'
                            uppercase={false}
                            style={{ padding: 10, marginHorizontal: 120, marginTop: 10 }}
                            onPress={() => this.tryPost()} />
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
        padding: 24,
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
        rdx_login: (username, session_token) => dispatch(login(username, session_token)),
        rdx_logout: () => dispatch(logout()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(PostImage));