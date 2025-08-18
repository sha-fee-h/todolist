import React,{ useEffect, useState } from "react"
import Column from "./Column"


function ToDoList() {

    
    const [tasks, setTasks] = useState(() => {
        try {
            const storedTasks = localStorage.getItem('tasks'); 
            return storedTasks ? JSON.parse(storedTasks) : []; 
        } catch (error) {
            console.error("Failed to parse tasks from Local Storage:", error);
            
            return []; 
        }
    });

    const [taskName,setTaskName] = useState(''); 
    const [msg,setMsg] = useState('')
     

    // console.log(tasks);

    function handleAddTask(){
        if(!taskName.trim()){
            setMsg('task should not be empty');
            return;
        }
        const newTask = {
            id:Date.now(),
            taskName,
            taskStatus:'Active',
            prevStatus:null,
            taskDate: new Date().toISOString().slice(0, 10)
        };
        setTasks(t=>[...t, newTask]);
        setTaskName('');
    }

    function handleTaskStatus(index, status, prevStatus){
        setTasks(t=>t.map((task)=>(task.id===index?{...task,taskStatus:status,...{prevStatus}}:task)))
    }

    useEffect(()=>{
        const today = new Date().toISOString().slice(0,10);
        setTasks(t=>t.filter(task=>task.taskStatus!=='Deleted').map(task=>task.taskStatus==='Active' && task.taskDate<today ? {...task,taskStatus:'Backlog'}:task))
    },[])

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks)); 
    }, [tasks]);

    function handleTaskName(e){
        setMsg('')
        setTaskName(e.target.value)
    }

    function handleEdit(name,index){
        setTasks(t=>t.map(task=>(task.id===index?{...task,taskName:name}:task)))
    }

    return (
        <div className="hero" >
        <div className="todo-app">
            <header className="header">
                <h1 className="title">ToDos</h1>
            </header>

            <div className="task-input">
                <input type="text" placeholder="Done is better than perfect." value={taskName} onChange={handleTaskName} />
                
                <button onClick={handleAddTask}>add task</button>
            </div>
            {msg && <p style={{color:'#6c1111ff', display:'block'}}>{msg}</p>}

            <div className="columns">
                <Column column='Backlog' tasks={tasks} onStatusChange={handleTaskStatus} onEdit={handleEdit}/>
                <Column column='Active' tasks={tasks} onStatusChange={handleTaskStatus} onEdit={handleEdit}/>
                <Column column='Done' tasks={tasks} onStatusChange={handleTaskStatus} onEdit={handleEdit}/>
                <Column column='Removed' tasks={tasks} onStatusChange={handleTaskStatus} onEdit={handleEdit}/>
            </div>
        </div>
        </div>
    )
}
export default ToDoList;