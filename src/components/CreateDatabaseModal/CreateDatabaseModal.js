import React, { useState, useEffect } from 'react';
import Modal from '../UI/Modal/Modal';
import Input from '../UI/Input/Input';
import Radio from '../UI/Radio/Radio';
import { useRadio } from '../../utils/customHooks/useRadio';
import Styles from './CreateDatabaseModal.module.scss';
import { set } from 'idb-keyval';
import { useRouter } from 'next/router';
import uuid from 'uuid/v1';
import databaseConstant from '../../utils/constant/databaseTypes';
const RandExp = require('randexp');

import {
  dataTypesRadioList,
  sqlDatabaseRadioList,
} from '../../utils/CreateDatabaseRadioList';
export default function CreateDatabaseModal({ show, modalCancel }) {
  const [inputValue, setInputValue] = useState('');
  const [databaseRadio, setDatabaseRadio] = useRadio(dataTypesRadioList);
  const [sqlRadio, setSqlRadio] = useRadio(sqlDatabaseRadioList);
  const router = useRouter();
  const reg = /^[a-zA-Z_$][0-9a-zA-Z_$]*$/; // regex for valid dataabse name

  function inputValueChangeHandler(e) {
    if (e.target.value === '') {
      setInputValue(e.target.value);
    } else {
      if (reg.test(e.target.value)) setInputValue(e.target.value);
    }
  }
  function getDatabaseVariant() {
    const index = sqlRadio.findIndex((sqlRadioObj) => {
      return sqlRadioObj.checked;
    });
    if (index !== -1) {
      return sqlRadio[index].value;
    }
  }
  function confirmHandler() {
    let databaseName;
    if (inputValue) {
      databaseName = inputValue;
    } else {
      databaseName = new RandExp(reg).gen().slice(0, 8);
    }
    let id = uuid();
    const date = new Date();
    const databaseObj = {
      id,
      databaseName,
      mainTableDetails: [],
      tableDndDetails: [],
      createdAt: date,
      modifiedAt: date,
      isSqlDatabase: databaseRadio.some(
        (radioObj) => radioObj.value === databaseConstant.SQL,
      )
        ? true
        : false,
      databaseType: getDatabaseVariant(),
    };
    set(id, databaseObj).then(() => {
      router.push(`database/${id}`);
      modalCancel();
    });
  }
  // submit on enter and cancel on esc
  //using keyup when you open modal using enter it will think it from modal and it take that enter and create database so we are using keydown.
  useEffect(() => {
    function doneOnEnterModalHandler(e) {
      if (e.key === 'Enter') {
        confirmHandler();
      } else {
        if (e.key === 'Escape') {
          modalCancel();
        }
      }
    }

    document.addEventListener('keydown', doneOnEnterModalHandler);
    return function cleanup() {
      document.removeEventListener('keydown', doneOnEnterModalHandler);
    };
  }, [inputValue]);
  return (
    <Modal
      show={show}
      size='medium'
      primary
      modalClosed={modalCancel}
      modalConfirmed={confirmHandler}
      canConfirm
      title='Please Select database'>
      <div className={Styles.container}>
        <Input
          onChange={inputValueChangeHandler}
          value={inputValue}
          dimension='large'
          label='database name'
          autoFocus
        />
        <div className={Styles.radioContainer}>
          <h1 className={Styles.header}>Select Database type</h1>
          <Radio
            valueObjectArray={databaseRadio}
            nameForRadioContainer='database'
            onChange={setDatabaseRadio}
            inLine
          />
        </div>
        <div className={Styles.radioContainer}>
          <h1 className={Styles.header}>Select sql database type </h1>
          <Radio
            inLine
            valueObjectArray={sqlRadio}
            onChange={setSqlRadio}
            nameForRadioContainer='sql-type'
          />
        </div>
      </div>
    </Modal>
  );
}
