import React, { useEffect, useState, useContext } from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Input } from "reactstrap";
import UpdateSharpIcon from '@material-ui/icons/UpdateSharp';
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import useFetch from "./useFetch";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ThemeContext from "./theme-context";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface ParamType {
  todo_id: string;
}


const UpdateTodo = () => {
  const history = useHistory();
  const { todo_id } = useParams<ParamType>();

  let [todo, setTodo] = useState({
    name: "",
    dueDate: "",
    priority: "",
    status: ""
  });

  const { name, dueDate, priority, status } = todo;

  const onInputChange = (e: any) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    document.title = 'Update Todo'
    loadTodo();
  }, []);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    await axios.patch(`http://localhost:4995/api/todos/${todo_id}`, todo);
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

  const loadTodo = async () => {
    await axios.get(`http://localhost:4995/api/todos/${todo_id}`).then(
      (response) => {
        console.log(response.data);
        setTodo(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  const classes = useStyles();

  const { errorMessage } = useFetch();

  const { theme } = useContext(ThemeContext)

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <UpdateSharpIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Update To Do
          </Typography>
          <form className={classes.form} onSubmit={onSubmit} noValidate>
            {errorMessage()}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="standard-basic"
                  label="e.g. Shopping"
                  type="text"
                  name="name"
                  value={name}
                  onChange={e => onInputChange(e)}
                  required
                  fullWidth
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="date"
                  value={dueDate}
                  name="dueDate"
                  onChange={e => onInputChange(e)}
                />
              </Grid>

              <Grid item xs={12}>
                <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="priority"
                  value={priority}
                  onChange={e => onInputChange(e)}
                  fullWidth
                >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                </Select>

              </Grid>

              <Grid item xs={12}>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="status"
                  value={status}
                  onChange={e => onInputChange(e)}
                  fullWidth
                >
                   <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </Select>
              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            > Update Todo</Button>
          </form>
        </div>
        <Box mt={5}>
        </Box>
      </Container>
    </div>
  );
};

export default UpdateTodo;
