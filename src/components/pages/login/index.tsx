import React, { useState, useEffect } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { createActor } from '../../../declarations/backend';
import { canisterId } from '../../../declarations/backend';
import type { _SERVICE } from '../../../declarations/backend/backend.did';
import { HttpAgent } from '@dfinity/agent';

import PatternBg from '../../../assets/bg-w-pattern.png';
import Logo from '../../../assets/logo-poolit-text.png';

const network = process.env.DFX_NETWORK;
const identityProvider =
  network === 'ic'
    ? 'https://identity.ic0.app'
    : 'http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943';

const Login: React.FC = () => {
  const [authClient, setAuthClient] = useState<AuthClient | null>(null);
  const [actor, setActor] = useState<import('@dfinity/agent').ActorSubclass<_SERVICE> | null>(null);
  const [principal, setPrincipal] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [inputName, setInputName] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const authClient = await AuthClient.create();
    const identity = authClient.getIdentity();
    const agent = new HttpAgent({ identity });

    if (network !== 'ic') await agent.fetchRootKey();

    const actor = createActor(canisterId, { agent });
    const isAuthenticated = await authClient.isAuthenticated();

    setAuthClient(authClient);
    setActor(actor);
    setIsAuthenticated(isAuthenticated);

    if (isAuthenticated) {
      const principal = identity.getPrincipal().toString();
      setPrincipal(principal);
      try {
        const uname = await actor.getMyUsername();
        if (uname) setUsername(uname[0] ?? null);
      } catch (err) {
        console.error('getMyUsername failed:', err);
      }
    }
  };

  const login = async () => {
    await authClient?.login({
      identityProvider,
      onSuccess: init,
    });
  };

  const logout = async () => {
    await authClient?.logout();
    setIsAuthenticated(false);
    setActor(null);
    setPrincipal(null);
    setUsername(null);
  };

  const saveUsername = async () => {
    if (!actor) return;
    try {
      const res = await actor.setUsername(inputName);
      console.log(res);
      setUsername(inputName);
    } catch (err) {
      console.error('setUsername failed:', err);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#54113C] to-[#BA2685] bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${PatternBg})` }}
    >
      <img src={Logo} alt="Poolit Logo" className="w-60 mb-12" />

      {!isAuthenticated ? (
        <button
          onClick={login}
          className="text-white bg-white/20 px-6 py-3 rounded-md border border-white hover:bg-white/30 transition"
        >
          Login with Internet Identity
        </button>
      ) : (
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
      )}
    </div>
  );
};

export default Login;
