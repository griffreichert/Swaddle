import React, { Component } from 'react';
import { Image,  StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { StatusBar } from 'expo-status-bar';
import * as ExpoImagePicker from 'expo-image-picker';

/* Image Picker Object
Link to documentation: https://docs.expo.io/versions/latest/sdk/imagepicker/
Allows user to select an image from their phone and returns that image
 */  

class MediaPicker extends React.Component {

    render() {
        let openImagePickerAsync = async () => {
            let permissionResult = await ExpoImagePicker.requestCameraRollPermissionsAsync();
        
            if (permissionResult.granted === false) {
                alert("Permission to access camera roll is required!");
                return;
            }
        
            let pickerResult = await ExpoImagePicker.launchImageLibraryAsync();
            console.log(pickerResult);
        }
        
        const styles = StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: '#7760ea',
                alignItems: 'center',
                justifyContent: 'center',
            },
            iconButton: {
                width: 40,
                height: 40,
                margin: 10,
            },
            text: {
        
            },
            title: {
        
            },
        });

        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={ openImagePickerAsync }>
                    <Image
                        source={ require('../assets/camera.png') }
                        style={ styles.iconButton }
                        />
                </TouchableOpacity>
        
                <StatusBar style="auto" />
            </View>
        );
    }
}

export default MediaPicker;

