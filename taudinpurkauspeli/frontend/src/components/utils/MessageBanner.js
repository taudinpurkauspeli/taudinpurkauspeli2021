/* eslint-disable no-undef */
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MessageBanner = () => (
  <ToastContainer
    position="top-center"
    autoClose={3000}
    hideProgressBar
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss={false}
    draggable={false}
    pauseOnHover
  />
);

export const setError = (message) => {
  toast.error(message, {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
  });
};

export const setSuccess = (message) => {
  toast.success(message, {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
  });
};

export default MessageBanner;
