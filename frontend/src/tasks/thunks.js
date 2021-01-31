import {
    loadTasks,
    resolveTask,
    addTask,
    deleteHistory,
} from './actions';

export const loadTasksRequest = () => async (dispatch, getState) => {
    try {
        const response = await fetch('http://localhost:8080/tasks');
        const tasks = await response.json();

        dispatch(loadTasks(tasks));
    }
    catch (e) {
        dispatch(displayAlert(e));
    }
}

export const resolveTaskRequest = taskToResolve => async dispatch => {
    try {
        const response = await fetch(`http://localhost:8080/resolve-task`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                task: taskToResolve
            })
        });
        const task = await response.json();
        if (task.message === 'Success') {
            dispatch(resolveTask(task.updatedTask));
        }
        else {
            dispatch(displayAlert(task.message));
        }
    }
    catch (e) {
        dispatch(displayAlert(e));
    }
}

export const addTaskRequest = (cName, DueDate) => async dispatch => {
    try {
        const response = await fetch(`http://localhost:8080/create-task`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: cName,
                dueDate: DueDate,
            })
        });
        const task = await response.json();
        if (task.message === 'Success') {
            dispatch(addTask(task.newTask));
        }
        else {
            dispatch(displayAlert(task.message));
        }
    }
    catch (e) {
        dispatch(displayAlert(e));
    }
}

export const deleteHistoryRequest = () => async dispatch => {
    try {
        const response = await fetch(`http://localhost:8080/delete-history`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const res = await response.json();
        if (res.message === 'Success') {
            dispatch(deleteHistory());
        }
        else {
            dispatch(displayAlert(res.message));
        }
    }
    catch (e) {
        dispatch(displayAlert(e));
    }
}

export const displayAlert = text => () => {
    alert(text);
};