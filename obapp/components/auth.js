import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import Header from './Header';


class Auth extends React.Component {
    render() {
        return(
            <View>
                <Header navigation={this.props.navigation}/>
                <Button icon="camera" mode="contained" onPress={() => {
                    console.log('Pressed');
                    this.props.navigation.navigate('ImagePicker');
                }}>
                    Pick a photo
                </Button>
            </View>
        );
    }
}

export default Auth;
