import React, { PureComponent } from 'react';
import { BackHandler, Animated, Easing } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  NavigationActions,
  NavigationState,
} from 'react-navigation';
import {
  createReduxContainer,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';

import * as ModelsStates from './models/states';

import Login from './pages/Login';
import Home from './pages/Home';
import Home1 from './pages/Home';
import Account from './pages/Account';
import Detail from './pages/Detail';
import Loading from './pages/Loading';
import Posts from './pages/Posts';
import AddPost from './pages/AddPost';

const HomeNavigator = createBottomTabNavigator({
  Home: { screen: Home },
  Posts: { screen: Posts },
  Account: { screen: Account },
});

HomeNavigator.navigationOptions = ({ navigation }: any) => {
  const { routeName } = navigation.state.routes[navigation.state.index];

  return {
    headerTitle: routeName,
  };
};

const MainNavigator = createStackNavigator(
  {
    HomeNavigator: { screen: HomeNavigator },
    Detail: { screen: Detail },
    AddPost: { screen: AddPost },
  },
  {
    headerMode: 'float',
  }
);
const AppNavigator = createStackNavigator(
  {
    Main: { screen: MainNavigator },
    Login: { screen: Login },
  },
  {
    headerMode: 'none',
    // headerMode: 'float',
    mode: 'modal',
    navigationOptions: {
      gesturesEnabled: false,
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const height = layout.initHeight;
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0],
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        });

        return { opacity, transform: [{ translateY }] };
      },
    }),
  }
);

export const routerReducer = createNavigationReducer(AppNavigator);

export const routerMiddleware = createReactNavigationReduxMiddleware<IProps>(
  state => state.router,
  'root'
);
const App = createReduxContainer(AppNavigator, 'root');

function getActiveRouteName(navigationState: NavigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
}
interface IProps {
  app: ModelsStates.AppState;
  router: any;
  dispatch: any;
}

class Router extends PureComponent<IProps> {
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backHandle);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backHandle);
  }

  backHandle = () => {
    const currentScreen = getActiveRouteName(this.props.router);
    if (currentScreen === 'Login') {
      return true;
    }
    if (currentScreen !== 'Home') {
      this.props.dispatch(NavigationActions.back());
      return true;
    }
    return false;
  };

  render() {
    const { dispatch, router, app } = this.props;
    if (app.loading) return <Loading />;

    return <App dispatch={dispatch} state={router} />;
  }
}

// @connect(({ app, router }) => ({ app, router }))
function mapStateToProps(state: any) {
  return {
    router: state.router,
    app: state.app,
  };
}
export default connect(mapStateToProps)(Router);
