import Editor from '@monaco-editor/react';
import React, { useState, useEffect } from 'react';

const query1 = `{
  "where": [
    [
      "?i",
      "rdf:type",
      "schema:Movie"
    ]
  ],
  "select": {
    "?i": [
      "*"
    ]
  }
}`;

const transaction1 = `{
  "@context": "https://schema.org",
  "@id": "https://www.wikidata.org/wiki/Q836821",
  "@type": [
    "Movie"
  ],
  "name": "The Hitchhiker's Guide to the Galaxy",
  "disambiguatingDescription": "2005 British-American comic science fiction film directed by Garth Jennings",
  "titleEIDR": "10.5240/B752-5B47-DBBE-E5D4-5A3F-N",
  "isBasedOn": {
    "@id": "https://www.wikidata.org/wiki/Q3107329",
    "@type": "Book",
    "name": "The Hitchhiker's Guide to the Galaxy",
    "isbn": "0-330-25864-8",
    "author": {
      "@id": "https://www.wikidata.org/wiki/Q42",
      "@type": "Person",
      "name": "Douglas Adams"
    }
  }
}`;

const transaction2 = `{
    "select": {"?s": ["*"]},
    "where": [["?s", "?p", "?o"]]
}`;

let initialTabs = [
  { title: 'Tab 1', active: true, value: transaction1 },
  { title: 'Tab 2', active: false, value: query1 },
  { title: 'Tab 3', active: false, value: transaction2 },
];
let tm;

const Tabs = ({ tabs, setNew, value, setValue, children }) => {
  useEffect(() => {
    const arr = [...tabs];
    for (const i in arr) {
      if (arr[i].active) {
        setTab(arr[i]);
      }
    }
  }, []);

  const setTab = (tab) => {
    setValue(tab.value);

    let arr = [...tabs];

    // track the value based on what has changed
    for (const i in arr) {
      if (arr[i].active) {
        if (value) {
          arr[i].value = value;
        }
        break;
      }
    }

    // set new active tab
    for (const i in arr) {
      if (arr[i] === tab) {
        arr[i].active = true;
      } else {
        arr[i].active = false;
      }
    }
    setNew(arr);
  };

  return (
    <>
      <div className="editor-tabs-container">
        {tabs.map((p, i) => (
          <div
            key={i}
            onClick={() => setTab(p)}
            className={p.active ? 'tab activeTab' : 'tab'}
          >
            {p.title}
          </div>
        ))}
      </div>
      {children}
    </>
  );
};

const TabbedEditor = ({ value, setValue }) => {
  const [tabs, setTabs] = useState([...initialTabs]);

  const ongoingSave = (value) => {
    setValue(value);
    clearTimeout(tm);
    tm = setTimeout(() => {
      let arr = [...tabs];
      // track the value based on what has changed
      for (const i in arr) {
        if (arr[i].active) {
          if (value) {
            arr[i].value = value;
          }
          break;
        }
      }

      setTabs(arr);
      console.log('ongoingsave...');
    }, 500);
  };

  return (
    <>
      <Tabs tabs={tabs} value={value} setNew={setTabs} setValue={setValue} />
      <div className="h-80 bg-white">
        <Editor
          id="input-editor"
          value={value}
          options={{ automaticLayout: true }}
          onChange={(value) => {
            ongoingSave(value);
          }}
          language="json"
        />
      </div>
    </>
  );
};

export default TabbedEditor;
