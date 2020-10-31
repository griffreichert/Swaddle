import React from 'react';
import Header from './Header';
import * as ImagePicker from 'expo-image-picker';
import { View, StyleSheet } from 'react-native'
import { 
    Button,
    withTheme 
} from 'react-native-paper'
/* Image Picker Object
Link to documentation: https://docs.expo.io/versions/latest/sdk/imagepicker/
Allows user to select an image from their phone and returns that image
 */  
import { connect } from 'react-redux'
import { login, logout } from '../actions/authActions'

class MediaPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            img_uri: '',
        };
    }

    setImage(new_uri) {
        this.setState({img_uri: new_uri});
    }
    
    async openImagePickerAsync() {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    
        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }
        // let pickerResult = await ImagePicker.launchImageLibraryAsync({
        //     mediaTypes: ImagePicker.MediaTypeOptions.Photos,
        //     // mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        // });
        // if (!pickerResult.cancelled) {
        //     console.log(pickerResult);
        //     this.setImage(pickerResult.uri);
        // }
        ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Photos,
            // mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        }).then((res) => {
            if (!pickerResult.cancelled) {
                console.log(pickerResult);
                this.setImage(pickerResult.uri);
            }
        });
    }

    render() {
        return(
            <View style={[style.container, { backgroundColor: this.props.theme.colors.background }]}>
                <Header navigation={this.props.navigation}/>
                <Button icon="camera" mode="contained" onPress={this.openImagePickerAsync}>
                    Pick a photo
                </Button>
                <Button icon="cactus" mode="contained" onPress={ () => { 
                        console.log(this.props.login_status) 
                    }}>
                    state
                </Button>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
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
        rdx_login: (username, session_token) => dispatch(login(username, session_token)),
        rdx_logout: () => dispatch(logout()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(MediaPicker));


