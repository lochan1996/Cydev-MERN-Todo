import React, { Component } from 'react';
import Axios from 'axios';
import Base from './Base';
import { Link } from 'react-router-dom';
import { editTodos } from './helper/todoHelper';



export default class editToDo extends Component {
    constructor(props) {
        super(props)
        this.onChangeTodoDesc = this.onChangeTodoDesc.bind(this)
        this.onChangeTodoHeading = this.onChangeTodoHeading.bind(this)
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this)
        this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
             todo_heading: '',
            todo_desc: '',
            todo_priority: '',
            todo_completed: false,
            success:''
        }
    }

    componentDidMount() {
        Axios.get('http://localhost:8000/api/' + this.props.match.params.id).then(response => {
            this.setState({
                todo_heading: response.data.todo_heading,
                todo_desc: response.data.todo_desc,
                todo_priority: response.data.todo_priority,
                todo_completed: response.data.todo_completed
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    onChangeTodoDesc = (e) => {
        this.setState({
            todo_desc: e.target.value
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
    onChangeTodoCompleted = (e) => {
        this.setState({
            todo_completed: !this.state.todo_completed
        })
    }
    successMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-success" style={{ display: this.state.success ? "" : "none" }}>
                         Task is Edited <Link to="/user/dashboard">Check Here</Link>
                    </div>
                </div>
            </div>
        );
    }
    onSubmit = (e) => {
        e.preventDefault()
        const obj = {
            todo_heading: this.state.todo_heading,
            todo_desc: this.state.todo_desc,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed
        }
        let temp = JSON.parse(localStorage.getItem("jwt"));
        let updateId = this.props.match.params.id
        editTodos(temp.user._id, temp.token, obj, updateId).then(response => {

            console.log('response', response)
            



        }).catch((err) => {
            console.log(err)
        })
        this.setState({
            success: true
        })
        
        
        //this.props.history.push('/user/dashboard');
    }


    render() {
        return (
            <div>
                <Base title="Update Todo Task" />
                {this.successMessage()}
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label> Heading: </label>
                        <input type="text" className="form-control" value={this.state.todo_heading} onChange={this.onChangeTodoHeading} />
                    </div>
                    <div className="form-group">
                        <label> Description: </label>
                        <input type="text" className="form-control" value={this.state.todo_desc} onChange={this.onChangeTodoDesc} />
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
                    <div className="form-check">
                        <input type="checkbox"
                            className="form-check-input"
                            id="completedCheckbox"
                            name="completedCheckbox"
                            onChange={this.onChangeTodoCompleted}
                            checked={this.state.todo_completed}
                            value={this.state.todo_completed}
                        />
                        <label className="form-check-label" htmlFor="completedCheckbox"> Completed </label>
                    </div>
                    <br />
                    <div className="form-group">
                        <input type="submit" value="Update ToDo" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}

