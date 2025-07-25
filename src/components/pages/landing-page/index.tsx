import Landing from './landing';
import Highlight from './highlight-feature';
import Features from './all-features';
import FQA from './fqa';

import ScrollToTopButton from '../../ui/scroll-to-top-button';

export default function LandingPage() {
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
