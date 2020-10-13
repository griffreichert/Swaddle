import React from 'react';
import AppStack from './components/AppNavigator'
import { Appbar, DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import Auth from './components/Auth';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#6b3ab0',
        accent: 'blue',
        background: '',
        text: '',
        
    }
}

export default class App extends React.Component {
  
    render() {
        return (
            <PaperProvider theme={theme}>
                <AppStack/>
                
            </PaperProvider>
        );
    }
}