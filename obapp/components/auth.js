import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import Header from './Header';


class Auth extends React.Component {
    render() {
        return(
            <View>
                <Header/>
                <Button icon="camera" mode="contained" onPress={(navigation) => {
                    console.log('Pressed');
                    this.props.navigation.navigate('ImagePicker');
                }}>
                    Press me
                </Button>
            </View>
        );
    }

    componentDidMount() {
        console.log("Auth component mounted")
    }
}

export default Auth;
