import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { connect } from 'react-redux'
import { login, logout } from '../actions/authActions'

// import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';

// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'

// Auth Components
import SignIn from '../components/Auth/SignIn';
import SignUp from '../components/Auth/SignUp';
import ResetPassword from '../components/Auth/ResetPassword';

import Feed from '../components/Views/Feed'

import PostImage from '../components/Pages/postImage';
import profile from '../components/Pages/profile';
import Contacts from '../components/Pages/contacts';
import changePassword from '../components/Pages/changePassword';
import Search from '../components/Views/Search';
import DueDate from '../components/Pages/DueDate';

const Stack = createStackNavigator();

function Home() {
    return (
        <Stack.Navigator headerMode='false'>
            <Stack.Screen name='Feed' component={Feed}/>
            <Stack.Screen name='Post Image' component={PostImage}/>
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
        console.log(this.props.session_token)
        return (
            <NavigationContainer>
                { !this.props.session_token ? (
                <Stack.Navigator headerMode='false'>
                    <Stack.Screen name='Sign In' component={SignIn}/>
                    <Stack.Screen name='Sign Up' component={SignUp}/>
                    <Stack.Screen name='Forgot Password' component={ResetPassword}/>
                </Stack.Navigator>
                ) : (
                <Drawer.Navigator drawerStyle={{width: '80%'}}>
                    <Drawer.Screen name='Home' component={Home} />
                    <Drawer.Screen name='Search posts' component={Search} />
                    <Drawer.Screen name='Profile' component={profile} />
                    <Drawer.Screen name='Contacts' component={Contacts} />
                    <Drawer.Screen name='Due date' component={DueDate} />
                    <Drawer.Screen name='Change password' component={changePassword} />

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
        email: state.authReducer.email,
        session_token: state.authReducer.session_token,
    }
}

// maps actions
const mapDispatchToProps = (dispatch) => {
    return {
        rlogin: (email, session_token) => dispatch(login(email, session_token)),
        rlogout: () => dispatch(logout()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator);