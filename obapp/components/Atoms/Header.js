import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { withTheme, Appbar, Title } from 'react-native-paper'
import { connect } from 'react-redux'
import { login, logout } from '../../actions/authActions'

class Header extends React.Component {
    render() {
        return(
            <Appbar.Header>
                <Appbar.Action icon="menu" onPress={() => this.props.navigation.toggleDrawer()}/>
                <Appbar.Content title="" />
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Home', {screen: 'Feed'})}>
                    <Image
                        source={require('../../assets/stork.png')}
                        resizeMode="contain"
                        style={{
                            width: 80,
                        }} />
                </TouchableOpacity>
                <Appbar.Content title="" />
                <Appbar.Action icon="account-child" onPress={() => console.log(this.state)}/>
            </Appbar.Header>
        );
    }
}

// maps state
const mapStateToProps = (state) => {
    return {
        login_status: state.authReducer.login_status,
        username: state.authReducer.username,
        session_token: state.authReducer.session_token,
    }
}

// maps actions
const mapDispatchToProps = (dispatch) => {
    return {
        rlogin: (username, session_token) => dispatch(login(username, session_token)),
        rlogout: () => dispatch(logout()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Header));
