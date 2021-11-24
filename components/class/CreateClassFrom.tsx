import React, { useState, FC, useEffect, useRef } from "react";
import classApi from "../../api/classes";

interface CreateClassFormProps {
  closeModal: () => void;
  createClass: () => void;
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

const CreateClassForm: FC<CreateClassFormProps> = ({ closeModal, createClass }) => {
  const wrapperRef = useRef(null);
  useOutsideCollapse(wrapperRef, closeModal);

  const [classInfo, setClassInfo] = useState({
    name: "",
    subject: "",
  });

  const [classNameError, setClassNameError] = useState("");

  const onCloseModal = () => {
    closeModal();
  };

  const validateForm = () => {
    let valid = true;

    if (classInfo.name.length == 0) {
      setClassNameError("Please input your class name");
      valid = false;
    }
    return valid;
  };

  const onCreateClass = async () => {
    console.log(classInfo);
    if (validateForm()) {
      setClassNameError("");
      closeModal();

      try{
        const data = await classApi.createClass(classInfo);
        createClass();
      }catch(error){
        console.log(error);
      }

    }
  };

  const onClassNameChange = (e: any) => {
    const { name, value } = e.target;
    setClassInfo({ ...classInfo, [name]: value });
    //value.length == 0 ? setClassNameError("Please input your class name") : setClassNameError("");
  };

  const onClassSubjectChange = (e: any) => {
    const { name, value } = e.target;
    setClassInfo({ ...classInfo, [name]: value });

  };

  return (
    <div className="overflow-x-hidden overflow-y-auto fixed inset-0 ">
      <div className="max-w-lg relative mx-auto mt-24 bg-gray-400 z-50">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          ref={wrapperRef}
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Class Name <span className="text-red-700">*</span>
            </label>
            {classNameError == "" ? (
              <input
                className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="classname"
                name="name"
                type="text" 
                placeholder="Class Name"
                onChange={onClassNameChange}
              />
            ) : (
              <>
              <input
                className="shadow appearance-none border border-red-600 rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="classname"
                name="name"
                type="text"
                placeholder="Class Name"
                onChange={onClassNameChange}
              />
              <p className="text-xs m-1 text-red-600">{classNameError}</p>
              </>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Subject
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="subject"
              type="text"
              name="subject"
              placeholder="Subject"
              onChange={onClassSubjectChange}
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
              onClick={onCreateClass}
            >
              Create
            </button>
          </div>
        </form>
      </div>
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 overflow-y-auto h-full w-full"></div>
    </div>
  );
};

export default CreateClassForm;
