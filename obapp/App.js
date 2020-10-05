import React, { Component } from 'react';
// import { Provider } from 'react-redux';
import MediaPicker from './components/ImagePicker'

class App extends Component {
    state = {

    };
    render() {
        return (
            // structure of app
            // <Provider store={store}>
                <MediaPicker/>
            // </Provider>
        );
    }
}
export default App;