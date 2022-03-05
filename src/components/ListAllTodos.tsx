import React, { useContext } from "react";
import AllTodo from "./AllTodos";
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import PendingTodo from "./PendingTodo";
import CompletedTodo from "./CompletedTodo";
import classnames from 'classnames';
import useFetch from "./useFetch";
import ThemeContext from './theme-context';
import MuiThemeContext from "./MaterialUiThemContext";
import { ThemeProvider } from "@material-ui/core/styles"
import {Paper} from "@material-ui/core";

const ListAllTodos = () => {

    const { data, handleDeleteAction, handleStatus, activeTab, toggle } = useFetch();

    //const {theme} = useContext(ThemeContext)

    const {theme} = useContext(MuiThemeContext);
    
    return (
            <div className="mt-5">
                    <div>
                        <Nav tabs>
                            <NavItem>
                                <NavLink onClick={() => { toggle('1'); }} className={classnames({ active: activeTab === '1' })}>
                                    All Todos
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={() => { toggle('2'); }} className={classnames({ active: activeTab === '2' })}>
                                    Pending Todos
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={() => { toggle('3'); }} className={classnames({ active: activeTab === '3' })}>
                                    Completed Todos
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={activeTab}>
                            <TabPane tabId="1">
                                <Row>
                                    <Col sm="12">
                                        <AllTodo todos={data} handleDelete={handleDeleteAction} handleStatus={handleStatus} />
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId="2">
                                <Row>
                                    <Col sm="12">
                                        <PendingTodo todos={data.filter((todos) => todos.status === "Pending")} handleStatus={handleStatus} handleDelete={handleDeleteAction} />
                                    </Col>
                                </Row>
                            </TabPane>

                            <TabPane tabId="3">
                                <Row>
                                    <Col sm="12">
                                        <CompletedTodo handleDelete={handleDeleteAction} todos={data.filter((todos) => todos.status === "Completed")} />
                                    </Col>
                                </Row>
                            </TabPane>

                        </TabContent>
                    </div>
                </div>
    )
};

export default ListAllTodos;
