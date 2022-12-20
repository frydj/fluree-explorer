import React, { Fragment, useState, useEffect } from 'react';
import YetiWave from '../../assets/yeti-wave.png';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Tabs from '../Tabs/Tabs';
import './Drawer.css';

const Drawer = (props) => {
  const [open, setOpen] = useState(false);

  const exposeDrawer = () => {
    setOpen(true);
  };

  useEffect(() => {
    console.log(open);
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

            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
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
                    <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                      <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
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
                            <Tabs>{props.children}</Tabs>
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
