import React from 'react';
import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from "./app.json";

const aeon = props => (
    <App />
);

AppRegistry.registerComponent(appName, () => App);
