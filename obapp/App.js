import React from 'react';
import { Provider as ReduxProvider } from 'react-redux'
import AppNavigator from './components/AppNavigator'
import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import configureStore from './store'

const store = configureStore();

const fontConfig = {
    default: {
        regular: {
            fontFamily: 'candara',
            fontWeight: 'normal',
        },
    },
};

const theme = {
    ...DefaultTheme,
    fonts: configureFonts(fontConfig),
    colors: {
        ...DefaultTheme.colors,
        primary: '#A9D1EA',
        // accent: 'red',
        background: '#FDB7C2',
        roundness: 20,
        text: '#E68FAE',
        /*
        Blues
        #A9D1EA
        #C6E1F2
        #E1F0FA
        Pinks
        #E68FAE
        #FDB7C2
        #F7E0E3
        */
    },
}

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

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

