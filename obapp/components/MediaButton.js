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
            <Portal>
                <FAB.Group
                    open={this.state.open}
                    icon={this.state.open ? 'cactus' : 'owl'}
                    actions={[
                        {
                          icon: 'video-vintage',
                          label: 'Video',
                          onPress: () => {
                              console.log('Pressed video')
                              this.props.navigation.navigate('PostImage')
                            },
                        },
                        {
                          icon: 'email',
                          label: 'Email',
                          onPress: () => console.log('Pressed email'),
                        },
                        {
                          icon: 'bell',
                          label: 'Remind',
                          onPress: () => console.log('Pressed notifications'),
                        },
                      ]}
                    onStateChange={ () => this.setState({open: !this.state.open}) }
                    onPress={() => this.setState({open: true})}
                />
            </Portal>
        );
    }
}

export default withTheme(MediaButton);
