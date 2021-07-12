import React,{FC,ChangeEvent,useState,useEffect} from 'react';
import './Home.css';
import { useHistory ,Link} from "react-router-dom";


const Home:FC = () => {

  return (
    <div className="HomeApp">
<div className="main">
<Link to={'/TodoMain'} className="button-two"><span>Todo Main</span></Link>
<Link to={'/Rxjsdemo'} className="button-two" ><span>Rxjs Demo</span></Link>
    <Link to={'/ApiRxjs'} className="button-two" ><span>Api Demo</span></Link>

</div>
    </div>
  );
}

export default Home;

