import React from 'react';
import styles from '../styles/InputPlaylist.module.css';

export default function InputPlaylist({onPlaylistChange, placeholderText}) {
    return(
        <input className={styles.input} type="text" placeholder={placeholderText} onChange={onPlaylistChange}/>
    );
}