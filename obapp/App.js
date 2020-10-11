import React, { Component } from 'react';
import Auth from "./components/auth/auth";

class App extends Component {
    state = {

    };
    render() {
        return (
            // structure of app
            // <Provider store={store}>
                // <MediaPicker/>
            // </Provider>
            <Auth/>
        );
    }
}
export default App;