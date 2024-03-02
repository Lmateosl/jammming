import './App.css';
import React, { useState, useEffect } from 'react';
import Bar from './components/Bar';
import SearchBar from './components/SearchBar';
import Tracks from './components/Tracks';
import { get, post, auth } from './HttpRequests';

function App() {

  const [tracks, setTracks] = useState(null);
  const [addList, setAddList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [nameList, setNameList] = useState("");

  const code = window.location.href.split('=')[1];

  useEffect(() => {
    if(!code) auth();
  }, [code]);

  const searchChangeHandler = ({target}) => setSearchInput(target.value);

  const submitHandler = async() => {
    const response = await get(searchInput);
    console.log(response.tracks.items);
    setTracks(response.tracks.items);
  }

  const addClickHandlrer = (trackIndex) => {
    setAddList(prevAddList => ([
      ...prevAddList,
      tracks[trackIndex]
    ]));
  }

  const removeClickHandler = (trackIndex) => setAddList(prevAddList => prevAddList.filter((list, i) => i !== trackIndex));

  const changeNameListHandler = ({target}) => setNameList(target.value);

  const createLIstHadler = async() => {
    if(nameList.length < 1) {
      alert('Ingresa el nombre de la lista.');
    } else if (addList.length < 1) {
      alert('Escoge un minimo de una cancion.');
    } else {
      const urisArray = addList.map(song => song.uri);
      const response = await post(nameList, urisArray, code);
      alert('Playlist Creada con exito');
      console.log(response);
      setTracks(null);
      setAddList([]);
    }
  }

  return (
      <div id="contenedorApp">
        <div id="componentes">
          <Bar />
          <SearchBar onChangeSearch={searchChangeHandler} onClickButon={submitHandler}/>
          <div id="lists">
            <Tracks tracks={tracks} onAddClick={addClickHandlrer} isResults={true}/>
            <Tracks tracks={addList} onAddClick={removeClickHandler} isResults={false} onPlaylistChange={changeNameListHandler} onPlaylistSubmit={createLIstHadler}/>
          </div>
        </div>
      </div>
  );
}

export default App;
