
import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

const NavBar = (props) => {
    return (
        <div>
            <p></p>
            <Nav>
                <NavItem>
                    <NavLink href="#">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">Product Catalog</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">New Invoice</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">All Invoices</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">Profile</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">Sign out</NavLink>
                </NavItem>

            </Nav>
        </div>
    );
}

export default NavBar;