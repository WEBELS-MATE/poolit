import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

import PatternBg from '../../../assets/bg-w-pattern.png';
import Logo from '../../../assets/logo-poolit-text.png';

export default function SetUsername() {
  const { principal, username, inputName, setInputName, saveUsername, logout } = useAuth();
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#54113C] to-[#BA2685] bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${PatternBg})` }}
    >
      <img src={Logo} alt="Poolit Logo" className="w-60 mb-12" />


      <div className="w-full max-w-md text-center text-white">
        <div className="mb-8">
          <label htmlFor="username" className="block text-lg font-semibold mb-2" style={{ fontFamily: 'Namco Regular' }}>
            set username
          </label>
          <input
            id="username"
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            className="w-full px-4 py-3 rounded-md bg-white/20 border border-white text-white placeholder-white placeholder-opacity-60 focus:outline-none focus:ring-2 focus:ring-white"
            placeholder="Enter your username"
          />
        </div>

        <button
          onClick={saveUsername}
          className="w-full py-3 text-white font-semibold border-2 border-white relative before:absolute before:-top-2 before:right-0 before:border-t-8 before:border-l-8 before:border-transparent before:border-t-white before:content-[''] after:absolute after:bottom-0 after:-left-2 after:border-b-8 after:border-r-8 after:border-transparent after:border-b-white after:content-['']"
        >
          Save Username
        </button>

        <div className="mt-10 text-sm">
          <p>
            <strong>Principal:</strong>
            <br />
            <code>{principal}</code>
          </p>
          <p className="mt-4">
            <strong>Your username:</strong>{' '}
            {username ? username : <em>No username set yet.</em>}
          </p>

          <button
            onClick={logout}
            className="mt-6 px-4 py-2 border border-white hover:bg-white/20 rounded transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
