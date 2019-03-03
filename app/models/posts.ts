import { createAction, NavigationActions, Storage, http } from '../utils';
import * as authService from '../services/auth';
import { Model } from '../utils/dva';
import { PostsState, AppState } from './states';

export default {
  namespace: 'posts',
  state: {
    posts: [],
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
    *createPost({ payload }, { call, put, select }) {
      const appData: AppState = yield select((state: { app: AppState }) => state.app);
      const postsData: PostsState = yield select((state: any) => state.posts);
      const { title, body } = payload;
      const response = yield call(http.post, '/posts', { title, body, userId: appData.userId });
      if (response) {
        yield put(createAction('updateState')({ posts: [response.data, ...postsData.posts] }));
      }
    },
  },
  subscriptions: {},
} as Model;
