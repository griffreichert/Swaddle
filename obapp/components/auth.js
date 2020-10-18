import React from 'react';
import { View, StyleSheet, ScrollView, Keyboard } from 'react-native';
import {
    Button,
    TextInput
} from 'react-native-paper';
import md5 from "react-native-md5";
import { connect } from 'react-redux'
import { login, logout } from '../actions/authActions'

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
        if (this.state.email == 'Griff' && this.state.password == 'Password') {
            this.props.rdx_login()
            console.log("Logged in!")
            console.log(this.state)
            this.props.navigation.navigate('ImagePicker')
        }
        else {
            console.log("no dice")
            console.log(this.state)
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

// maps state
const mapStateToProps = (state) => {
    return {
        login_status: state.authReducer.login_status
    }
}

// maps actions
const mapDispatchToProps = (dispatch) => {
    return {
        rdx_login: () => dispatch(login()),
        rdx_logout: () => dispatch(logout()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
