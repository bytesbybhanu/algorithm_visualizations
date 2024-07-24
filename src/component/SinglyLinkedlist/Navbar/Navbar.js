import React, { useState } from 'react';
import "./Navbar.scss";
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';

const AppNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar style={{ backgroundColor: '#000000',justifyContent: 'center', width: '100%' }} dark expand="md">
        <NavbarBrand href="/">Singly linkedList
        <Link to="/" className='Home'>
            Home
          </Link>
          </NavbarBrand>
      </Navbar>
    </div>
  );
}

export default AppNavbar;
