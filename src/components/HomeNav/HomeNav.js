import React from 'react';
import { NavLink } from '../UI/Navbar/NavLink/NavLink';
import NavbarContainer from '../UI/Navbar/NavContainer';
import NavLogo from '../UI/Navbar/NavLogo/NavLogo';
import NavLinksContainer from '../UI/Navbar/NavLinksContainer/NavLinksContainer';
import '../../utils/Types';

/**
 * @param {{showGrid:boolean,
 * showRightSidebar:boolean,
 * showLeftSidebar:boolean,
 * mainTableDetails:mainTableDetailsType[],
 * onGridClick:Function,
 * onCreateTableClick:Function,
 * onRightSideBarClick:Function,
 * onLeftSideBarClick:Function}} props
 */

function Nav({ mainTableDetails, ...props }) {
  return (
    <NavbarContainer dark>
      <NavLogo text='DB ONLINE' />
      <NavLinksContainer>
        <NavLink text='Documation' dark></NavLink>
        <NavLink text='Dashboard' dark />
      </NavLinksContainer>
    </NavbarContainer>
  );
}

export default Nav;
