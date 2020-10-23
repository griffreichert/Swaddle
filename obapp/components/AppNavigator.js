import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { connect } from 'react-redux'

// import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'

// Auth Components
import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';
import ResetPassword from './Auth/ResetPassword';

import Home from './Views/Home'

import ImagePicker from './ImagePicker';


const Stack = createStackNavigator();

class AppNavigator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <NavigationContainer >
                { this.props.login_status !== 1 ? (
                <Stack.Navigator headerMode='false'>
                    <Stack.Screen name='Sign In' component={SignIn}/>
                    <Stack.Screen name='Sign Up' component={SignUp}/>
                    <Stack.Screen name='Forgot Password' component={ResetPassword}/>
                </Stack.Navigator>
                ) : (
                <Stack.Navigator headerMode='false'>
                    <Stack.Screen name='Home' component={Home}/>
                    <Stack.Screen name='Image Picker' component={ImagePicker}/>
                </Stack.Navigator>
                )}
            </NavigationContainer>
            
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator);
