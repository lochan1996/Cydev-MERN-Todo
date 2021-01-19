import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import TodoLists from './components/TodoLists';
import createTodo from './components/createTodo';
import editToDo from './components/editToDo';
import Menu from './components/menu';
import Base from './components/Base';
import Signup from './components/Signup';
import Signin from './components/Signin';
import AdminDashBoard from './components/AdminDashBoards';
import UserDashBoard from './components/UserDashBoard';




function App() {
    return (
        <Router>
            <div className="container">
                
                <h2>MERN TODO APP</h2>
                <Route path="/" exact component={TodoLists} />
                <Route path="/edit/:id" component={editToDo} />
                <Route path="/create" component={createTodo} />
                <Route path="/signup" component={Signup} />
                <Route path="/signin" component={Signin} />
                <Route path="/admin/dashboard" component={AdminDashBoard} />
                <Route path="/user/dashboard" component={UserDashBoard} />
                



        </div>
            
        </Router>
  );
}

export default App;
