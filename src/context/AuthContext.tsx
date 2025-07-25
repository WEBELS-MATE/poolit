// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { createActor } from '../declarations/backend';
import { canisterId } from '../declarations/backend';
import type { _SERVICE } from '../declarations/backend/backend.did';
import { HttpAgent, ActorSubclass } from '@dfinity/agent';

const network = process.env.DFX_NETWORK;
const identityProvider =
  network === 'ic'
    ? 'https://identity.ic0.app'
    : 'http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943';

type AuthContextType = {
  authClient: AuthClient | null;
  actor: ActorSubclass<_SERVICE> | null;
  principal: string | null;
  username: string | null;
  inputName: string;
  isAuthenticated: boolean;
  setInputName: (name: string) => void;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  saveUsername: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authClient, setAuthClient] = useState<AuthClient | null>(null);
  const [actor, setActor] = useState<ActorSubclass<_SERVICE> | null>(null);
  const [principal, setPrincipal] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [inputName, setInputName] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const client = await AuthClient.create();
    const identity = client.getIdentity();
    const agent = new HttpAgent({ identity });

    if (network !== 'ic') {
      await agent.fetchRootKey();
    }

    const newActor = createActor(canisterId, { agent });
    const auth = await client.isAuthenticated();

    setAuthClient(client);
    setActor(newActor);
    setIsAuthenticated(auth);

    if (auth) {
      const userPrincipal = identity.getPrincipal().toString();
      setPrincipal(userPrincipal);

      try {
        const uname = await newActor.getMyUsername();
        if (uname) setUsername(uname[0] ?? null);
      } catch (err) {
        console.error('getMyUsername failed:', err);
      }

      console.log("redirect to /dashboard");
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

    window.location.href = "/";
    console.log("redirect to /");

  };

  const saveUsername = async () => {
    if (!actor) return;
    try {
      await actor.setUsername(inputName);
      setUsername(inputName);

      window.location.href = "/dashboard";
      console.log("redirect to /dashboard");
    } catch (err) {
      console.error('setUsername failed:', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authClient,
        actor,
        principal,
        username,
        inputName,
        isAuthenticated,
        setInputName,
        login,
        logout,
        saveUsername,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
