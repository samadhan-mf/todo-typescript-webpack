import React,{FC,ChangeEvent,useState} from 'react';
import {ITask} from './interfaces'; 
import './App.css';
import TodoTask from './Components/TodoTask';

const App:FC = () => {

  const [task, setTask] = useState<string>("")
  const [deadline, setDeadline] = useState<number>(0)
  const [todo, setTodo] = useState<ITask[]>([])

const handleChange = (event: ChangeEvent<HTMLInputElement>) =>{
  if(event.target.name === "task"){
    setTask(event.target.value);
  }else{
    setDeadline(Number(event.target.value));
  }
}

const addTask = () :void =>{
const newTask = {task:task,deadline:deadline}
setTodo([...todo, newTask]);
}

const completedTask = (taskNameTodelete:string):void =>{
setTodo(todo.filter((task) => {
  return task.task != taskNameTodelete
}))
}

  return (
    <div className="App">
  <div className="header">
    <div className="inputContainer">
      <input type="text" placeholder="todo" value={task} name="task" onChange={handleChange} />
      <input type="number" placeholder="number" name="deadline" value={deadline} onChange={handleChange} />
    </div>
    <button onClick={addTask}>Add todo</button>
  </div>
  <div className="todoList">
    {todo.map((task:ITask , key:number) => {
    return <TodoTask key={key} task={task} completedTask={completedTask} />
    })}
  </div>
    </div>
  );
}

export default App;

