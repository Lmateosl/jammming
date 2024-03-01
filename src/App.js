import './App.css';
import React, { useState } from 'react';
import Bar from './components/Bar';
import SearchBar from './components/SearchBar';
import { get } from './HttpRequests';

function App() {

  const [tracks, setTracks] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  const searchChangeHandler = ({target}) => setSearchInput(target.value);

  const submitHandler = async() => {
    const response = await get(searchInput);
    console.log(response);
    setTracks(response);
  }

  return (
      <div id="contenedorApp">
        <div id="componentes">
          <Bar />
          <SearchBar onChangeSearch={searchChangeHandler} onClickButon={submitHandler}/>
        </div>
      </div>
  );
}

export default App;
