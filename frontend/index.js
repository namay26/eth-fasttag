import { registerRootComponent } from 'expo';


import Home from './src/components/Home';
import Fastag from './src/components/Fastag';
import Page1 from './src/components/Page1';
import Page2 from './src/components/Page2';
import Profile from './src/components/Profile';
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(Profile);
