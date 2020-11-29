// React Stuff
import React from 'react';
import { Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar, Button, Card, Chip, HelperText, Text, TextInput, Title, withTheme } from 'react-native-paper';
// Redux stuff
import { connect } from 'react-redux'
import { login, logout } from '../../actions/authActions'
// Other Swaddle Components
import Header from '../Atoms/Header';
// expo stuff
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import DateTimePicker from '@react-native-community/datetimepicker';
import api from '../../Internals/apiClient';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            image: '',
            due_date: '',
        };
    }

    
    updateDueDate() {
        this.updateProfile()
    }


    componentDidMount() {
        // this.loadProfile();
        this._refresh = this.props.navigation.addListener('focus', () => this.loadProfile());
        return this._refresh;
    }

    componentWillUnmount() {
        this.props.navigation.remove
    }

    loadProfile() {
        console.log('\ngetting profile')
        api.get('/load_profile', {
            headers: {
                'token': this.props.session_token
            }
        }).then(res => {
            var profile = res.data.data
            // console.log(profile)
            var date = profile.due_date
            if (date) {
                console.log('date: ' + date)
                date = new Date(date)
            }
            this.setState({
                first_name: profile.first_name,
                last_name: profile.last_name,
                email: profile.email,
                image: profile.avatar,
                due_date: date,
            })
        }).catch(err => console.log('ERR: ' + err))
    }

    updateProfile() {
        var dateStr = this.state.due_date
        if (dateStr) {
            // p.timestamp = new Date(p.timestamp.replace(' ', 'T'))
            dateStr = this.state.due_date.toString()
            console.log('dateStr: ' + dateStr)
        }
        console.log('\nupdating due date')
        api.put('/update_profile', {
            email: this.state.email,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            due_date: dateStr,
            avatar: this.state.image,
        }, {
            headers: {
                'token': this.props.session_token
            }
        }).then(res => {
            console.log('updated due date')
            this.setState({ editing: false })
            this.props.navigation.navigate('Profile')
        }).catch(err => console.log(err.status))
    }

    render() {
        return (
            <View style={style.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                    style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: this.props.theme.colors.background }} >
                    <Header navigation={this.props.navigation} />
                    

                        <DateTimePicker
                            value={this.state.due_date ? (this.state.due_date) : (new Date())}
                            display="inline"
                            mode='date'
                            minimumDate={new Date(2019, 0, 1)}
                            maximumDate={new Date(2022, 11, 31)}
                            onChange={(event, date) => {
                                this.setState({ due_date: date })
                            }}/>
                        

                        <Button
                            children='Update due date'
                            icon='calendar-month'
                            mode='contained'
                            uppercase={false}
                            style={style.button}
                            onPress={() => this.updateDueDate()} />
                        {/* </View> */}
                    {/* Need this empty view for the keyboard avoiding view */}
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
    },
    inner: {
        flex: 1,
        margin: 20,
        // alignItems: 'center'
    },
    button: {
        marginVertical: 10,
        padding: 10,
        alignSelf: 'center',
    },
    avatar: {
        marginTop: 20,
        alignSelf: 'center'
    },
    helper: {
        marginVertical: 2,
        // fontSize: 16,
        alignSelf: 'center',
    },
    textField: {
        marginVertical: 5,
        marginHorizontal: 20,
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