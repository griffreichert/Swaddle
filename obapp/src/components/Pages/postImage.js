import React from 'react';
import Header from '../Atoms/Header';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { View, StyleSheet, Image, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Text } from 'react-native'
import {
    Button,
    TextInput,
    Subheading,
    withTheme,
    RadioButton,
    Title,
    Avatar,
    Chip,
    HelperText
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
            tags: [],
            contacts: [
                {
                    id: 1,
                    name: 'tom',
                    permission: true,
                },
                {
                    id: 2,
                    name: 'jim',
                    permission: false,
                },
            ],
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
            allowsEditing: true,
        });

        if (!result.cancelled) {
            var aspect = result.width / result.height
            console.log(aspect)
            this.setState({ image: result.base64, aspect: aspect });

        }
    };

    tryPost() {
        console.log("posting image")
        console.log(this.state.contacts)
        this.props.navigation.navigate('Home', {
            screen: 'Feed',
            params: { image: this.state.image }
        })
    }

    toggleTag(tag) {
        // console.log('\nbefore tags')
        // console.log(this.state.tags)
        // // check if tag is in array
        // if (this.state.tags.filter(t => t.text === tag.text).length > 0) {
        //     // if in array, remove it
        //     this.setState({tags: this.state.tags.filter(t => t.text !== tag.text)})
        // }
        // // otherwise add it
        // else {
        //     console.log('adding')
        //     var new_tag = {}
        //     new_tag.text = tag.text
        //     new_tag.icon = tag.icon
        //     new_tag.selected = true
        //     console.log([...this.state.tags, new_tag])
        //     this.setState({tags: 'hi'})
        //     console.log('after tags')
        //     console.log(this.state.tags)
        // }
        this.setState({tags: this.state.tags.map(t => {
            if (t.text === tag.text) {
                t.selected = !t.selected
            }
            return t
        })})
    }

    componentDidMount() {
        this.setState({tags: tags})
    }


    render() {
        return (
            <View style={style.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS == "ios" ? "padding" : "height"}
                        style={{ flex: 1, justifyContent: 'flex-start' , backgroundColor: this.props.theme.colors.background }}>
                        <Header navigation={this.props.navigation} />
                        <ScrollView>
                        {!this.state.image ? (
                            <Button
                                children='Pick a photo'
                                icon="cloud-upload-outline"
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
                            multiline={true}
                            style={[style.textField, { height: 80 }]} />
                        <HelperText
                            children='Customize your post with tags:'
                            style={{ fontSize: 20, alignSelf: 'center', marginTop: 10 }}
                        />
                        {/* <ScrollView horizontal={true}> */}
                        <View style={{flex: 1, flexDirection:'row', flexWrap: 'wrap'}}>
                            {tags.map((tag) => {
                                return (<View
                                    key={tag.text}
                                    style={{ margin: 5, flexWrap: 'wrap' }}>
                                    <Chip
                                        icon={tag.icon}
                                        mode='outlined'
                                        selected={tag.selected}
                                        onPress={() => this.toggleTag(tag)}>
                                        {tag.text}
                                    </Chip>
                                </View>)
                            })}
                        </View>
                        {/* </ScrollView> */}
                        <HelperText
                            children='Select contacts to share with:'
                            style={{ fontSize: 20, alignSelf: 'center', marginTop: 10 }}
                        />
                            <FlatList
                                data={this.state.contacts}
                                keyExtractor={c => c.id.toString()}
                                renderItem={(c, theme = this.props.theme) =>
                                    <View style={style.contact}>
                                        <Avatar.Image size={40} source={require('../../../assets/stork.png')} />
                                        <Title>{c.item.name}</Title>
                                        <RadioButton
                                            value={1}
                                            style={{backgroundColor: theme.colors.primary}}
                                            status={c.item.permission ? 'checked' : 'unchecked'}
                                            onPress={() => {
                                                var id = c.item.id
                                                var tmp = this.state.contacts
                                                var i = tmp.findIndex(c => c.id === id)
                                                tmp[i].permission = !tmp[i].permission
                                                this.setState({ contacts: tmp })
                                            }}
                                        />
                                    </View>}
                            />
                        <Button
                            children='Share'
                            icon='send'
                            mode='contained'
                            uppercase={false}
                            style={[style.button, {marginBottom: 40}]}
                            onPress={() => this.tryPost()} />
                        </ScrollView>
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
        height: 200,
        margin: 10
    },
    contact: {
        marginHorizontal: 20,
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
    },
});

const tags = [
    {
        text: 'heartbeat',
        icon: 'heart',
        selected: false
    },
    {
        text: 'ultrasound',
        icon: 'stethoscope',
        selected: false
    },
    {
        text: 'excited',
        icon: 'emoticon-excited',
        selected: false
    },
    {
        text: 'update',
        icon: 'comment-alert-outline',
        selected: false
    },
    {
        text: 'kicking',
        icon: 'foot-print',
        selected: false
    },

];

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