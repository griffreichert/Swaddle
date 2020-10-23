import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';


class SignUpButton extends React.Component {
    render () {
        return (
            <TouchableOpacity 
            style={style.textLink} 
            onPress={() => this.props.navigation.navigate("Sign Up")}
            >
            <Text>
                Sign up
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

export default SignUpButton;
