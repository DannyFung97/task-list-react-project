import React from 'react';
import {hot} from 'react-hot-loader';
import ClaimList from './claims/components/ClaimList';
import NewClaimForm from './claims/components/NewClaimForm';
import "./App.css"

const App = () => (
    <div>
        <ClaimList />
        <NewClaimForm />
    </div>
);

export default hot(module)(App);