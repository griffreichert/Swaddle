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
import ImagePicker from './ImagePicker';


// const Stack = createStackNavigator();
const AuthStack = createStackNavigator();

class AppNavigator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        };
    }

    render() {
        return (
            <NavigationContainer >
                { this.props.login_status !== 1 ? (
                <AuthStack.Navigator headerMode='false'>
                    <AuthStack.Screen name='Sign In' component={SignIn}/>
                    <AuthStack.Screen name='Sign Up' component={SignUp}/>
                    <AuthStack.Screen name='Forgot Password' component={ResetPassword}/>
                </AuthStack.Navigator>
                ) : (
                <AuthStack.Navigator headerMode='false'>
                    <AuthStack.Screen name='Image Picker' component={ImagePicker}/>
                </AuthStack.Navigator>
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


// const Stack = createStackNavigator (
//     {
//         Auth: Auth,
//         ImagePicker: ImagePicker,
//     },
//     {
//         initialRouteName: 'Auth',
//     }
// );

// export default createAppContainer(Stack)