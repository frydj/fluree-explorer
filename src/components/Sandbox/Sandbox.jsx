import Editor from '@monaco-editor/react';
import Tabs from './Tabs';
import TabbedEditor from './TabbedEditor';
import React, { useState, useEffect } from 'react';
// import Button from './Button';
import Button from '../Button/Button';
// import useFluree from '../../../components/flureedb/useFluree';
import { useFlureeContext } from '../../flureedb/FlureeContext';
import './Sandbox.css';

let otherTabs = [
  { title: 'Results', active: true, value: 'hello', index: 0 },
  { title: 'History', active: false, value: 'hi', index: 1 },
];

const DBStatus = ({ stagedT, committedT }) => {
  return <div id="db-status">commits: {Math.abs(committedT) || 0}</div>;
};

const circularReplacer = () => {
  const seen = new WeakSet();

  return (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

const Sandbox = () => {
  // const commitSha = '42c4c4952ad227050fb409f8bc6d5b6a6b67aca6';
  // ('@fluree/flureedb build from fluree/db commit', commitSha)
  const { conn, ledger, stagedDb, committedDb, stage, commit, query } =
    useFlureeContext();

  const [value, setValue] = useState('');
  const [results, setResults] = useState('// results will show here...');
  const [sec, setSec] = useState(otherTabs);
  const [title, setTitle] = useState('Results');
  const [isQuery, setIsQuery] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const submitEntry = (e) => {
    if (e.keyCode === 120) {
      console.log(e);
      console.log('f9?');
      document.getElementById('dynamic-button').click();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', submitEntry);
    return function cleanUp() {
      window.removeEventListener('keydown', submitEntry);
    };
  }, []);

  useEffect(() => {
    if (value) {
      try {
        let obj = JSON.parse(value);
        // lets determine whether query or transaction...
        let keys = Object.keys(obj);
        let troof = ['select', 'where', 'from', 't', 'opts'];
        let isQueryKey = keys.every(function (e) {
          return troof.indexOf(e) > -1;
        });
        setIsQuery(isQueryKey);
        setIsValid(true);
      } catch (err) {
        setIsValid(false);
      }
    } else {
      setIsValid(false);
    }
  }, [value]);

  const handleCommit = async () => {
    let newStaged;
    if (value) {
      // staging
      newStaged = await stage(ledger, value);
    }

    if (ledger) {
      const r = await commit(conn, newStaged ?? stagedDb);
      if (r) {
        setResults(
          JSON.stringify(
            { ...r.commit.data, time: r.commit.time },
            circularReplacer(),
            2
          )
        );
      }
    }
  };

  const handleQueryCommitted = async () => {
    if (committedDb) {
      if (ledger) {
        const r = await query(committedDb, value);
        if (r) setResults(JSON.stringify(r, null, 2));
      }
    }
  };

  return (
    <div className="m-8" id="arbitrary-container">
      <div id="input-results" className="grid grid-cols-2 gap-2 m-2">
        {/* input */}
        <div id="input" className="rounded">
          <span className="tab-header">
            <span>Fluree Sandbox</span>
            <DBStatus stagedT={stagedDb?.t} committedT={committedDb?.t} />
          </span>
          <div className="p-2 flex flex space-x-1" id="button-container">
            {isQuery && (
              <Button
                id="transact-button"
                title="transact"
                onClick={handleCommit}
                disabled={!isValid}
                icon={false}
              >
                ⚡
              </Button>
            )}

            <Button
              id="dynamic-button"
              onClick={isQuery ? handleQueryCommitted : handleCommit}
              disabled={!isValid}
              icon={false}
            >
              {isQuery ? 'query' : 'transact'}
            </Button>
          </div>

          <TabbedEditor value={value} setValue={setValue} />
        </div>
        <div id="results" className="rounded">
          {/* results */}
          <span className="uppercase text-sm font-bold p-2 flex">{title}</span>
          <Tabs
            tabs={sec}
            setNew={setSec}
            value={results}
            setValue={setResults}
            setTitle={setTitle}
          >
            <div className="h-80 bg-gray-100">
              <Editor
                value={results}
                language="json"
                options={{
                  automaticLayout: true,
                  readOnly: true,
                }}
              />
            </div>
            <div id="history-container">[ todo: history ]</div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Sandbox;
