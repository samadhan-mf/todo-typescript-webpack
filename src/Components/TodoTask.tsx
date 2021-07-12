import React from 'react'
import { ITask } from '../interfaces'

interface Props {
    task : ITask;
    completedTask(taskNameTodelete:string): void;
}


const TodoTask = ({task,completedTask} : Props) => {
    return (
        <div className='task'>
        <div className='content'>
           <span>{ task.task}</span>
           <span>{ task.deadline}</span>
        </div>
        <button onClick={()=>{completedTask(task.task)}}>X</button>
        </div>
    )
}

export default TodoTask

