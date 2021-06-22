import React, { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

interface Props {}

function Navbar({}: Props): ReactElement {
  return (
    <nav>
      <NavLink activeClassName="selected" exact to="/">
        Home
      </NavLink>
      <NavLink activeClassName="selected" to="/just+d3">
        JustD3
      </NavLink>
      <NavLink activeClassName="selected" to="/with+select+d3">
        WithSelectD3
      </NavLink>
      <NavLink activeClassName="selected" to="/with+components">
        WithComponents
      </NavLink>
      <NavLink activeClassName="selected" to="/with+context">
        WithContext
      </NavLink>
      <NavLink
        className="disabled"
        activeClassName="selected"
        to="/render+props"
      >
        RenderProps
      </NavLink>
      <NavLink
        className="disabled"
        activeClassName="selected"
        to="/higher+order+components"
      >
        HOC
      </NavLink>
      <NavLink activeClassName="selected" to="hex+map">
        HOC
      </NavLink>
    </nav>
  );
}

export default Navbar;
