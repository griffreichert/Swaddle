import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Auth from './Auth';
import ImagePicker from './ImagePicker';

const AppStack = createStackNavigator (
    {
        Auth: Auth,
        ImagePicker: ImagePicker,
    },
    {
        initialRouteName: 'Auth',
    }
);

export default createAppContainer(AppStack)
  