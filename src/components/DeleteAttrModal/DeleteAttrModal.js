import React from 'react';
import Modal from '../UI/Modal/Modal';
import Style from './DeleteAttrModal.module.scss';
import '../../utils/Types';
/**
 * @param {{showModalState:boolean,
 * onModalConfirmed:Function,
 * onModalClosed:Function,
 * tableName:string,
 * attrName:string,
 * givenTable:mainTableDetailsType
 * }} props
 */
function DeleteAttrModal({
  onModalClosed,
  onModalConfirmed,
  showModalState,
  tableName,
  attrName,
  givenTable,
}) {
  function cancelModalHandler() {
    onModalClosed();
  }

  function confirmModalHandler() {
    onModalConfirmed();
  }

  let lis = [];

  const attrindex = givenTable?.attributes?.findIndex(
    (attr) => attr.name === attrName,
  );

  if (givenTable?.attributes[attrindex].isPRIMARYKEY) {
    lis.push(
      <li key={lis.length}>
        If you delete this attribute, Primary key
        <span className={Style.constraintName}>
          {' '}
          {givenTable.tableLevelConstraint.PRIMARYKEY.constraintName}{' '}
        </span>
        will be deleted
      </li>,
    );
  }

  if (givenTable?.attributes[attrindex].isFOREIGNKEY) {
    const index = givenTable.tableLevelConstraint.FOREIGNKEY.findIndex(
      (key) => key.referencedAtt === givenTable.attributes[attrindex].id,
    );
    if (index !== -1) {
      lis.push(
        <li key={lis.length}>
          If you delete this attribute, Foreign key
          <span className={Style.constraintName}>
            {' '}
            {
              givenTable.tableLevelConstraint.FOREIGNKEY[index].constraintName
            }{' '}
          </span>
          will be deleted
        </li>,
      );
    }
  }
  if (
    givenTable?.attributes[attrindex].inTableLevelUniquConstraint.length !== 0
  ) {
    if (
      givenTable?.attributes[attrindex].inTableLevelUniquConstraint.length === 1
    ) {
      lis.push(
        <li key={lis.length}>
          If you delete this attribute, Unique constraint
          <span className={Style.constraintName}>
            {' '}
            {
              givenTable?.attributes[attrindex].inTableLevelUniquConstraint[0]
            }{' '}
          </span>
          will be deleted
        </li>,
      );
    } else {
      lis.push(
        <li key={lis.length}>
          If you delete this attribute, Unique constraint
          <span className={Style.constraintName}>
            {' '}
            {givenTable?.attributes[attrindex].inTableLevelUniquConstraint.join(
              ' , ',
            )}{' '}
          </span>
          will be deleted
        </li>,
      );
    }
  }

  return (
    <Modal
      size='large'
      title={`Are sure You want To Delete ${attrName} in ${tableName} table`}
      show={showModalState}
      canConfirm
      canCancel
      danger
      modalConfirmed={confirmModalHandler}
      modalClosed={cancelModalHandler}>
      <div className={Style.container}>
        <ul className={Style.listContainer}>{lis}</ul>
      </div>
    </Modal>
  );
}
export default DeleteAttrModal;
