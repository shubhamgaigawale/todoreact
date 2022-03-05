import React , {useEffect} from "react";

import { Link } from "react-router-dom";
import {Container, Jumbotron} from 'reactstrap'
import DateRangeControl from "./DateRangePicker";



function Home() {

    useEffect(() => {
        document.title="Todo App"
      })

    return(
        <div>
            <Jumbotron className="text-center">
                <h1>To Do Application</h1>
                <p>Manage your all tasks with To Do Application</p>
                <Container>
                    <Link to="/add-todo">Add Todo</Link>
                </Container>
                <DateRangeControl />
            </Jumbotron>
            <DateRangeControl />
        </div>
    );
}

export default Home;