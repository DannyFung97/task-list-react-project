import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configStore } from '../store'
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';
import App from '../App';

describe('jest testing', () => {
    const data = [{
        text: 'test1'
    },
    {
        text: 'test2'
    }]

    it('Object text is correct', () => {
        expect(data[0].text).toContain('test1');
    });

    it('Array correct', () => {
        expect([{
            text: 'test1'
        },
        {
            text: 'test2'
        },
        {
            text: 'test3'
        }]).toEqual(expect.arrayContaining(data));
    });

    it('Correct property', () => {
        expect(data[0]).toHaveProperty('text');
    })
})

it('Renders successfully', () => {

    const store = configStore()
    const persistor = persistStore(store)
    const root = document.createElement('div');
    ReactDOM.render(
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={<div>Loading...</div>}>
                <App />
            </PersistGate>
        </Provider>
        , root);
})