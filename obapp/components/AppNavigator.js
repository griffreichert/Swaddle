import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { connect } from 'react-redux'
import { login, logout } from '../actions/authActions'

// import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';

// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'

// Auth Components
import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';
import ResetPassword from './Auth/ResetPassword';

import Feed from './Views/Feed'

import PostImage from './Pages/postImage';
import postImage from './Pages/postImage';



const Stack = createStackNavigator();

function Home() {
    return (
        <Stack.Navigator headerMode='false'>
            <Stack.Screen name='Feed' component={Feed}/>
            <Stack.Screen name='PostImage' component={PostImage}/>
        </Stack.Navigator>
    );
}

const Drawer = createDrawerNavigator();

class AppNavigator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <NavigationContainer>
                { this.props.login_status !== 1 ? (
                <Stack.Navigator headerMode='false'>
                    <Stack.Screen name='Sign In' component={SignIn}/>
                    <Stack.Screen name='Sign Up' component={SignUp}/>
                    <Stack.Screen name='Forgot Password' component={ResetPassword}/>
                </Stack.Navigator>
                ) : (
                <Drawer.Navigator >
                    <Drawer.Screen name='Home' component={Home}/>
                    <Drawer.Screen name='Post Image' component={postImage}/>
                    { /* <DrawerItem label='Logout' onPress={() => this.props.rlogout()}/> */}
                </Drawer.Navigator>
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
        rlogin: () => dispatch(login()),
        rlogout: () => dispatch(logout()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator);