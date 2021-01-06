import {createStore, combineReducers, applyMiddleware} from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { claims } from './claims/reducers';

const reducers = { 
    claims,
};

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2
}

const rootReducer = combineReducers(reducers);
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const configStore = () => 
    createStore(
        persistedReducer,
        composeWithDevTools(
            applyMiddleware(thunk)
        )
    );