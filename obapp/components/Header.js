import React from 'react';
import { View,  StyleSheet, Text } from 'react-native';
import { Appbar, Title } from 'react-native-paper'

export default class Header extends React.Component {
    

    
    render() {
        return(
            <Appbar.Header>
                <Appbar.BackAction onPress={navigateBack}/>
                <Appbar.Action icon="biohazard" onPress={() => console.log("Pressed bio")}/>
                <Appbar.Action icon="cactus" onPress={() => console.log("Pressed cactus")}/>
                <Appbar.Action icon="delete" onPress={() => console.log("Pressed delete")}/>
                <Appbar.Content title="ObApp" />
            </Appbar.Header>
        );
    }
}

const navigateBack = () => {
    console.log("navigating back")      
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    text: {
        fontSize: 30,
        color: "red"
    },
    bottom: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
    },
});