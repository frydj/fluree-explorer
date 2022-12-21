import React, { Children, useState, useEffect } from 'react';
import './Tabs.css';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css'; // optional for styling
import { magnifyIcon, historyIcon, puzzleIcon } from '../../assets/icons';

const initialTabs = [
  { name: magnifyIcon, current: true, index: 0 },
  { name: historyIcon, current: false, index: 1 },
  { name: puzzleIcon, current: false, index: 2 },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Tabs = ({ children }) => {
  const [tabs, setTabs] = useState(initialTabs);
  const [index, setIndex] = useState(0);

  const arrayChildren = Children.toArray(children);

  const changeTabs = (tab) => {
    console.log('change tabs was called');
    let arr = [...tabs];
    for (const i in arr) {
      if (arr[i] === tab) {
        arr[i].current = true;
        setIndex(arr[i].index);
      } else {
        arr[i].current = false;
      }
    }
    setTabs(arr);
  };

  useEffect(() => {
    tippy('#tab-0', {
      content: 'Detect JSON',
      delay: [500, null],
      offset: [0, -5],
    });

    tippy('#tab-1', {
      content: 'View Saved',
      delay: [500, null],
      offset: [0, -5],
    });

    tippy('#tab-2', {
      content: 'Transact/Query',
      delay: [500, null],
      offset: [0, -5],
    });
  }, []);

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          defaultValue={tabs.find((tab) => tab.current).name}
        >
          {tabs.map((tab) => (
            <option key={tab.index}>{tab.index}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav
          className="isolate flex divide-x divide-gray-200 rounded-lg shadow"
          aria-label="Tabs"
        >
          {tabs.map((tab, tabIdx) => (
            <a
              id={`tab-${tab.index}`}
              key={tabIdx}
              onClick={() => changeTabs(tab)}
              className={classNames(
                tab.current
                  ? 'text-gray-900'
                  : 'text-gray-500 hover:text-gray-700',
                tabIdx === 0 ? 'rounded-l-lg' : '',
                tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
                'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10 cursor-pointer'
              )}
              aria-current={tab.current ? 'page' : undefined}
            >
              <span className="flex justify-center">{tab.name}</span>
              <span
                aria-hidden="true"
                className={classNames(
                  tab.current ? 'bg-indigo-500' : 'bg-transparent',
                  'absolute inset-x-0 bottom-0 h-0.5'
                )}
              />
            </a>
          ))}
        </nav>
      </div>
      {arrayChildren[index]}
    </div>
  );
};

export default Tabs;
