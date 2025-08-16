import React, { useState } from "react";


function Column(props) {

    const [modal, setModal] = useState(false);
    const [taskName, setTaskName] = useState('');
    const [msg, setMsg] = useState('')


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

    function handleEdit(task) {
        setTaskName(task);
        setModal(true)
    }

    function handleClick(id) {
        if(!taskName.trim()){
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
                            {props.column === ('Active' || 'Backlog') && <input type="checkbox" onChange={(e) => handleCheckBox(task.id, e)} />}
                            <button onClick={() => handleEdit(task.taskName)} style={{ backgroundColor: 'transparent' }}>✏️</button>

                            {modal && (
                                <div className="modal-overlay">
                                    <div className="modal">
                                        <button onClick={() => setModal(false)}>✗</button>
                                        <input required value={taskName} onChange={e => setTaskName(e.target.value)} />
                                        {msg && <p style={{color:"#de3a3aff"}}>{msg}</p>}
                                        <button onClick={() => handleClick(task.id)}>✓</button>
                                    </div>
                                </div>
                            )}


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
