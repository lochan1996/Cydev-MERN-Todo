const API = 'http://localhost:8000/api/'

export const getToDo = (userId, token) => {

    return fetch(`${API}user/${userId}/todos`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },

    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const createTodos = (userId, token, newTodo) => {
    return fetch(`${API}user/${userId}/add`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newTodo)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getAllToDo = (userId, token) => {

    return fetch(`${API}/${userId}/getAllUsers`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },

    })
        .then(response => {
            console.log('response', response)
            return response.json();

        })
        .catch(err => console.log(err));
};

export const editTodos = (userId, token, newTodo, updateId) => {
    return fetch(`${API}user/${userId}/update/${updateId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newTodo)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const deleteTodos = (userId, token, deleteId) => {
    return fetch(`${API}user/${userId}/delete/${deleteId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },

    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

