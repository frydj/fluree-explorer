import React, { useRef, useState } from 'react';
import './Explorer.css';

const Explorer = (data) => {
  const [url, setUrl] = useState('https://flur.ee');
  const searchBar = useRef();

  const navigate = (e) => {
    let address = searchBar.current.value;
    if (address.indexOf('://') === -1) {
      address = 'https://' + address;
      setSearchBar(address);
    }
    setUrl(address);
    e.target.blur();
  };

  const setSearchBar = (newValue) => {
    searchBar.current.value = newValue;
  };

  const selectContents = (e) => {
    e.target.select();
  };

  const checkKey = (e) => {
    if (e.key === 'Enter') {
      console.log('enter was pressed');
      navigate(e);
    }
  };

  return (
    <div id="explorer-container">
      <div id="search-bar-container">
        <input
          onKeyDown={checkKey}
          onFocus={selectContents}
          ref={searchBar}
          id="search-bar"
          autoFocus
        />
      </div>
      <iframe src={url} title="fluree-explorer-window"></iframe>
    </div>
  );
};

export default Explorer;
