import React from 'react';
import {hot} from 'react-hot-loader';
import TaskList from './tasks/components/TaskList';
import TaskOptions from './tasks/components/TaskOptions';
import "./App.css"

const App = () => (
    <div>
        <TaskList />
        <TaskOptions />
    </div>
);

export default hot(module)(App);