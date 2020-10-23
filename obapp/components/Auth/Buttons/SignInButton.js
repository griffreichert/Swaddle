import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';


class SignInButton extends React.Component {
    render () {
        return (
            <TouchableOpacity 
            style={style.textLink} 
            onPress={() => this.props.navigation.navigate("Sign In")}
            >
            <Text>
                Sign In
            </Text>
        </TouchableOpacity> 
        );
    }
    
}
const style = StyleSheet.create({
    textLink: {
        alignItems: "center",
        margin: 10,
    },
});

export default SignInButton;
