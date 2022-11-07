import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

import favesReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['favemarks']
};

const rootReducer = combineReducers({
  favesReducer: persistReducer(persistConfig, favesReducer)
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);