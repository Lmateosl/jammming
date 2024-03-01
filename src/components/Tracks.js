import React from 'react';
import styles from '../styles/Tracks.module.css';
import TrackSong from './TrackSong';

export default function Tracks({tracks, onAddClick}) {
    return(
        <div className={styles.divContainer}>
            <h2 style={{textAlign: 'center'}}>Results</h2>
            {
                tracks ? 
                tracks.map((track, i) => (
                    <TrackSong 
                        key={track.id}
                        trackName={track.name} 
                        albumName={track.album.name}
                        trackId={track.id}
                        trackIndex={i} 
                        onAddClick={onAddClick}
                        artistName={track.artists[0].name}
                        addDelete="+"
                    />
                ))
                :
                <h3 style={{textAlign: 'center'}}>Search a song</h3>
            }
        </div>
    );
}