import React from 'react';
import ModalHeaderContainer from './HeaderContainer/HeaderContainer';
import BackDrop from './BackDrop/BackDrop';
import Button from '../Button/Button';
import Styles from './Modal.module.scss';

/**
 * @param {{
 * primary:boolean,
 * danger:boolean,
 * secondary:boolean,
 * size:("medium"|"large"|"huge"),
 * title:string,
 * show:boolean,
 * modalClosed:Function,
 * modalConfirmed:Function,
 * canCancel:boolean,
 * canConfirm:boolean,
 * confirmDisabled:boolean
 * }} props
 */

function Modal({
  title,
  canCancel,
  canConfirm,
  modalConfirmed,
  modalClosed,
  show,
  primary,
  danger,
  secondary,
  size,
  children,
  confirmDisabled = false,
}) {
  const classes = [Styles.container];
  switch (size) {
    case 'huge': {
      classes.push(Styles.huge, Styles.containerHuge);
      break;
    }
    case 'large': {
      classes.push(Styles.large);
      break;
    }
    default: {
      classes.push(Styles.medium);
    }
  }
  const contentClasses =
    size !== 'huge'
      ? [Styles.contentContainer]
      : [Styles.contentContainer, Styles.contentContainerHuge];
  const headingtTitle = title ? (
    <ModalHeaderContainer
      title={title}
      size={size}
      secondary={secondary}
      danger={danger}
      primary={primary}
    />
  ) : null;
  const modalThings = show ? (
    <div className={classes.join(' ')}>
      {headingtTitle}
      <div className={contentClasses.join(' ')}>{children}</div>
      <div className={Styles.action}>
        {canCancel && (
          <Button
            onClick={modalClosed ? modalClosed : null}
            danger={danger}
            dimension='medium'
            inverted
            style={{ marginRight: '8px', marginBottom: '8px' }}
            secondary={secondary}
          >
            Cancel
          </Button>
        )}
        {canConfirm && (
          <Button
            onClick={modalConfirmed ? modalConfirmed : null}
            disabled={confirmDisabled}
            darkPrimary={primary}
            danger={danger}
            style={{
              marginRight: '16px',
              marginBottom: '8px',
              marginLeft: '8px',
            }}
            dimension='medium'
            secondary={secondary}
          >
            Confirm
          </Button>
        )}
        {canCancel}
      </div>
    </div>
  ) : null;
  return (
    <>
      <BackDrop show={show} clicked={modalClosed} />
      {modalThings}
    </>
  );
}

export default Modal;
