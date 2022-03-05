import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import { ToastContainer } from 'react-toastify';
import { Container, Col } from 'reactstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import UpdateTodo from './components/UpdateTodo';
import ListAllTodos from './components/ListAllTodos';
import ThemeContext, { themes } from './components/theme-context';
import AddTodo from './components/AddTodo';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from "@material-ui/core/styles"
import { Paper } from "@material-ui/core";
import Switch from '@material-ui/core/Switch';
import DateRangeControl from './components/DateRangePicker';
import { DateRangePicker, DateRange } from "materialui-daterange-picker";



function App() {

  useEffect(() => {
    document.title = "Todo Application";
  }, []);

  const [theme, setTheme] = useState(themes.light);

  const [darkMode, setDarkMode] = useState(false);


  const toggleTheme = () => {
    theme === themes.light
      ? setTheme(themes.dark)
      : setTheme(themes.light)
  }


  const themeUiDark = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light"
    }
  })

  return (

    // <ThemeContext.Provider value={{theme, toggleTheme}}>
    <ThemeProvider theme={themeUiDark}>
      <Paper>
        <div>
          <Router>
            <ToastContainer />
            <Header handleToggle={themeUiDark}/>
            <Switch
            className="me-3"
            color="primary"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            inputProps={{ 'aria-label': 'controlled' }}
          />
            <Container>
              <Col md={12}>
                <Route path="/" component={Home} exact />
                <Route path="/add-todo" component={AddTodo} exact />
                <Route path="/add" component={AddTodo} exact />
                <Route path="/update-todo/:todo_id" component={UpdateTodo} exact />
                <Route path="/list" component={ListAllTodos} exact />
              </Col>

              <DateRangeControl />
            </Container>
          </Router>
          
        </div>
      </Paper>
    </ThemeProvider>

    // </ThemeContext.Provider>
  );
  // const [open, setOpen] = React.useState(false);
  // const [dateRange, setDateRange] = useState({});
 
  // const toggle = () => setOpen(!open);
 
  // return (
  //   <DateRangePicker
  //     open={open}
  //     toggle={toggle}
  //     onChange={(range) => setDateRange(range)}
  //   />
  // );
}

export default App;
