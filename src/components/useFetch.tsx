import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";
import { createMuiTheme } from '@material-ui/core';

export interface TodoDto {
  todo_id: string;
  name: string;
  dueDate: string;
  priority: string;
  status: string;
}

interface ParamType {
  todo_id: string;
}

const useFetch = () => {

  const { todo_id } = useParams<ParamType>();

  let todoObject = {
    name: "",
    dueDate: "",
    priority: "",
    status: "",
    error: false,
  };

  const [data, setData] = useState([] as TodoDto[]);

  const [inputData, setInputData] = useState(todoObject);

  const [activeTab, setActiveTab] = useState('1');

  const [darkMode, setDarkMode] = useState(false);

  const themeUiDark = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light"
    }
  })

  const {error} = inputData

  useEffect(() => {
    fetchData();
  }, [])

  const history = useHistory();

  const fetchData = () => {
    fetch('http://localhost:4995/api/todos')
      .then(res => res.json())
      .then(
        (result) => {
          setData(result);
        }
      )
      .catch(error => {
        console.log(error);
      })
  }

  const handleDeleteAction = async (todo_id: string) => {
    const req = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },

    }
    fetch(`http://localhost:4995/api/todos/${todo_id}`, req)
      .then((response) => response.json())
      .then((response) => {
        toast.info("Todo has been deleted", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log(response);
        // fetchData();
        fetchData();
      })
  }

  const handleForm = (event: any) => {
    const { name, value } = event.target
    setInputData((prevInputData) => ({ ...prevInputData, error: false, [name]: value }));
  };

  const postTodo = (event: any) => {
    event.preventDefault();
    const todoDetails = {
      name: inputData.name,
      dueDate: inputData.dueDate,
      priority: inputData.priority,
      status: inputData.status,
    };

    const req = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todoDetails),
    };
    fetch(`http://localhost:4995/api/todos`, req)
        .then((response) => response.json())
        .then(data => {
          if(data.error){
            setInputData({ ...inputData, error: data.error });
          }else{
            setInputData(todoObject);
            history.push('/list')
        }
    });
    fetchData();
  };

  const handleStatus = async (e: any, todo_id: string, todo: any) => {
    e.preventDefault();
    const req = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(todo)
    }
    await fetch(`http://localhost:4995/api/todos/${todo_id}`, req);
    toast.info("Todo markde as Completed", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    fetchData();
  }

  const fetchDataById = async () => {
    fetch(`http://localhost:4995/api/todos/${todo_id}`)
      .then(res => res.json())
      .then(
        (result) => {
          setInputData(result);
        }
      )
      .catch(error => {
        console.log(error);
      })
  }

  const updateTodo = async (e: any) => {
    e.preventDefault();
    const todoDetails = {
      name: inputData.name,
      dueDate: inputData.dueDate,
      priority: inputData.priority,
      status: inputData.status,
    };
    const req = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(todoDetails)
    }
    await fetch(`http://localhost:4995/api/todos/${todo_id}`, req);
    toast.success(`Todo has been updated successfully.`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    history.push('/list');
  }

  const errorMessage = () => {
    return (
        <div className="alert alert-danger" role="alert" style={{ display: error ? "" : "none" }}>
            {error}
        </div>
    );
  } 

  const toggle = (tab: any) => {
  if (activeTab !== tab) setActiveTab(tab);
  }

  return { data, themeUiDark, inputData, activeTab, toggle, fetchDataById, updateTodo, postTodo, handleForm, handleDeleteAction, handleStatus, errorMessage }
  };

export default useFetch;

