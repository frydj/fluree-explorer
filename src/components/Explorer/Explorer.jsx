import React, { useRef, useState, useEffect } from 'react';
import './Explorer.css';

const Explorer = (props) => {
  // const [url, setUrl] = useState('https://flur.ee');
  const [url, setUrl] = useState('sites/cheesecake.html');

  const searchBar = useRef();

  const bookmarks = [
    {
      title: 'cheesecake1',
      displayUrl: 'https://sugarspunrun.com/best-cheesecake-recipe/',
      url: 'sites/cheesecake.html',
    },

    {
      title: 'livenation',
      displayUrl:
        'https://www.livenation.com/venue/KovZpZAJIedA/the-ritz-events',
      url: 'sites/livenation.html',
    },

    {
      title: 'chili',
      displayUrl: 'https://www.halfbakedharvest.com/chipotle-bean-chili/',
      url: 'sites/chili.html',
    },

    {
      title: 'cheesecake2',
      displayUrl:
        'https://www.kingarthurbaking.com/recipes/easy-cheesecake-recipe',
      url: 'sites/cheesecake2.html',
    },

    {
      title: 'neuromancer',
      displayUrl: 'https://www.goodreads.com/book/show/6088007-neuromancer',
      url: 'sites/neuromancer.html',
    },

    {
      title: 'ticketmaster',
      displayUrl:
        'https://www.ticketmaster.com/dancing-with-the-stars-tickets/artist/1086116?site=10085&pageType=178234&nativePromo=3389&slot=2&campaign=732282&flight=306820411&nativeId=316093031&ac_link=NTM_DWTS2023_spotlight_3',
      url: 'sites/ticketmaster.html',
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
          defaultValue={'https://sugarspunrun.com/best-cheesecake-recipe/'}
        />
      </div>
      <div id="bookmarks-container">
        {bookmarks.map((p, i) => (
          <div className="bookmark" key={i} onClick={() => goToFavorite(p)}>
            {p.title}
          </div>
        ))}
      </div>
      <iframe
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        src={url}
        title="fluree-explorer-window"
      ></iframe>
    </div>
  );
};

export default Explorer;
