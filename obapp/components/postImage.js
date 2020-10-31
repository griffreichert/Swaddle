import React from 'react';
import Header from './Header';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { View, StyleSheet, Image } from 'react-native'
import { 
    Button,
    HelperText,
    TextInput,
    Title,
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
      }

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

    render() {
        return(
            <View style={[style.container, { backgroundColor: this.props.theme.colors.background }]}>
                <Header navigation={this.props.navigation}/>
                <Button 
                    icon="camera" 
                    mode="outlined" 
                    uppercase={false}
                    theme={{roundness: 0}}
                    onPress={this.pickImage}>
                    Pick a photo
                </Button>
                <View style={{flexDirection: "row", height: 200}}>
                {/* <View style={{ backgroundColor: this.props.theme.colors.background, justifyContent: 'left' }}> */}
                    <View style={{flex:0.5, justifyContent: 'center'}}>
                        {this.state.image && <Image 
                            style={{ height: 100, marginHorizontal: 20 }}
                            resizeMode="contain"
                            source={{ uri: `data:image/jpeg;base64,${this.state.image}` }}
                        />}
                    </View>
                    <View style={{flex: 0.5}}>
                        <Title style={{alignSelf: 'center'}}>Post title</Title>
                    
                    <TextInput
                        // label='title'
                        // theme={{roundness: 0}}
                        mode='outlined'
                        style={{margin: 5, height: 100}}
                        multiline={true}
                        blurOnSubmit={true}
                        returnKeyType = 'done'
                        text='top'
                        />
                    </View>
                </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(PostImage));


