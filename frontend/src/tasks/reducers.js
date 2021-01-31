import {
    LOAD_TASKS,
    RESOLVE_TASK,
    DELETE_HISTORY,
    ADD_TASK,
} from './actions';

const initialState = { data: [] }

export const tasks = ( state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case RESOLVE_TASK: {
            const { task: taskToResolve } = payload;
            return {
                ...state,
                data: state.data.map(task => {
                    if(task.id === taskToResolve.id){
                        return {
                            ...task,
                            resolveDate: taskToResolve.resolveDate,
                        }
                    }
                    return task
                })
            }
        }
        case DELETE_HISTORY: {
            return {
                ...state,
                data: state.data.filter(task => task.resolveDate === null)
            }
        }
        case LOAD_TASKS: {
            const { tasks } = payload;
            return {
                ...state,
                data: tasks
            }
        }
        case ADD_TASK: {
            const { task } = payload;
            return {
                ...state,
                data: state.data.concat(task),
            }
        }
        default:
            return state
    }
}