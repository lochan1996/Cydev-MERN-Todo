import React, { Component } from 'react';
import Base from './Base';
import axios from 'axios'
import { API } from '../backend';
import { isAuthenticate } from './menu';
//import createTodos from './helper/createTodo'
import { Link } from 'react-router-dom';
import { createTodos } from './helper/todoHelper';




export default class createTodo extends Component {
    constructor(props) {
        super(props)
        this.onChangeTodoDesc = this.onChangeTodoDesc.bind(this)
        this.onChangeTodoHeading = this.onChangeTodoHeading.bind(this)
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            todo_heading: '',
            todo_desc: '',
            todo_priority: '',
            todo_completed: false,
            success:""
        }
    }
    onChangeTodoDesc = (e) => {
        this.setState({
            todo_desc:e.target.value
        })

    }
    onChangeTodoHeading = (e) => {
        this.setState({
            todo_heading: e.target.value
        })

    }
    onChangeTodoPriority = (e) => {
        
        this.setState({
            todo_priority: e.target.value
        })

    }
    
    successMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-success" style={{ display: this.state.success ? "" : "none" }}>
                        New Task Created <Link to="/user/dashboard">Check Here</Link>
                    </div>
                </div>
            </div>
        );
    }
    onSubmit(e) {
        e.preventDefault()

        
        

        const newTodo = {
            todo_heading: this.state.todo_heading,
            todo_desc: this.state.todo_desc,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed
        }
        

        if (typeof window !== undefined) {
            if (localStorage.getItem("jwt")) {
                let temp = JSON.parse(localStorage.getItem("jwt"));
                
                createTodos(temp.user._id, temp.token, newTodo).then(response => {
                    
                    console.log('response', response)
                    
                    

                }).catch((err) => {
                    console.log(err)
                })
            }
        }
   

        this.setState({
            todo_heading: '',
            todo_desc: '',
            todo_priority: '',
            todo_completed: false,
            success: true
        })

        
        //this.props.history.push('/user/dashboard');
    }

    
    render() {
        return (
            <>
                <Base title="Create Todo Task" />
                <div>
                    {this.successMessage()}
                <div style={{ marginTop: 20 }}>
                        {isAuthenticate() ? 
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label> Heading: </label>
                                    <input type="text" className="form-control" value={this.state.todo_heading} onChange={this.onChangeTodoHeading} required />
                                </div>
                                <div className="form-group">
                                    <label> Description: </label>
                                    <input type="text" className="form-control" value={this.state.todo_desc} onChange={this.onChangeTodoDesc} required />
                                </div>
                                <div className="form-group">
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input"
                                            type="radio" name="priorityOptions"
                                            id="priorityLow" value="Low"
                                            checked={this.state.todo_priority === 'Low'}
                                            onChange={this.onChangeTodoPriority}
                                        />
                                        <label className="form-check-label"> Low </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input"
                                            type="radio" name="priorityOptions"
                                            id="priorityMedium" value="Medium"
                                            checked={this.state.todo_priority === 'Medium'}
                                            onChange={this.onChangeTodoPriority}
                                        />
                                        <label className="form-check-label"> Medium </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input"
                                            type="radio" name="priorityOptions"
                                            id="priorityHigh" value="High"
                                            checked={this.state.todo_priority === 'High'}
                                            onChange={this.onChangeTodoPriority}
                                        />
                                        <label className="form-check-label"> High </label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input type="submit" value="Create ToDo" className="btn btn-primary" />
                                </div>
                                

                            </form> : <div className="container">
                                SignIn
                                </div>

                        }
                    </div>
                    
                </div>
                </>
        );
    }
}

