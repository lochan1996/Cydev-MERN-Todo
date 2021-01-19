import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Base from './Base';
import { deleteTodos } from './helper/todoHelper';
import { getToDo } from './helper/todoHelper'
import { isAuthenticate } from './menu';
import TodoLists from './TodoLists';
import { Button, Alert, Table } from 'react-bootstrap';

const API = 'http://localhost:8000/api'

const UserTodoLists = ({ match }) => {

    const { user, token } = isAuthenticate()

    const [todos, setTodos] = useState([])
    const [success, setsuccess] = useState(false)
    const [show, setShow] = useState(true);

    
    const todolist = () => {
        if (typeof window !== undefined) {
            if (localStorage.getItem("jwt")) {
                let temp = JSON.parse(localStorage.getItem("jwt"));

                getToDo(temp.user._id, temp.token).then(response => {

                    setTodos(response)
                }).catch((err) => {
                    console.log(err)
                })
            }
        }
    }

    useEffect(() => {
        todolist()
        
    },[])

    

    

    const getToData = () => {
       

        let userTodos = todos.todos || []
      
        
        return userTodos.map((current, index) => {
            return <Todo todo={current} key={index} />
        })
    }
    const deleteTodo = (props) => {
        let temp = JSON.parse(localStorage.getItem("jwt"));
        let deleteId = props.todo._id
        deleteTodos(temp.user._id, temp.token, deleteId).then(response => {

            console.log('response', response)




        }).catch((err) => {
            console.log(err)
        })
        setsuccess(true)
        todolist()
        console.log(props.todo._id)
        
    }

    const deleteMessage = () => {
        
            if (success) {
                return (
                    <Alert variant="success">
                        <Alert.Heading>Task has been deleted</Alert.Heading>
                    </Alert>
                );
            }
        
        
        
    }
    const Todo = props => (

        <tr>
            <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_heading}</td>
            <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_desc}</td>
            <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_priority}</td>
            <td>
                <Button variant="light"><Link to={"/edit/" + props.todo._id}>
                    Edit
                </Link>
                </Button>
            </td>
            
            <td>

                <Button variant="danger" onClick={() => deleteTodo(props)}>Delete</Button>
            </td>

        </tr>
        
    )

    const userTasks = () => (
        <Table striped bordered hover variant="dark" responsive="md">
            <thead>
                <tr>
                    <th>Task</th>
                    <th>Description</th>
                    <th>Priority</th>
                    <th colSpan="2">Actions</th>

                </tr>
            </thead>
            
            <tbody>
                {getToData()}
            </tbody>

        </Table>
    );

    return (
        <Base title="UserTodo Tasks" className="container bg-info p-4">

            <div className="row  text-white rounded">
                <div className="col-md-8 offset-md-2">
                    {deleteMessage()}
                    {userTasks()}
                </div>
            </div>
        </Base>
    );
}


export default UserTodoLists;