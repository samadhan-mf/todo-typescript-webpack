import React,{FC,ChangeEvent,useState,useEffect} from 'react';
import {ITask} from './interfaces'; 
import './App.css';
import TodoTask from './Components/TodoTask';
import TodoMain from './Components/TodoMain';
import Rxjsdemo from './Components/DemoRxjs';
import ApiRxjs from './Components/ApiRxjs';
import Home from './Components/Routing/Home';
import { Switch, Route ,BrowserRouter, useHistory} from "react-router-dom";


const App:FC = () => {
  let history = useHistory();

  const showDemoTodo = () :void =>{
    history.push('/TodoMain')
  }
const showDemoRxjs = () :void =>{
  history.push('/Rxjsdemo')
}
const showDemoApi = () :void =>{
  history.push('/ApiRxjs')
}

  return (
      <BrowserRouter >
    <div className="App">
      <Home />
      <Switch>
        <Route exact path='/' component={TodoMain}></Route>
        <Route exact path='/TodoMain' component={TodoMain}></Route>
        <Route exact path='/Rxjsdemo' component={Rxjsdemo}></Route>
        <Route exact path='/ApiRxjs' component={ApiRxjs}></Route>
      </Switch>
    </div>
    </BrowserRouter>  
  );
}


export default App;
