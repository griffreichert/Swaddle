import React from 'react';
import { View,  StyleSheet, Text } from 'react-native';
import { Appbar, Title } from 'react-native-paper'

export default class Header extends React.Component {
    
    render() {
        return(
            <Appbar.Header>
                <Appbar.BackAction onPress={() => this.props.navigation.pop()}/>
                <Appbar.Action icon="biohazard" onPress={() => console.log("Pressed bio")}/>
                <Appbar.Action icon="cactus" onPress={() => console.log("Pressed cactus")}/>
                <Appbar.Action icon="delete" onPress={() => console.log("Pressed delete")}/>
                <Appbar.Content title="ObApp" />
            </Appbar.Header>
        );
    }
}