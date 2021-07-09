import React from 'react';
import Styles from './Button.module.scss';

/**
 * @typedef{ import('react').HTMLProps<HTMLButtonElement>} buttonProps 
 * @typedef{import('react').Ref<HTMLButtonElement>}  buttonRefType
/**

/**
 * @param {{
 * secondary?:boolean,
 * darkPrimary:boolean,
 * dimension:("small"|"medium"|"large"|"huge"),
 * danger?:boolean,
 * inverted?:boolean,
 * } & buttonProps} props
 * @param {buttonRefType} ref
 */

function Button({
  children,
  secondary = false,
  darkPrimary,
  danger = false,
  dimension = 'medium',
  inverted = false,
  ...props
}) {
  const classes = [Styles.button];

  switch (dimension) {
    case 'huge': {
      classes.push(Styles.huge);
      break;
    }
    case 'large': {
      classes.push(Styles.large);
      break;
    }
    case 'small': {
      classes.push(Styles.small);
      break;
    }
    default: {
      classes.push(Styles.medium);
    }
  }

  if (secondary) {
    if (inverted) {
      classes.push(Styles.invertedSecondary);
    } else {
      classes.push(Styles.secondary);
    }
  } else if (danger) {
    if (inverted) {
      classes.push(Styles.invertedDanger);
    } else {
      classes.push(Styles.danger);
    }
  } else if (darkPrimary) {
    if (inverted) {
      classes.push(Styles.invertedDarkPrimary);
    } else {
      classes.push(Styles.darkPrimary);
    }
  } else {
    if (inverted) {
      classes.push(Styles.invertedPrimary);
    } else {
      classes.push(Styles.primary);
    }
  }

  return (
    <button {...props} className={classes.join(' ')}>
      {children}
    </button>
  );
}

export default Button;
