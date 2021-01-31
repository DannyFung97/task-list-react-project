import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadTasksRequest, resolveTaskRequest } from '../thunks';
import { getPastTasks, getCurrentTasks, getTasks } from '../selectors';
import Task from './Task';
import './TaskList.css';

const TaskList = ({ currentTasks, pastTasks, startLoadingTasks, onResolvePressed }) => {
    useEffect(() => {
        startLoadingTasks();
    }, []);

    const currentTasksContent = (currentTasks.length > 0 ? currentTasks.map((task, i) => {
        return <Task task={task} onResolvePressed={onResolvePressed} key={i} />
    })
        :
        <div>You currently do not have tasks.</div>
    );

    const pastTasksContent = (pastTasks.length > 0 ? pastTasks.map((task, i) => {
        return <Task task={task} key={i} />
    })
        :
        <div>No tasks found in recent history.</div>
    );

    const listContent = (
        <div className="list">
            <div className='list-block'>
                <h4>Current Tasks</h4>
                <ul id="cells">
                    {currentTasksContent}
                </ul>
            </div>
            <div className='list-block'>
                <h4>Task History</h4>
                <ul id="cells">
                    {pastTasksContent}
                </ul>
            </div>
        </div>
    )
    return listContent;
}

const mapStateToProps = state => ({
    tasks: getTasks(state),
    currentTasks: getCurrentTasks(state),
    pastTasks: getPastTasks(state),
})

const mapDispatchToProps = dispatch => ({
    startLoadingTasks: () => dispatch(loadTasksRequest()),
    onResolvePressed: task => dispatch(resolveTaskRequest(task))
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);