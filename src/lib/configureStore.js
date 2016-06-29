import { Platform } from 'react-native';
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import devTools from 'remote-redux-devtools';

import { rootReducer } from '../reducers';

const enhacer = compose(
  applyMiddleware(thunk),
  devTools({
    name: Platform.OS,
    hostname: '172.27.0.5',
    port: 5678
  })
);

export default function(initialState) {
  const store = createStore(rootReducer, initialState, enhacer);
  return store;
}
