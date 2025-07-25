import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import Landing from './landing';
import Highlight from './highlight-feature';
import Features from './all-features';
import FQA from './fqa';

import ScrollToTopButton from '../../ui/scroll-to-top-button';

export default function LandingPage() {
  const { isAuthenticated, username } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      if (username && username.length > 0) {
        navigate("/dashboard");
      } else {
        navigate("/set-username");
      }
    }
  }, [isAuthenticated, username]);

  return (
    <>
      <Landing />
      <Highlight />
      <Features />
      <FQA />
      <ScrollToTopButton />
    </>
  );
}
