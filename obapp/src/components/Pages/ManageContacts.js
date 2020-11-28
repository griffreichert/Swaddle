// React Stuff
import React from 'react';
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, ScrollView, StyleSheet, View, FlatList } from 'react-native';
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
            contacts: [],
            // removing: true,
        };
    }

    componentDidMount() {
        this.setState({ contacts: contacts })
    }

    removeContact(id) {
        console.log('Remove: ' + id)
    }

    render() {
        return (
            <View style={style.container}>
                <Header navigation={this.props.navigation} />
                <View>
                    <FlatList
                        data={this.state.contacts}
                        renderItem={({ item }) => (
                            <View style={style.contact} key={item.id}>
                                <View style={{ flex: 1 }}>
                                    <Avatar.Image
                                        size={40}
                                        source={item.avatar ? require('../../../assets/stork.png') : require('../../../assets/avatar.png')} />
                                </View>
                                <View style={{ flex: 3 }}>

                                    <HelperText
                                        children={item.first_name + ' ' + item.last_name}
                                        style={style.helper} />

                                </View>
                                    <View style={{ flex: 1 }}>
                                {this.state.removing && (
                                        <Button
                                            icon='trash-can-outline'
                                            onPress={() => this.removeContact(item.id)}
                                            style={style.trash} /> )}
                                    </View>

                            </View>
                        )}/>
                    <Button
                        children={!this.state.removing ? 'Manage contacts' : 'Save contacts'}
                        icon={!this.state.removing ?'trash-can-outline' : 'content-save'}
                        mode='contained'
                        uppercase={false}
                        onPress={() => this.setState({removing: !this.state.removing})}
                        style={style.button} />
                    <Button
                        children='Invite new contact'
                        icon='email-plus-outline'
                        mode='contained'
                        uppercase={false}
                        onPress={() => this.props.navigation.navigate('Invite contact')}
                        style={style.button} />
                </View>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        alignContent: 'flex-end'
    },
    inner: {
        flex: 1,
        margin: 20,
    },

    button: {
        marginVertical: 10,
        padding: 10,
        alignSelf: 'center'
    },
    contact: {
        marginHorizontal: 20,
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
    },
    helper: {
        fontSize: 20,
        alignSelf: 'center',
        marginTop: 10
    },
    trash: {
        fontSize: 30,
        // textAlign: 'center'
        // width: 50
    }
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