import React from 'react';
import Styles from './NavLink.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';

/**
 * @typedef{ import('react').HTMLProps<HTMLLiElement>} liProps
 */

/**
 * @param {{
 * text:string,
 * dark:boolean,
 * link:string,
 * } & liProps} props
 */

function NavLink({ text, dark, link, children, ...props }) {
  const router = useRouter();
  if (children) {
    return (
      <li tabIndex={0} className={Styles.navLink} {...props}>
        <span
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
        <Link href={link ? link : '/'}>
          <a
            className={
              dark
                ? router.pathname === link
                  ? [Styles.link, Styles.darkLink, Styles.activeLink].join(' ')
                  : [Styles.link, Styles.darkLink].join(' ')
                : Styles.link
            }>
            {text}
          </a>
        </Link>
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
      <span className={Styles.subLink}>
        {text}
        {shortcut && <span className={Styles.shortcut}>{shortcut}</span>}
      </span>
    </li>
  );
}

export { NavLink, SubMenuContiainer, SubNavLink };
