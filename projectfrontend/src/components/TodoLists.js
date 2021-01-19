import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Base from './Base';
import { isAuthenticate } from './menu';

const API = 'http://localhost:8000/api' 


export default class TodoLists extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        let temp = JSON.parse(localStorage.getItem("jwt"));
        
        return (
            
            <div>
                <Base title="Todo Task" />
                
                {isAuthenticate() ?
                    <div className="container-fluid">

                        <h1 className="text-center">Welcome {temp.user.name}</h1>
                    </div>
                    : <div className="container-fluid">
                        <h1 className="text-center">Please Sign in To create Task</h1>
                    </div>
                    }
                
            </div>
        );
    }
}

