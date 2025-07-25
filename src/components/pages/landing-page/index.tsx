import { useState, useEffect } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { createActor } from '../../../declarations/backend';
import { canisterId } from '../../../declarations/backend';
import type { _SERVICE } from '../../../declarations/backend/backend.did';
import { HttpAgent } from '@dfinity/agent';

import Landing from './landing';
import Highlight from './highlight-feature';
import Features from './all-features';
import FQA from './fqa';

import Dashboard from '../dashboard';

import ScrollToTopButton from '../../ui/scroll-to-top-button';

const network = process.env.DFX_NETWORK;
const identityProvider =
  network === 'ic'
    ? 'https://identity.ic0.app'
    : 'http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943';

export default function LandingPage() {
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
    <>
      {!isAuthenticated ? (
        <>
          <Landing login={login} />
          <Highlight />
          <Features />
          <FQA />

          <ScrollToTopButton />
        </>
      ) : (<Dashboard logout={logout} />)}
    </>
  )
}
