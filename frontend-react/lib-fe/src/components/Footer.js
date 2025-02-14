import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white text-center py-4 mt-auto" style={{minHeight: '10vh'}}>
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Library Management System.  All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;