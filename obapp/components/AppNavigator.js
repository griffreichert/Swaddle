import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
// import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'

import Auth from './Auth';
import ImagePicker from './ImagePicker';

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

// const Stack = createStackNavigator();
const Tabs = createMaterialBottomTabNavigator();

export default class AppNavigator extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <Tabs.Navigator>
                    <Tabs.Screen name='Auth' component={Auth}/>
                    <Tabs.Screen name='ImagePicker' component={ImagePicker}/>
                </Tabs.Navigator>
            </NavigationContainer>
        )
    }
}
  