import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';


class ResetPasswordButton extends React.Component {
    render () {
        return (
            <TouchableOpacity 
            style={style.textLink} 
            onPress={() => this.props.navigation.navigate("Forgot Password")}
            >
            <Text style={style.text}>
                Forgot password
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
    text: {
        // fontFamily: 'Rubik-Regular',
    }
});

export default ResetPasswordButton;