import React from 'react';
import { NavLink } from '../UI/Navbar/NavLink/NavLink';
import NavbarContainer from '../UI/Navbar/NavContainer';
import NavLogo from '../UI/Navbar/NavLogo/NavLogo';
import NavLinksContainer from '../UI/Navbar/NavLinksContainer/NavLinksContainer';
import '../../utils/Types';
// import { useRecoilValue } from 'recoil';
// import { authenticatedAtom } from '../../atoms/authenticatedAtom';

function Nav() {
  // const authenticated = useRecoilValue(authenticatedAtom);
  return (
    <NavbarContainer dark>
      <NavLogo text='DB ONLINE' />
      <NavLinksContainer>
        {/* <NavLink
          text={authenticated ? 'Log out' : 'Sing in'}
          link={authenticated ? '/logout' : '/api/auth/google'}
          dark
        /> */}
        <NavLink text='Dashboard' link='/dashboard' dark />
      </NavLinksContainer>
    </NavbarContainer>
  );
}

export default Nav;
