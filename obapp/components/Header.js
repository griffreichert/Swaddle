import React from 'react';
import { View,  StyleSheet, Text } from 'react-native';
import { Appbar, Title } from 'react-native-paper'
import { connect } from 'react-redux'
import { login, logout } from '../actions/authActions'

class Header extends React.Component {


    render() {
        return(
            <Appbar.Header>
                <Appbar.BackAction onPress={() => this.props.navigation.pop()}/>
                <Appbar.Action icon="cactus" onPress={() => console.log(this.state)}/>
                <Appbar.Content title="ObApp" />
            </Appbar.Header>
        );
    }
}

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
export default connect(mapStateToProps, mapDispatchToProps)(Header);
