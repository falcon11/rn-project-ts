import { Dimensions } from 'react-native';

export { NavigationActions, StackActions } from 'react-navigation';

export { default as Storage } from './storage';

export { default as http } from './http';

export const delay = (time: any) => new Promise(resolve => setTimeout(resolve, time));

export const createAction = (type: any) => (payload?: any) => ({ type, payload });

export const DEVICE_WIDTH = Dimensions.get('window').width;

export const isEmptyObj = (obj: any) => {
  for (let i in obj) {
    if (obj[i]) return false;
  }
  return true;
};
