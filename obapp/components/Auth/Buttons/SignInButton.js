import React from 'react';
import { Button } from 'react-native-paper'

class SignInButton extends React.Component {
    render () {
        return (
            <Button
                mode='text'
                uppercase={false}
                style={{marginHorizontal: 100}}
                onPress={() => this.props.navigation.navigate("Sign In")}>
                Sign in
            </Button>
        );
    }   
}

export default SignInButton;
