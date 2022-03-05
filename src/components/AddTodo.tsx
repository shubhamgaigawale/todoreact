import React, { useEffect, useContext } from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import useFetch from "./useFetch";
import AddSharpIcon from '@material-ui/icons/AddSharp';
import ThemeContext from "./theme-context";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { ThemeProvider } from "@material-ui/core/styles"
import {Paper} from "@material-ui/core";

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

const AddTodo = () => {
  useEffect(() => {
    document.title = "Add Todo";
  }, []);

  const { postTodo, handleForm, inputData, errorMessage } = useFetch();

  const classes = useStyles();

  // const { dark, light } = useContext(ThemeContext)

  const themeUi = createMuiTheme({
    palette: {
      type: "dark"
    }
  })

  return (
    <ThemeProvider theme={themeUi}>
      <Paper>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <AddSharpIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Add To Do
            </Typography>
            <form className={classes.form} onSubmit={postTodo} noValidate>
              {errorMessage()}
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="standard-basic"
                    label="e.g. Shopping"
                    type="text"
                    name="name"
                    value={inputData.name}
                    onChange={handleForm}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="date"
                    label="Due Date"
                    type="date"
                    name="dueDate"
                    value={inputData.dueDate}
                    onChange={handleForm}
                    defaultValue="2017-05-24"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={handleForm}
                    name="priority"
                    value={inputData.priority}
                    fullWidth
                  >
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                  </Select>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              > Add Todo</Button>
            </form>
          </div>
          <Box mt={5}>
          </Box>
        </Container>
      </Paper>
    </ThemeProvider>
  );
};

export default AddTodo;

