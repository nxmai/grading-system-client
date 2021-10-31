import React, { useState, FC, useEffect, useRef } from "react";

interface CreateClassFormProps {
  closeModal: () => void;
  // cancelCreateClassModal: () => void,
}

function useOutsideCollapse(ref: any, closeModal: any) {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        closeModal();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

const CreateClassForm: FC<CreateClassFormProps> = ({ closeModal }) => {
  const wrapperRef = useRef(null);
  useOutsideCollapse(wrapperRef, closeModal);

  const onCloseModal = () => {
    closeModal();
  };

  return (
    <div>
      <div className="fixed inset-0 bg-gray-700 bg-opacity-50 overflow-y-auto h-full w-full"></div>
      <div className="max-w-lg relative mx-auto mt-10 bg-gray-400">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          ref={wrapperRef}
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Class Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Class Name"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Subject
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Subject"
            />
          </div>
          <div className="flex items-center justify-end gap-4">
            <button
              className="hover:bg-gray-100 hover:text-blue-700 border duration-300 border-blue-700 text-blue-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={onCloseModal}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 border hover:bg-blue-700 duration-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateClassForm;
