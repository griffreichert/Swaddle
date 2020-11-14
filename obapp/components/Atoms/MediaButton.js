import React from 'react';
import { FAB, withTheme } from 'react-native-paper';

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
                icon={this.state.open ? 'close' : 'send'}
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
                            // this.props.navigation.navigate('PostImage2')
                        },
                    },
                    {
                        icon: 'message-text',
                        label: 'Message',
                        onPress: () => { 
                            console.log('Pressed message') 
                        },
                    }]}
                onStateChange={() => this.setState({ open: !this.state.open })}
                onPress={() => this.setState({ open: true })}
            />
        );
    }
}

export default withTheme(MediaButton);
