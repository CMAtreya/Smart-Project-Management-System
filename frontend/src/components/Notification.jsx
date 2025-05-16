import React from 'react';
import { toast } from 'react-toastify';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaExclamationTriangle } from 'react-icons/fa';

const Notification = {
  success: (message) => {
    toast.success(
      <div className="flex items-center">
        <FaCheckCircle className="text-green-500 mr-2" />
        <span>{message}</span>
      </div>,
      {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: 'bg-white dark:bg-gray-800 dark:text-white',
      }
    );
  },

  error: (message) => {
    toast.error(
      <div className="flex items-center">
        <FaExclamationCircle className="text-red-500 mr-2" />
        <span>{message}</span>
      </div>,
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: 'bg-white dark:bg-gray-800 dark:text-white',
      }
    );
  },

  info: (message) => {
    toast.info(
      <div className="flex items-center">
        <FaInfoCircle className="text-blue-500 mr-2" />
        <span>{message}</span>
      </div>,
      {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: 'bg-white dark:bg-gray-800 dark:text-white',
      }
    );
  },

  warning: (message) => {
    toast.warning(
      <div className="flex items-center">
        <FaExclamationTriangle className="text-yellow-500 mr-2" />
        <span>{message}</span>
      </div>,
      {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: 'bg-white dark:bg-gray-800 dark:text-white',
      }
    );
  },

  // Custom notification with icon
  custom: (message, { icon, type = 'default', duration = 3000 }) => {
    toast(
      <div className="flex items-center">
        {icon && <span className="mr-2">{icon}</span>}
        <span>{message}</span>
      </div>,
      {
        position: "top-right",
        autoClose: duration,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type,
        className: 'bg-white dark:bg-gray-800 dark:text-white',
      }
    );
  },

  // Promise handling notification
  promise: (promise, { pending, success, error }) => {
    return toast.promise(
      promise,
      {
        pending: {
          render() {
            return (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-500 mr-2"></div>
                <span>{pending}</span>
              </div>
            );
          },
        },
        success: {
          render({ data }) {
            return (
              <div className="flex items-center">
                <FaCheckCircle className="text-green-500 mr-2" />
                <span>{typeof success === 'function' ? success(data) : success}</span>
              </div>
            );
          },
        },
        error: {
          render({ data }) {
            return (
              <div className="flex items-center">
                <FaExclamationCircle className="text-red-500 mr-2" />
                <span>{typeof error === 'function' ? error(data) : error}</span>
              </div>
            );
          },
        },
      },
      {
        className: 'bg-white dark:bg-gray-800 dark:text-white',
      }
    );
  },
};

export default Notification;