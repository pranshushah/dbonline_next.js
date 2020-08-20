import React from 'react';
import { NavLink } from '../UI/Navbar/NavLink/NavLink';
import NavbarContainer from '../UI/Navbar/NavContainer';
import NavLogo from '../UI/Navbar/NavLogo/NavLogo';
import NavLinksContainer from '../UI/Navbar/NavLinksContainer/NavLinksContainer';
import '../../utils/Types';

/**
 * @param {{}} props
 */

function Nav() {
  return (
    <NavbarContainer dark>
      <NavLogo text='DB ONLINE' />
      <NavLinksContainer>
        <NavLink text='Documation' link='/documation' dark />
        <NavLink text='Dashboard' link='/dashboard' dark />
      </NavLinksContainer>
    </NavbarContainer>
  );
}

export default Nav;
