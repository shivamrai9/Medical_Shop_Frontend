import React from "react";
import { IoClose } from "react-icons/io5";

const ConfirmBox = ({ cancel, confirm, close }) => {
  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 z-50 bg-neutral-800 bg-opacity-70 p-4 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 w-full max-w-md p-4 rounded">
        <div className="flex justify-between items-center gap-3">
          <h1 className="font-semibold text-black dark:text-white">
            Permanent Delete
          </h1>
          <button onClick={close} className="text-black dark:text-white">
            <IoClose size={25} />
          </button>
        </div>
        <p className="my-4 text-black dark:text-white">
          Are you sure you want to permanently delete this?
        </p>
        <div className="w-fit ml-auto flex items-center gap-3">
          <button
            onClick={cancel}
            className="px-4 py-1 border rounded border-red-500 text-red-500 hover:bg-red-500 hover:text-white dark:border-red-600 dark:text-red-600 dark:hover:bg-red-600 dark:hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={confirm}
            className="px-4 py-1 border rounded border-green-600 text-green-600 hover:bg-green-600 hover:text-white dark:border-green-600 dark:text-green-600 dark:hover:bg-green-600 dark:hover:text-white"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBox;
