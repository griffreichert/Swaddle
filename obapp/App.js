import React from 'react';
import { Provider as ReduxProvider } from 'react-redux'
import AppNavigator from './components/AppNavigator'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import configureStore from './store'

const store = configureStore();


const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#6b3ab0',
        // accent: 'red',
        // background: 'white',
        // text: 'grey',
    }
}

export default class App extends React.Component {
  
    render() {
        return (
            <ReduxProvider store={store}>
                <PaperProvider theme={theme}>
                    <AppNavigator/>
                </PaperProvider>
            </ReduxProvider>
        );
    }
}