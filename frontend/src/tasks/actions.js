export const LOAD_TASKS = "LOAD_TASKS";
export const loadTasks = tasks => ({
    type: LOAD_TASKS,
    payload: { tasks }
})

export const RESOLVE_TASK = "RESOLVE_TASK";
export const resolveTask = task => ({
    type: RESOLVE_TASK,
    payload: { task }
})

export const DELETE_HISTORY = "CONFIRM_TASK";
export const deleteHistory = () => ({
    type: DELETE_HISTORY
})

export const ADD_TASK = "ADD_TASK";
export const addTask = task => ({
    type: ADD_TASK,
    payload: { task }
})