import React, { useState, useEffect } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { createActor } from '../../../declarations/backend';
import { canisterId } from '../../../declarations/backend';
import type { _SERVICE } from '../../../declarations/backend/backend.did';
import { HttpAgent } from '@dfinity/agent';

const network = process.env.DFX_NETWORK;
const identityProvider =
  network === 'ic'
    ? 'https://identity.ic0.app'
    : 'http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943';

const Login: React.FC = () => {

  const [authClient, setAuthClient] = useState<AuthClient | null>(null);
  const [actor, setActor] = useState<
    import('@dfinity/agent').ActorSubclass<_SERVICE> | null
  >(null);
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

    if (network !== 'ic') {
      await agent.fetchRootKey();
    }

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
    <div style={{ padding: 24, fontFamily: 'Namco Regular' }}>
      <h1>internet identity ( ) Username</h1>

      {!isAuthenticated ? (
        <button onClick={login}>Login with Internet Identity</button>
      ) : (
        <>
          <button onClick={logout}>Logout</button>
          <div style={{ marginTop: 20 }}>
            <h3>Principal:</h3>
            <code>{principal}</code>

            <h3 style={{ marginTop: 20 }}>Your Username:</h3>
            <p>{username || 'No username set yet.'}</p>

            <input
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              placeholder="Set new username"
            />
            <button onClick={saveUsername} style={{ marginLeft: 10 }}>
              Save Username
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
