// React Stuff
import React from 'react';
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Button, RadioButton, Card, Chip, HelperText, Text, Title, withTheme } from 'react-native-paper';
// Redux stuff
import { connect } from 'react-redux'
import { login, logout } from '../../actions/authActions'
// Other Swaddle Components
import Header from '../Atoms/Header';

import { contacts } from '../Atoms/ContactsList'

class Contacts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: []
        };
    }

    componentDidMount() {
        this.setState({ contacts: contacts })
        console.log(this.state.contacts)
    }

    render() {
        return (
            <View style={style.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS == "ios" ? "padding" : "height"}
                        style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: this.props.theme.colors.background }}>
                        <Header navigation={this.props.navigation} />
                        <ScrollView>
                        <View>
                                {this.state.contacts.map(contact => {
                                    return (
                                        <View style={style.contact} key={contact.id}>
                                            <Avatar.Image 
                                                size={40} 
                                                source={contact.avatar ? require('../../../assets/stork.png') : require('../../../assets/avatar.png')} />
                                            <Title style={{color: this.props.theme.colors.placeholder}}>
                                                {contact.first_name + ' ' + contact.last_name}
                                            </Title>
                                            <RadioButton
                                                value={1}
                                                color={this.props.theme.colors.primary}
                                                style={{ backgroundColor: this.props.theme.colors.primary }}
                                                status={contact.permission ? 'checked' : 'unchecked'}
                                                onPress={() => {
                                                    this.setState({
                                                        contacts:
                                                            this.state.contacts.map(c => {
                                                                if (c.id === contact.id) {
                                                                    c.permission = !c.permission
                                                                }
                                                                return c
                                                            })
                                                    })
                                                }}
                                            />
                                        </View>)
                                })}
                            </View>
                                <Button
                                    children='hi'/>
                                    </ScrollView>
                        <View style={{ flex: 1 }}></View>
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'flex-end'
    },
    inner: {
        flex: 1,
        margin: 20,
    },

    button: {
        marginVertical: 10,
        padding: 10
    },
    contact: {
        marginHorizontal: 20,
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
    },
});

// maps state
const mapStateToProps = (state) => {
    return {
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

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Contacts));