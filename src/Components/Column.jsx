import React, { useState } from "react";


function Column(props) {

    const tasksFortheColumn = props.tasks.filter(task => task.taskStatus === props.column && task.taskStatus !== 'Deleted');
    // console.log(tasksFortheColumn)
    function handleCheckBox(index, e) {
        if (e.target.checked) {

            props.onStatusChange(index, 'Done')
            e.target.checked = false
        }
    }

    function handleDelete(id, status) {
        if (status === 'Removed') {
            props.onStatusChange(id, 'Deleted');
            return;
        }
        props.onStatusChange(id, 'Removed')
    }

    return (

        <div className="column">
            <h3 className="column-title">{props.column}</h3>
            <ul className="task-list">

                {tasksFortheColumn.length === 0 && (
                    <li className="empty-task">No tasks</li>
                )}

                {tasksFortheColumn.map((task) => (
                    <li className="task-item" key={task.id}>

                        <div className="task-info">
                            <span className="task-name">{task.taskName}</span>
                            {task.taskStatus!=='Active' && <span className="task-date">{task.taskDate.split('-').reverse().join('/')}</span>}
                        </div>

                        <div className="task-actions">
                            {props.column === ('Active' || 'Backlog') && <input type="checkbox" onChange={(e) => handleCheckBox(task.id, e)} />}
                            <button onClick={() => handleDelete(task.id, task.taskStatus)}>🗑</button>
                        </div>
                    </li>
                )

                )}

            </ul>
        </div>
        

    )
}
export default Column
