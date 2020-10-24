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

const rubikBlack = require('./assets/fonts/Rubik-Black.ttf');


const theme = {
    ...DefaultTheme,
    roundness: 30,
    // fonts: {
    //     regular: rubikBlack,
    //     medium: rubikBlack,
    //     thin: rubikBlack,
    //     light: rubikBlack,
    // },
    fonts: configureFonts(fontConfig),
    colors: {
        ...DefaultTheme.colors,
        primary: '#0d80d6',
        accent: '#E68FAE',
        background: '#C6E1F2',
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
            // return(
            // <View style={{justifyContent: 'center', flex: 1}}>
            //     <Text style={{ fontSize: 40 }}>Hi</Text>
            //     <Text style={{fontFamily: 'Rubik-Regular',  fontSize: 40 }}>Hi</Text>
            // </View>
            // );
         return (
                <ReduxProvider store={store}>
                    <PaperProvider theme={theme}>
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

