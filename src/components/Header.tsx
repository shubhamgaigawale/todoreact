import React, { useContext } from 'react';
import {
  Collapse,

  
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Navbar
} from 'reactstrap';
import { Link } from 'react-router-dom';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import ThemeContext from './theme-context';
import Switch from '@material-ui/core/Switch';


function Header(handleToggle:any) {

  const { toggleTheme } = useContext(ThemeContext)

  const [checked, setChecked] = React.useState(false);

  const handleChange = (event: any) => {
    setChecked(event.target.checked);
  };

  const { theme } = useContext(ThemeContext)


  return (
    <div>
      <Navbar expand="md">
        <NavbarBrand>
          <Link className="nav-link ml-3" to="/">
            <PlaylistAddCheckIcon />
          </Link>
        </NavbarBrand>
        <NavbarToggler />
        <Collapse navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <Link className="nav-link ml-3" to="/list">List</Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link mr-3" to="/add-todo">Add Todos</Link>
            </NavItem>
            <NavItem className="aling-left">
            </NavItem>
          </Nav>   
          <Switch
            className="me-3"
            color="primary"
            onChange={handleToggle}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
