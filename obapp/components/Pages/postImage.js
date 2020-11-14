import React from 'react';
import Header from '../Atoms/Header';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { View, StyleSheet, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Text } from 'react-native'
import {
    Button,
    TextInput,
    Subheading,
    withTheme,
    RadioButton,
    Title
} from 'react-native-paper'
/* Image Picker Object
Link to documentation: https://docs.expo.io/versions/latest/sdk/imagepicker/
Allows user to select an image from their phone and returns that image
 */
import { connect } from 'react-redux'
import { login, logout } from '../../actions/authActions'
import { FlatList } from 'react-native-gesture-handler';

class PostImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            mTitle: '',
            mCaption: '',
            contacts: [
                {
                    id: 1,
                    name: 'tom',
                    permission: 1,
                },
                {
                    id: 2,
                    name: 'jim',
                    permission: 1,
                },
            ]
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
            params: { image: this.state.image }
        })
    }

    createContact(c) {
        console.log(c)
        return (
            <View style={style.contact}>
                <Title style={{alignSelf: 'center'}}>{c.item.name}</Title>
                <RadioButton
                value={1}
                status='checked'
                />
            </View>
        )
    }

    render() {
        return (
            <View style={style.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS == "ios" ? "padding" : "height"}
                        style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: this.props.theme.colors.background }}>
                        <Header navigation={this.props.navigation} />
                        {!this.state.image ? (
                            <Button
                                children='Pick a photo'
                                icon="camera"
                                mode="contained"
                                uppercase={false}
                                onPress={this.pickImage}
                                style={style.button} />
                        ) : (
                                <TouchableOpacity onPress={this.pickImage}>
                                    <Image
                                        style={style.image}
                                        resizeMode="contain"
                                        source={{ uri: `data:image/jpeg;base64,${this.state.image}` }} />
                                </TouchableOpacity>
                            )}
                        <TextInput
                            label='Title'
                            mode='outlined'
                            returnKeyType='done'
                            onChangeText={(mTitle) => this.setState({ mTitle })}
                            theme={{ roundness: 12 }}
                            style={style.textField} />
                        <TextInput
                            label='Caption'
                            theme={{ roundness: 12 }}
                            mode='outlined'
                            returnKeyType='done'
                            multiline={true}
                            style={[style.textField, { height: 70 }]} />
                        <View>
                            <FlatList
                                data={this.state.contacts}
                                keyExtractor={c => c.id.toString()}
                                renderItem={this.createContact}
                                alignSelf='center'
                            />
                        </View>
                        <Button
                            children='Send'
                            icon='send'
                            mode='contained'
                            uppercase={false}
                            style={style.button}
                            onPress={() => this.tryPost()} />
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
    textField: {
        marginVertical: 5,
        marginHorizontal: 20,
    },
    button: {
        padding: 10,
        marginTop: 10,
        alignSelf: 'center',
    },
    image: {
        height: 160,
        margin: 10
    },
    contact: {
        marginHorizontal: 20,
        marginVertical: 2,
        flexDirection:'row',
        flex: 1,
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

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(PostImage));