import React, { useState, useEffect } from "react";
import "./ApiRxjs.css";
import {IApiProp} from '../interfaces'; 
import { of } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap, catchError ,map} from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

interface newApi {
    login:string,
    id:number,
    type:string,
}

const ApiRxjs: React.FC<IApiProp> = () => {
  const [apiData, setApiData] = useState<IApiProp[]>([]);

// const getValue = async () => {
//     let r = await fetch('https://jsonplaceholder.typicode.com/users');
//     let res = await r.json();
//     console.log(res);
//     setApiData(res);
// }

// const getValue =  () =>fetch('https://jsonplaceholder.typicode.com/users')
// .then(response => response.json())
// .then(data => setApiData(data));
//unsubscription not possible at response.json place


const getValue = () => fromFetch('https://jsonplaceholder.typicode.com/users')
            .subscribe(response =>
  response.json().then(data => setApiData(data))
);

//   const githubUsers = `https://api.github.com/users?per_page=2`;
//   const user = ajax.getJSON(githubUsers);
//   const subscribes = user.subscribe(
//     res => console.log(res),
//     err => console.error(err)
//   );

useEffect(() => {
    getValue();
   
}, [])

  return (
    <div>
      <div className="X">
        <h1>Users list</h1>
        <ul className="SG">
        {apiData  
                ? apiData.map((item) => (
          <li className="sgLi">
            <div className="box">
                     <ul className="df">
                      <li>{item.id}</li>
                      <li>{item.name}</li>
                      <li>{item.username}</li>
                      <li>{item.email}</li>
                    </ul>
            </div>
          </li>
            ))
            : "No value"}
        </ul>
      </div>
    </div>
  );
};

export default ApiRxjs;
