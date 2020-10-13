import React from 'react';
import Auth from "./components/auth"
import { Appbar, DefaultTheme, Provider as PaperProvider } from 'react-native-paper'

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'red',
        accent: 'blue',
    }
}

export default class App extends React.Component {
  
    render() {
        return (
            <PaperProvider theme={theme}>
                <Appbar>

                </Appbar>
                <Auth/>
            </PaperProvider>
        );
    }
}