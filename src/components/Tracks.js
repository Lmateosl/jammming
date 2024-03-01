import React from 'react';
import styles from '../styles/Tracks.module.css';
import TrackSong from './TrackSong';
import InputPlaylist from './InputPlaylist';  

export default function Tracks({tracks, onAddClick, isResults, onPlaylistChange="nada"}) {
    return(
        <div className={styles.divContainer}>
            {
                isResults ? 
                <h2 style={{textAlign: 'center'}}>Results</h2> 
                :
                <InputPlaylist placeholderText="Playlist Name" onPlaylistChange={onPlaylistChange}/>
            }
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
                        addDelete={isResults ? '+' : '-'}
                    />
                ))
                :
                <h3 style={{textAlign: 'center'}}>Search a song</h3>
            }
            {
                !isResults && <div></div>
            }
        </div>
    );
}