import React, { Children, useState, useEffect } from 'react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Tabs = ({ tabs, setNew, value, setValue, setTitle, children }) => {
  const [index, setIndex] = useState(0);

  const arrayChildren = Children.toArray(children);

  useEffect(() => {}, [tabs]);

  useEffect(() => {
    const arr = [...tabs];
    for (const i in arr) {
      if (arr[i].active) {
        setTab(arr[i]);
      }
    }
  }, []);

  const setTab = (tab) => {
    setIndex(tab.index);
    setTitle(tab.title);

    let arr = [...tabs];

    // track the value based on what has changed
    for (const i in arr) {
      if (arr[i].active) {
        arr[i].value = value;
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
      <div className="tab-container">
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
      {arrayChildren[index]}
    </>
  );
};

export default Tabs;
