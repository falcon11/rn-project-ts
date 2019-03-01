import React from 'react';
import { AppRegistry, AsyncStorage } from 'react-native';
import { name as appName } from '../app.json';

import { createLogger } from 'redux-logger';
import dva, { Model } from './utils/dva';
import Router, { routerMiddleware, routerReducer } from './router';
import * as models from './models';

let initState = {};

const app = dva({
  initialState: initState,
  models: Object.values(models),
  extraReducers: { router: routerReducer },
  onError(e: any) {
    console.error('onError', e);
  },
  onAction: [createLogger({ collapsed: true }), routerMiddleware],
});

const App = app.start(<Router />);

AppRegistry.registerComponent(appName, () => App);
