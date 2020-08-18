import React from 'react';
import Styles from './NavLink.module.scss';
/**
 * @typedef{ import('react').HTMLProps<HTMLLiElement>} liProps
 */

/**
 * @param {{
 * text:string,
 * dark:boolean,
 * } & liProps} props
 */

function NavLink({ text, dark, children, ...props }) {
  if (children) {
    return (
      <li className={Styles.navLink} {...props}>
        <span
          href='/#'
          className={
            dark
              ? [Styles.darkLink, Styles.link, Styles.downArrow].join(' ')
              : [Styles.link, Styles.downArrow].join(' ')
          }>
          {text}
        </span>
        {children}
      </li>
    );
  } else {
    return (
      <li className={Styles.navLink} {...props}>
        <span
          className={
            dark ? [Styles.link, Styles.darkLink].join(' ') : Styles.link
          }>
          {text}
        </span>
      </li>
    );
  }
}

function SubMenuContiainer({ children }) {
  return <ul className={Styles.subMenuContainer}>{children}</ul>;
}

/**
 * @param {{
 * text:string,
 * shortcut:string,
 * } & liProps} props
 */

function SubNavLink({ text, shortcut, ...props }) {
  return (
    <li className={Styles.subNavLink} {...props}>
      <span href='/#' className={Styles.subLink}>
        {text}
        {shortcut && <span className={Styles.shortcut}>{shortcut}</span>}
      </span>
    </li>
  );
}

export { NavLink, SubMenuContiainer, SubNavLink };
