import React from "react";  
import styles from '../styles/TrackSong.module.css';

export default function TrackSong({trackName, albumName, onAddClick, artistName, trackId, trackIndex, addDelete}) {
    return (
        <div className={styles.divContainer} id={trackId}>
            <div className={styles.divSong}>
                <h3>{trackName}</h3>
                <p>{artistName} | {albumName}</p>
            </div>
            <div className={styles.divAdd}>
                <p onClick={() => onAddClick(trackIndex)} style={{fontSize: 22}}>{addDelete}</p>
            </div>
        </div>
    );
}