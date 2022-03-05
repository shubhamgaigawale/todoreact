import React from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { CircularProgress } from "@material-ui/core";

const AllTodo = ({ todos, title, handleDelete, handleStatus }: any) => {
    return (
        <div className="todo-list">
            {todos.length === 0 && (
                <CircularProgress className="spinner"/>
            )}
            <h2>{title}</h2>
            {todos.map((todos: any) => (
                <div className="todo-preview" key={todos.todo_id}>
                    <h2>{todos.name}</h2>
                    <p>Priority: {todos.priority}</p>
                    <p>Due Date: {todos.dueDate}</p>
                    <p className="status">Status: {todos.status}</p>

                    {todos.status === "Completed" ?
                        <Button color="danger" onClick={() => handleDelete(todos.todo_id)}>
                            <Delete className=""></Delete>
                        </Button> :
                        <div>
                            <Button color="success" onClick={(e) => handleStatus(e, todos.todo_id, { ...todos, status: "Completed" })}>
                                <CheckCircleIcon className="me-2"></CheckCircleIcon>
                            </Button>

                            <Link to={`/update-todo/${todos.todo_id}`}>
                                <Button color="info ml-3">
                                    <EditIcon className="me-2"></EditIcon>
                                </Button>
                            </Link>

                            <Button color="danger ml-3" onClick={() => handleDelete(todos.todo_id)}>
                                <Delete className=""></Delete>
                            </Button>
                        </div>
                    }
                </div>))}
        </div>
    );
};

export default AllTodo;
