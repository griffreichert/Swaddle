import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux'

class Home extends React.Component {
    render () {
        return(
            <View style={style.container}>
                <Text>Hi</Text>
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
        login_status: state.authReducer.login_status,
        username: state.authReducer.username,
        session_token: state.authReducer.session_token,
    }
}

// maps actions
const mapDispatchToProps = (dispatch) => {
    return {
        rdx_login: (username, session_token) => dispatch(login(username, session_token)),
        rdx_logout: () => dispatch(logout()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
