import React from 'react';
import { View, StyleSheet, ScrollView, Keyboard } from 'react-native';
import {
    Button,
    TextInput
} from 'react-native-paper';
import md5 from "react-native-md5";


class Auth extends React.Component {
    //const [name, setName] = useState('');

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }

    tryLogin() {
        if (this.state.email == 'Griff' && this.state.password == 'Iscool') {
            console.log("Logged in!")
            this.props.navigation.navigate('ImagePicker')
        }
        else {
            console.log("no dice")
        }
    }

    render() {
        return (
            <View style={style.container}>
                <TextInput
                    label='email'
                    mode='outlined'
                    onChangeText={(email) => this.setState({email})}
                />
                <TextInput
                    label='password'
                    style={{ marginVertical: 10 }}
                    mode='outlined'
                    onChangeText={(password) => this.setState({password})}
                />
                <Button
                    style={style.button}
                    mode='contained'
                    onPress={ () => this.tryLogin()}>
                    Log in
                </Button>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        justifyContent: 'center',
    },
    button: {
        marginVertical: 10,
        padding: 10
    },
});

export default Auth;
