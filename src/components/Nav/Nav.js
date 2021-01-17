import React from 'react';
import {
  NavLink,
  SubMenuContiainer,
  SubNavLink,
} from '../UI/Navbar/NavLink/NavLink';
import NavbarContainer from '../UI/Navbar/NavContainer';
import NavLogo from '../UI/Navbar/NavLogo/NavLogo';
import NavLinksContainer from '../UI/Navbar/NavLinksContainer/NavLinksContainer';
import '../../utils/Types';
import { code } from '../../utils/helper-function/createCode';

/**
 * @param {{showGrid:boolean,
 * showRightSidebar:boolean,
 * showLeftSidebar:boolean,
 * mainTableDetails:mainTableDetailsType[],
 * onGridClick:Function,
 * onCreateTableClick:Function,
 * onRightSideBarClick:Function,
 * onLeftSideBarClick:Function,
 * onCloseRightSidebar:Function,
 * onHomeClicked:Function,
 * onDashbardClicked:Function
 * }} props
 */

function Nav({ mainTableDetails, ...props }) {
  return (
    <NavbarContainer>
      <NavLogo text='DB ONLINE' />
      <NavLinksContainer>
        <NavLink text='Insert'>
          <SubMenuContiainer>
            <SubNavLink
              onClick={props.onCreateTableClick}
              text='Table'
              shortcut={'alt + t'}
            />
          </SubMenuContiainer>
        </NavLink>
        <NavLink text='View'>
          <SubMenuContiainer>
            <SubNavLink
              text={props.showGrid ? 'hide grid' : 'show grid'}
              onClick={props.onGridClick}
              shortcut={'alt + g'}
            />
            <SubNavLink
              text={props.showLeftSidebar ? 'hide explorer' : 'show explorer'}
              onClick={props.onLeftSideBarClick}
              shortcut={'ctrl + b'}
            />
            <SubNavLink
              text={'go to dashboard'}
              onClick={props.onDashbardClicked}
              shortcut={'shift + d'}
            />
            <SubNavLink
              text={'go to home'}
              onClick={props.onHomeClicked}
              shortcut={'shift + h'}
            />
            <SubNavLink
              text={'close r-sidebar'}
              onClick={props.onRightSideBarClick}
              shortcut={'shift + r'}
            />
          </SubMenuContiainer>
        </NavLink>
        <NavLink text='download'>
          <SubMenuContiainer>
            <SubNavLink
              text='export as PDF'
              onClick={() => {
                window.print();
              }}
              shortcut={'ctrl + p'}
            />
            <SubNavLink
              text='export as Code'
              onClick={() => code(mainTableDetails)}
              shortcut={'alt + c'}
            />
          </SubMenuContiainer>
        </NavLink>
      </NavLinksContainer>
    </NavbarContainer>
  );
}

export default Nav;
