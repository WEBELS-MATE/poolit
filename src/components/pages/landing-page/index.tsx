import { useAuth } from '../../../context/AuthContext';

import Landing from './landing';
import Highlight from './highlight-feature';
import Features from './all-features';
import FQA from './fqa';

import Dashboard from '../dashboard';

import ScrollToTopButton from '../../ui/scroll-to-top-button';

export default function LandingPage() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {!isAuthenticated ? (
        <>
          <Landing />
          <Highlight />
          <Features />
          <FQA />

          <ScrollToTopButton />
        </>
      ) : (<Dashboard />)}
    </>
  )
}
