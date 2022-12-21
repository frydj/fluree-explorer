import React, { Fragment, useState, useEffect } from 'react';
import YetiWave from '../../assets/yeti-wave.png';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Tabs from '../Tabs/Tabs';
import Editor from '@monaco-editor/react';
import Button from '../Button/Button';
import { ChevronDoubleLeftIcon } from '@heroicons/react/24/outline';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css'; // optional for styling
import Sandbox from '../Sandbox/Sandbox';
import { useFlureeContext } from '../../flureedb/FlureeContext';
import DisplayResults from '../EntityViewer/DisplayResults'

import './Drawer.css';

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

const Drawer = ({ url }) => {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [jsonData, setJsonData] = useState('{}');
  const [value, setValue] = useState('asdf');
  const [results, setResults] = useState('asdf');
  const { conn, ledger, stagedDb, committedDb, stage, commit, query } =
    useFlureeContext();

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

  const updateValue = (val) => {
    setValue(val);
  };

  const detectJson = () => {
    const jsonLdElements = document
      .querySelector('iframe')
      .contentDocument.querySelectorAll('[type="application/ld+json"]');
    if (jsonLdElements.length > 0) {
      setJsonData(
        JSON.stringify(
          Array.from(jsonLdElements).map((scriptEl) => {
            let json = JSON.parse(scriptEl.innerHTML);
            if (json["@context"].startsWith("https")) {
              json["@context"] = json["@context"].replace("https", "http");
            }
            // json["feType"] = "entity";
            return json;
          }),
          null,
          1
          )
      );
    } else {
      setJsonData('// no json detected');
    }
  };

  const doNothing = () => {
    // nothing
  };

  const exposeDrawer = () => {
    setOpen(true);
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        detectJson();
      }, 200);
    }
  }, [open]);

  useEffect(() => {
    setValue(jsonData);
  }, [jsonData]);

  useEffect(() => {
    setTimeout(() => {
      tippy('#drawer-expand', {
        content: 'Toggle Drawer Expanded',
        delay: [500, null],
      });
    }, 200);
  }, [open]);

  return (
    <div id="fex-drawer-container">
      <div
        id="drawer-handle"
        className={open ? 'freddy-collapsed' : 'freddy-appear'}
      >
        <img src={YetiWave} onClick={exposeDrawer} alt="yeti" />
      </div>

      <div id="drawer-container">
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setOpen}>
            <div className="fixed inset-0" />

            <div className="fixed inset-0">
              <div className="absolute inset-0">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                  <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <Dialog.Panel
                      className={`pointer-events-auto w-screen fluree-drawer ${
                        expanded ? 'max-w-screen' : 'max-w-md'
                      }`}
                    >
                      <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl expand-contain">
                        <div
                          id="drawer-expand"
                          onClick={toggleExpand}
                          className={expanded ? 'drawer-expanded' : ''}
                        >
                          <ChevronDoubleLeftIcon />
                        </div>
                        <div className="px-4 sm:px-6">
                          <div className="flex items-start justify-between">
                            <Dialog.Title className="text-lg font-medium text-gray-900">
                              Fluree Explorer
                            </Dialog.Title>
                            <div className="ml-3 flex h-7 items-center">
                              <button
                                type="button"
                                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                onClick={() => setOpen(false)}
                              >
                                <span className="sr-only">Close panel</span>
                                <XMarkIcon
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="relative mt-6 flex-1 px-4 sm:px-6">
                          <div className="absolute inset-0 px-4 sm:px-6">
                            <Tabs>
                              <div className="tab-content" id="detected-json">
                                {/* <button onClick={detectJson}>Detect</button> */}
                                <div className="tab-header">
                                  <span>Found JSON:</span>
                                  <Button
                                    id="capture-detected"
                                    tooltip="Commit Data [F9]"
                                    onClick={handleCommit}
                                  >
                                    Capture
                                  </Button>
                                </div>
                                <Editor
                                  id="input-editor"
                                  value={jsonData}
                                  options={{ automaticLayout: true }}
                                  onChange={(value) => updateValue(value)}
                                  language="json"
                                />
                              </div>
                              <div className="tab-content" id="saved-json">
                                <DisplayResults data={results} />
                              </div>
                              <div className="tab-content" id="saved-json">
                                <Sandbox />
                              </div>
                            </Tabs>
                          </div>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </div>
  );
};

export default Drawer;
