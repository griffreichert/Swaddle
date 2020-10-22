import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
// import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'

// Auth Components
import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';
import ResetPassword from './Auth/ResetPassword';



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
                <AuthStack.Navigator headerMode='false'>
                    <AuthStack.Screen name='Sign In' component={SignIn}/>
                    <AuthStack.Screen name='Sign Up' component={SignUp}/>
                    <AuthStack.Screen name='Forgot Password' component={ResetPassword}/>
                </AuthStack.Navigator>
            </NavigationContainer>
        )
    }
}

export default AppNavigator;


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