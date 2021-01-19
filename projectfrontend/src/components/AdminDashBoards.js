import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Base from './Base';
import { isAuthenticate } from './menu';


const API = 'http://localhost:8000/api'

const Todo = props => (
    
    <tr>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_heading}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_desc}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_priority}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{this.createdBy()}</td>
    </tr>
)

const CreateBy = props => (
    
    <tr>
        <td></td>
        
    </tr>
)



export default class AdminDashBoard extends Component {
   
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            
        }
        
    }

    componentDidMount() {
        
        Axios.get(`${API}/getAllUsers`).then(response => {
            console.log('respone------->', response.data)
            this.setState({
                todos: response.data,
                
            })
            //console.log('todos----->', todos)
        }).catch((err) => {
            console.log(err)
        })
    }

    componentDidUpdate() {
        Axios.get('http://localhost:8000/api/').then(response => {
            this.setState({
                todos: response.data
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    todolist() {
        return this.state.todos.map((current, index) => {
            return <Todo todo={current} key={index} />
        })
    }

    createdBy() {
       
        /*return this.state.created.map((current, index) => {
            return <CreateBy todo={current} key={index} />
        })*/
    }


    render() {
        let temp = JSON.parse(localStorage.getItem("jwt"));
        
        return (

            <div>
                <Base title="Admin View" />
                {isAuthenticate() && isAuthenticate().user.role === 1 ?
                    <div>
                    <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Task</th>
                            <th>Description</th>
                            <th>Priority</th>
                            <th>CreatedBy</th>


                        </tr>
                    </thead>
                    <tbody>
                                {this.todolist()}
                                {this.createdBy()}
                    </tbody>

                        </table>
                    </div> : <div>
                        Your Not Admin
                    </div>
                }

            </div>
        );
    }
}

