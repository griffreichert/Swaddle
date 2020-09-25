import React, { Component } from 'react';
import { Provider } from 'react-redux';


class App extends Component {
    state = {

    };

    render() {
        return (
            // structure of app
            <Provider store={store}>
                <App/>
            </Provider>
        );
    }
}

export default App;