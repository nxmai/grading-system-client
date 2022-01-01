// https://headlessui.dev/react/dialog

import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import * as React from 'react';
import Button from 'components/Button';
import { XIcon, RefreshIcon } from '@heroicons/react/solid';

type ModalProps = {
  children: React.ReactNode;
  open: boolean;
  onSubmit: () => void;
  onClose: () => void;
  isProcess?: boolean;
  options: ModalOptions;
};

export type ModalOptions = {
  title: React.ReactNode;
  submitText: React.ReactNode;
};

export default function Modal({
  children,
  open,
  onSubmit,
  onClose,
  isProcess = false,
  options: { title, submitText },
}: ModalProps) {

  return (
    <Transition.Root show={open} as={React.Fragment}>
      <Dialog
        as='div'
        static
        className='fixed inset-0 z-40 overflow-y-auto'
        open={open}
        onClose={(_) => onClose()}
      >
        <div className='flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0'>
          <Transition.Child
            as={React.Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 transition-opacity bg-gray-900 bg-opacity-75' />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className='hidden sm:inline-block sm:align-middle sm:h-screen'
            aria-hidden='true'
          >
            &#8203;
          </span>
          <Transition.Child
            as={React.Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div
              className={clsx(
                'z-auto inline-block w-full px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl',
                'sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6'
              )}
            >
              <div className='absolute top-0 right-0 hidden pt-4 pr-4 sm:block '>
                <button
                  type='button'
                  className={clsx(
                    'text-gray-400 bg-white rounded-md hover:text-gray-500',
                    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400',
                    'disabled:filter disabled:brightness-90 disabled:cursor-wait'
                  )}
                  onClick={onClose}
                >
                  <span className='sr-only'>Close</span>
                  <XIcon
                    className="h-6 w-6 text-blue-500 focus:text-blue-800 hover:text-blue-600 cursor-pointer" />
                </button>
              </div>
              <div className='sm:flex sm:items-start'>
                <div className='mt-2 text-center sm:mt-0 sm:ml-4 sm:text-left w-full mr-4'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900'
                  >
                    {title}
                  </Dialog.Title>
                  <div className='mt-2'>
                    {children}
                  </div>
                </div>
              </div>
              <div className='mt-5 sm:mt-4 sm:flex sm:flex-row-reverse'>
                <Button
                type='button'
                variants='primary'
                  onClick={onSubmit}
                  className={clsx(
                    '!font-medium sm:ml-3 w-full sm:w-auto sm:text-sm text-black'
                  )}
                >
                  {
                    !isProcess ? submitText : <RefreshIcon className="animate-spin h-5 w-5 rounded-full" />
                  }
                </Button>
                <Button
                  type='button'
                  variants='secondary'
                  onClick={onClose}
                  className='!font-medium mt-3 w-full sm:mt-0 sm:w-auto sm:text-sm'
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
