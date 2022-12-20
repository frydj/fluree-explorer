import React, { useRef, useState } from 'react';

const Explorer = (data) => {
  const [url, setUrl] = useState('https://flur.ee');
  const searchBar = useRef();

  const navigate = () => {
    setUrl(searchBar.current.value);
  };

  const checkKey = (e) => {
    if (e.key === 'Enter') {
      console.log('enter was pressed');
      navigate();
    }
  };

  return (
    <div id="explorer-container">
      <div id="search-bar-container">
        <input onKeyDown={checkKey} ref={searchBar} id="search-bar" autoFocus />
      </div>
      <iframe src={url} title="fluree-explorer-window"></iframe>
    </div>
  );
};

export default Explorer;
