import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthClient } from '@dfinity/auth-client';
import { HttpAgent } from '@dfinity/agent';

import { createActor, canisterId } from '../declarations/backend';

const ProtectedRoute = ({ children }: React.PropsWithChildren<{}>) => {
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUsername = async () => {
      try {
        const authClient = await AuthClient.create();

        if (!(await authClient.isAuthenticated())) {
          setIsLoading(false);
          setIsProfileComplete(false);
          return;
        }

        const identity = authClient.getIdentity();
        const agent = new HttpAgent({ identity });

        if (process.env.DFX_NETWORK !== 'ic') {
          await agent.fetchRootKey().catch((err) => {
            console.warn(
              'Unable to fetch root key. Check to ensure that your local replica is running',
            );
            console.error(err);
          });
        }

        const backend = createActor(canisterId, { agent });

        const usernameResult = await backend.getMyUsername();

        if (usernameResult && usernameResult.length > 0) {
          setIsProfileComplete(true);
        } else {
          setIsProfileComplete(false);
        }
      } catch (error) {
        console.error('Failed check username on ProtectedRoute:', error);
        setIsProfileComplete(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkUsername();
  }, []);

  if (isLoading) {
    return <div>Checking account...</div>;
  }

  if (!isProfileComplete) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
