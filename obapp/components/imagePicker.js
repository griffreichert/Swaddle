import React from 'react';
import Header from './Header';
import * as ImagePicker from 'expo-image-picker';
import {View} from 'react-native'
import {Button} from 'react-native-paper'
/* Image Picker Object
Link to documentation: https://docs.expo.io/versions/latest/sdk/imagepicker/
Allows user to select an image from their phone and returns that image
 */  

class MediaPicker extends React.Component {

    state = {

    }
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
            </View>
        );
    }
}

export default MediaPicker;

