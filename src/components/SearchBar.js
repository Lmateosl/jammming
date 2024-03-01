import React from "react";
import styles from '../styles/SearchBar.module.css';

export default function SearchBar({onChangeSearch, onClickButon}) {
    return (
        <div className={styles.div}>
            <input className={styles.input} type="search" placeholder="Type a song..." onChange={onChangeSearch}/>
            <button className={styles.button} onClick={onClickButon}>Search</button>
        </div>
    );
}