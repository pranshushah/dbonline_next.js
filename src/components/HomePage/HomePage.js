import React from 'react';
import Nav from '../HomeNav/HomeNav';
import Styles from './HomePage.module.scss';
import Button from '../UI/Button/Button';
export default function HomePage() {
  return (
    <div className={Styles.container}>
      <Nav />
      <h1 className={Styles.header}>Design Database Online</h1>
      <p className={Styles.headerContent}>
        create database without writing a single line of code
      </p>
      <div className={Styles.imgContainer}>
        <div className={Styles.mysql} />
        <div className={Styles.post} />
        <div className={Styles.oracle} />
      </div>
      <div className={Styles.buttonContainer}>
        <Button darkPrimary dimension='medium'>
          CREATE DATABASE FOR FREE
        </Button>
      </div>
      <p className={Styles.text}>No login required and it’s totally free</p>
    </div>
  );
}
