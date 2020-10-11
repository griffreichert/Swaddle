import React from 'react';
import { View,  StyleSheet, Text } from 'react-native';

class Header extends React.Component {
    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.text}>Auth Screen</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flex: 3
    },
    text: {
        fontSize: 30,
        color: "red"
    }
});

export default Header;