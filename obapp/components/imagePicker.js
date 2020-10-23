import React from 'react';
import Header from './Header';
import * as ImagePicker from 'expo-image-picker';
import { View } from 'react-native'
import { Button } from 'react-native-paper'
/* Image Picker Object
Link to documentation: https://docs.expo.io/versions/latest/sdk/imagepicker/
Allows user to select an image from their phone and returns that image
 */  
import { connect } from 'react-redux'
import { login, logout } from '../actions/authActions'

class MediaPicker extends React.Component {

    
    async openImagePickerAsync() {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    
        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }
        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        console.log(pickerResult);
        // setState({img_uri: pickerResult.uri})
    }

    render() {
        return(
            <View>
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

export default connect(mapStateToProps, mapDispatchToProps)(MediaPicker);


