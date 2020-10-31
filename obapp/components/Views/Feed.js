import React from 'react';
import { StyleSheet, View } from 'react-native';
import { withTheme } from 'react-native-paper';
import { connect } from 'react-redux'
import Header from '../Header';
import MediaButton from '../MediaButton';

class Feed extends React.Component {
    render () {
        return(
            <View style={[style.container, { backgroundColor: this.props.theme.colors.background }]}>
                <Header navigation={this.props.navigation}/>
                <MediaButton navigation={this.props.navigation}/>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
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
        rlogin: (username, session_token) => dispatch(login(username, session_token)),
        rlogout: () => dispatch(logout()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Feed));
