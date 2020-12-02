import React from 'react';
import { Button } from 'react-native-paper'

class SignUpButton extends React.Component {
    render() {
        return (
            <Button
                mode='text'
                uppercase={false}
                style={{ marginHorizontal: 100 }}
                onPress={() => this.props.navigation.navigate("Sign Up")}>
                Sign up
            </Button>
        );
    }
}

export default SignUpButton;
