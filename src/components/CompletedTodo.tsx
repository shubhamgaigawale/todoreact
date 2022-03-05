import React from 'react'
import { Button } from "reactstrap";
import Delete from "@material-ui/icons/Delete";
import { Alert } from 'reactstrap';

const CompletedTodo = ({ todos, title, handleDelete}: any) => {

    return (
        <div className="todo-list">
            {todos.length === 0 && (
                <Alert color="danger">No Completed Todo's</Alert>
            )}
            <h2>{title}</h2>

            {todos.map((todos: any) => (
                <div className="todo-preview" key={todos.todo_id}>
                    <h2>{todos.name}</h2>
                    <p>Priority: {todos.priority}</p>
                    <p>Due Date: {todos.dueDate}</p>
                    <p className="status">Status: {todos.status}</p>
                    <div>
                        <Button color="danger" onClick={() => handleDelete(todos.todo_id)}>
                                <Delete className=""></Delete>
                        </Button>
                    </div>
                </div>))}
        </div>
    );
}

export default CompletedTodo
