import Modal from '../../UI/Modal/Modal';
import { useEffect } from 'react';
/**
 * @param {{
 * show:boolean,
 * onModalCanceled:Function,
 * onModalConfirmed,
 * title:string,
 * }} props
 */
export default function DeleteConstraintModal({
  show,
  onModalConfirmed,
  onModalCanceled,
  title,
}) {
  // submit on enter and cancel on esc
  useEffect(() => {
    function doneOnEnterModalHandler(e) {
      if (e.key === 'Enter') {
        onModalConfirmed();
      } else {
        if (e.key === 'Escape') {
          onModalCanceled();
        }
      }
    }

    document.addEventListener('keyup', doneOnEnterModalHandler);
    return function cleanup() {
      document.removeEventListener('keyup', doneOnEnterModalHandler);
    };
  }, []);
  return (
    <Modal
      size='medium'
      show={show}
      canConfirm
      danger
      canCancel
      modalConfirmed={onModalConfirmed}
      modalClosed={onModalCanceled}
      title={title}
    />
  );
}
