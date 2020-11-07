import React from 'react';
import { Provider as ReduxProvider } from 'react-redux'
import configureStore from './store'
import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import AppNavigator from './components/AppNavigator'

const store = configureStore();

const fontConfig = {
    default: {
        regular: {
            fontFamily: 'Rubik-Regular',
            fontWeight: 'normal',
        },
        medium: {
            fontFamily: 'Rubik-Black',
            fontWeight: 'normal',
        },
        light: {
            fontFamily: 'Rubik-Light',
            fontWeight: 'normal',
        },
        thin: {
            fontFamily: 'Rubik-LightItalic',
            fontWeight: 'normal',
        },
    },
};

let customFonts = {
    'Rubik-Regular': require('./assets/fonts/Rubik-Regular.ttf'),
    'Rubik-Black': require('./assets/fonts/Rubik-Black.ttf'),
    'Rubik-Light': require('./assets/fonts/Rubik-Light.ttf'),
    'Rubik-LightItalic': require('./assets/fonts/Rubik-LightItalic.ttf'),
}


const myTheme = {
    dark: false,
    roundness: 30,
    // fonts: {
    //     regular: 'Rubik-Black',
    //     medium: 'Rubik-Black',
    //     thin: 'Rubik-Black',
    //     light: 'Rubik-Black',
    // },
    fonts: configureFonts(fontConfig),
    colors: {
        ...DefaultTheme.colors,
        primary: '#0d80d6',     // primary color for the app, brand color.
        accent: '#E68FAE',      // secondary color for the app which complements the primary color.
        background: '#C6E1F2',  // background color for pages, such as lists.
        surface: '#FFE0E3',     // background color for elements containing content, such as cards.
        // text: '#C6E1F2',        // text color for content.
        disabled: '#888888',    // color for disabled elements.
        placeholder: '#888888', // color for placeholder text, such as input placeholder.
        backdrop: '#888888',    // color for backdrops of various components such as modals.
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
    animation: {
        scale: 1.0,
    },
}

// export default class App extends React.Component {
//     render() {
//         return (
//             <ReduxProvider store={store}>
//                 <PaperProvider theme={myTheme}>
//                     <AppNavigator />
//                 </PaperProvider>
//             </ReduxProvider>
//         );
//     }
// }

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fontsLoaded: false,
        };
    }

    async loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
    }

    componentDidMount() {
        this.loadFontsAsync();
    }

    render() {
        if (this.state.fontsLoaded) {
            return (
                <ReduxProvider store={store}>
                    <PaperProvider theme={myTheme}>
                        <AppNavigator/>
                    </PaperProvider>
                </ReduxProvider>
            );
        }
        else {
            return <AppLoading/>;
        }
    }
}