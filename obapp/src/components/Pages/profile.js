import React from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar, Button, Card, Chip, HelperText, Text, Title, withTheme } from 'react-native-paper';
import { connect } from 'react-redux'
import { login, logout } from '../../actions/authActions'
import Header from '../Atoms/Header';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: '',
        };
    }

    render() {
        return (
            <View style={style.container}>
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                    style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: this.props.theme.colors.background }} >
                    <Header navigation={this.props.navigation} />
                    <View style={style.inner} >
                        <TouchableOpacity onPress={() => console.log('pick image')}>
                            {this.state.image ? (
                                <Avatar.Image
                                    size={80}
                                    source={{ uri: `data:image/jpeg;base64,${this.state.image}` }}
                                    style={style.avatar} />
                            ) : (
                                    <Avatar.Image
                                        size={80}
                                        source={require('../../../assets/avatar.png')}
                                        style={style.avatar} />
                                )}
                            <HelperText
                                children='tap to change profile picture' />
                        </TouchableOpacity>
                        <Button
                            children='Log out'
                            icon='logout'
                            mode='contained'
                            uppercase={false}
                            style={style.button}
                            onPress={() => this.props.rlogout()} />
                    </View>
                    {/* Need this empty view for the keyboard avoiding view */}
                    <View style={{ flex: 1 }}></View>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner: {
        flex: 1,
        margin: 20,
        alignItems: 'center'
    },
    button: {
        marginVertical: 10,
        padding: 10,
        width: 120,
    },
    avatar: {
        // marginTop: 10,
        alignSelf: 'center'
    },

});

// maps state
const mapStateToProps = (state) => {
    return {
        email: state.authReducer.email,
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

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Profile));