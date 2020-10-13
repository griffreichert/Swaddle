import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Auth from './Auth';
import Header from './Header';
import ImagePicker from './ImagePicker';

const AppStack = createStackNavigator (
    {
        Auth: Auth,
        ImagePicker: ImagePicker,
    },
    {
        initialRouteName: 'ImagePicker',
    }
);

export default createAppContainer(AppStack)
  