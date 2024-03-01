import './App.css';
import React, { useState } from 'react';
import Bar from './components/Bar';
import SearchBar from './components/SearchBar';
import Tracks from './components/Tracks';
import { get } from './HttpRequests';

function App() {

  const [tracks, setTracks] = useState(null);
  const [addList, setAddList] = useState([]);
  const [searchInput, setSearchInput] = useState("");

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
    console.log(addList);
  }

  return (
      <div id="contenedorApp">
        <div id="componentes">
          <Bar />
          <SearchBar onChangeSearch={searchChangeHandler} onClickButon={submitHandler}/>
          <div id="lists">
            <Tracks tracks={tracks} onAddClick={addClickHandlrer}/>
            <div>

            </div>
          </div>
        </div>
      </div>
  );
}

export default App;
