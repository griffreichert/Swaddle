import React from 'react';
import { StyleSheet } from 'react-native';
import { FAB, Portal, withTheme } from 'react-native-paper';

class MediaButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: '',
        };
    }
    render() {
        return (
            <FAB.Group
                open={this.state.open}
                icon={this.state.open ? 'cancel' : 'send'}
                actions={[
                    {
                        icon: 'camera',
                        label: 'Photo',
                        onPress: () => {
                            console.log('Pressed photo')
                            this.props.navigation.navigate('PostImage')
                        },
                    },
                    {
                        icon: 'video-vintage',
                        label: 'Video',
                        onPress: () => {
                            console.log('Pressed video')
                            // this.props.navigation.navigate('PostImage')
                        },
                    },
                    {
                        icon: 'message-text',
                        label: 'Message',
                        onPress: () => console.log('Pressed email'),
                    }]}
                onStateChange={ () => this.setState({open: !this.state.open}) }
                onPress={() => this.setState({open: true})}
            />
        );
    }
}

export default withTheme(MediaButton);
