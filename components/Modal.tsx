import { Dialog, Transition } from '@headlessui/react';
import React, { FC, Fragment, ReactNode, useState } from 'react';

type ModalProps = {
  forceOpen: boolean;
  onClose: () => void;
  footer: () => ReactNode;
};

export const Modal: FC<ModalProps> = ({ children, forceOpen = false, onClose = () => {}, footer }) => {
  let [isOpen, setIsOpen] = useState(forceOpen);

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button type="button" onClick={openModal} aria-label="open modal">
        Open dialog
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform rounded-t-3xl overflow-hidden text-left align-middle shadow-xl transition-all">
                  <div className="rounded-3xl bg-white">{children}</div>
                  <nav className="relative bg-gray-50 rounded-3xl flex border-t divide-x overflow-hidden">
                    {typeof footer === 'function' && footer()}
                  </nav>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
