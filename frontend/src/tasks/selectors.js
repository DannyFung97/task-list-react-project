import { createSelector } from 'reselect';

export const isLoading = state => state.isLoading;
export const getTasks = state => state.tasks.data;

export const getCurrentTasks = createSelector(
    getTasks,
    (tasks) => tasks.filter(task => task.resolveDate === null).sort(function compare(a, b) { return a.dueDate - b.dueDate; }),
);

export const getPastTasks = createSelector(
    getTasks,
    (tasks) => tasks.filter(task => task.resolveDate !== null).sort(function compare(a, b) { return a.dueDate - b.dueDate; }),
);