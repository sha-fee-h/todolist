import React, { useState } from "react";


function Column(props) {

    const [modal, setModal] = useState(false);
    const [taskName, setTaskName] = useState('');
    const [msg, setMsg] = useState('')


    const tasksFortheColumn = props.tasks.filter(task => task.taskStatus === props.column && task.taskStatus !== 'Deleted');
    console.log(props.tasks)
    function handleCheckBox(index, e, status, prevStatus) {
        if (e.target.checked) {

            props.onStatusChange(index, 'Done', status)

        }
        else {
            props.onStatusChange(index, prevStatus === 'Removed' ? 'Active' : prevStatus, status)
        }

    }

    function handleDelete(id, status) {
        if (status === 'Removed') {
            props.onStatusChange(id, 'Deleted', status);
            return;
        }
        props.onStatusChange(id, 'Removed', status)
    }

    function handleUndo(id, status, prevStatus) {
        props.onStatusChange(id, prevStatus, status)
    }

    function handleEdit(task) {
        setTaskName(task);
        setModal(true)
    }

    function handleClick(id) {
        if (!taskName.trim()) {
            setMsg('task should no be empty');
            return
        }
        props.onEdit(taskName, id);
        setTaskName('');
        setModal(false);
        setMsg('')
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
                            {task.taskStatus !== 'Active' && <span className="task-date">{task.taskDate.split('-').reverse().join('/')}</span>}
                        </div>

                        <div className="task-actions">
                            {['Active', 'Backlog', 'Done'].includes(props.column) ? <input type="checkbox" checked={task.taskStatus === 'Done'} onChange={(e) => handleCheckBox(task.id, e, task.taskStatus, task.prevStatus)} /> : null}

                            {props.column === 'Removed' && <button onClick={() => handleUndo(task.id, task.taskStatus, task.prevStatus)} style={{ backgroundColor: 'transparent' }}>↺</button>}

                            <button onClick={() => handleEdit(task.taskName)} style={{ backgroundColor: 'transparent' }}>✏️</button>

                            {modal && (
                                <div className="modal-overlay">
                                    <div className="modal">
                                        <div className="modal-name">Edit Task</div>
                                        <button className="close-button" onClick={() => setModal(false)}>✖</button>
                                        <div className="task-edit">
                                            <input
                                                required
                                                value={taskName}
                                                onChange={e => setTaskName(e.target.value)}
                                            />
                                            <button className="task-save-btn" onClick={() => handleClick(task.id)}>✓</button>
                                        </div>

                                        {msg && <p className="error-msg">{msg}</p>}

                                    </div>
                                </div>
                            )}


                            <button className="delete-btn" onClick={() => handleDelete(task.id, task.taskStatus)}>🗑</button>
                        </div>
                    </li>
                )

                )}

            </ul>
        </div>


    )
}
export default Column
