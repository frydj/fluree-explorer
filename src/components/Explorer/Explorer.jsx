import React, { useRef, useState } from 'react';
import './Explorer.css';

const Explorer = (data) => {
  const [url, setUrl] = useState('https://flur.ee');
  const searchBar = useRef();

  const bookmarks = [
    {
      title: 'cheesecake1',
      displayUrl: 'https://sugarspunrun.com/best-cheesecake-recipe/',
      url: 'http://10.11.254.36:8000/',
    },

    {
      title: 'livenation',
      displayUrl:
        'https://www.livenation.com/venue/KovZpZAJIedA/the-ritz-events',
      url: 'http://10.11.254.36:8001/',
    },

    {
      title: 'chili',
      displayUrl: 'https://www.halfbakedharvest.com/chipotle-bean-chili/',
      url: 'http://10.11.254.36:8002/',
    },

    {
      title: 'cheesecake2',
      displayUrl:
        'https://www.kingarthurbaking.com/recipes/easy-cheesecake-recipe',
      url: 'http://10.11.254.36:8003/',
    },

    {
      title: 'neuromancer',
      displayUrl: 'https://www.goodreads.com/book/show/6088007-neuromancer',
      url: 'http://10.11.254.36:8004/',
    },

    {
      title: 'ticketmaster',
      displayUrl:
        'https://www.ticketmaster.com/dancing-with-the-stars-tickets/artist/1086116?site=10085&pageType=178234&nativePromo=3389&slot=2&campaign=732282&flight=306820411&nativeId=316093031&ac_link=NTM_DWTS2023_spotlight_3',
      url: 'http://10.11.254.36:8005/',
    },
  ];

  const navigate = (e) => {
    let address = searchBar.current.value;
    if (address.indexOf('://') === -1) {
      address = 'https://' + address;
      setSearchBar(address);
    }
    setUrl(address);
    e.target.blur();
  };

  const goToFavorite = (bookmark) => {
    console.log(bookmark);
    searchBar.current.value = bookmark.displayUrl;
    setUrl(bookmark.url);
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
          defaultValue={url}
        />
      </div>
      <div id="bookmarks-container">
        {bookmarks.map((p, i) => (
          <div className="bookmark" key={i} onClick={() => goToFavorite(p)}>
            {p.title}
          </div>
        ))}
      </div>
      <iframe src={url} title="fluree-explorer-window"></iframe>
    </div>
  );
};

export default Explorer;
