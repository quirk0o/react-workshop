import React from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'

export default () => (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="#">React Todo</a>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <NavItem href="/home">Home</NavItem>
        <NavItem href="/about">About</NavItem>
        <NavItem href="/stuff">Stuff</NavItem>
      </Nav>
    </Navbar>
);