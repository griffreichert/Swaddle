import React, { Component } from 'react';
import { View,  StyleSheet, Text } from 'react-native';
import Header from "../Header";

class Auth extends React.Component {
    render() {
        return(
            <View style={styles.container}>
                <Header/>
                <View style={styles.textBox}>
                    <Text>Im not the header</Text>
                </View>
            </View>
        );
    }

    componentDidMount() {
        console.log("Auth component mounted")
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "powderblue",
        alignItems: "center",
        flex: 1
    },
    text: {
        fontSize: 30,
        color: "red",
    },
    textBox: {
        flex: 8,
        backgroundColor: "steelblue",
    },

});

export default Auth;