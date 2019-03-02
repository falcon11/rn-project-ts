import { createAction, NavigationActions, Storage, http } from '../utils';
import * as authService from '../services/auth';
import { Model } from '../utils/dva';
import { PostsState } from './states';

export default {
  namespace: 'posts',
  state: {
    posts: null,
  } as PostsState,
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *getPosts({ payload }, { call, put, select }) {
      const response = yield call(http.get, '/posts');
      if (response) {
        yield put(createAction('updateState')({ posts: response.data }));
      }
    },
  },
  subscriptions: {},
} as Model;
