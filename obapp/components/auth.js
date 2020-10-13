import React from 'react';
import { Button } from 'react-native-paper';


export default class Auth extends React.Component {
    render() {
        return(
            <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
                Press me
            </Button>
        );
    }

    componentDidMount() {
        console.log("Auth component mounted")
    }
}
