import React, { useEffect } from 'react';
import './Task.css'

const Task = ({ task, onResolvePressed }) => {
    // const late = ((task.resolveDate < task.dueDate)

    const taskContent = (!task.resolveDate ?
        <div>
            <div className='resolve-button'>
                <button className="button-resolve" onClick={() => onResolvePressed(task)}>Resolve Task</button>
            </div>
        </div>
        :
        (task.resolveDate > task.dueDate ?
            <div style={{color: '#d41919'}}>Late</div>
            :
            null
        )
        // null
    )
    return (
        <div className="task">
            <div className='task-info'>
                <div className='task-title'>
                    {task.text}
                </div>
                <div className='task-start-date'>
                    Made: {new Date(parseInt(task.date, 10)).toString().split('-')[0]}
                </div>
                {
                    Date.now() > task.dueDate ?
                        <div className='task-due-date late'>
                            Due: {new Date(parseInt(task.dueDate, 10)).toString().split('-')[0]}
                        </div>
                        :
                        <div className='task-due-date'>
                            Due: {new Date(parseInt(task.dueDate, 10)).toString().split('-')[0]}
                        </div>
                }
                {task.resolveDate ?
                    <div>Resolved: {new Date(parseInt(task.resolveDate, 10)).toString().split('-')[0]}</div>
                    :
                    null}
            </div>
            {taskContent}
        </div>
    )
}

export default Task;