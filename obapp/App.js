import React from 'react';
import Auth  from "./components/auth"
import Header  from "./components/Header"
import { Appbar, DefaultTheme, Provider as PaperProvider } from 'react-native-paper'

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
                <Header/>
                <Auth/>
            </PaperProvider>
        );
    }
}