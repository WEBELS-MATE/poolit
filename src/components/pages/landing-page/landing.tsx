import { animateScroll as scroll } from 'react-scroll';

import Pattern from '../../../assets/pattern-1.png';
import Poolit from '../../../assets/poolit-typography.png';
import Mouse from '../../../assets/mouse.png';
import GetStartedButton from '../../ui/get-started-button'



export default function Landing({ login }: { login: () => void }) {
  return (
    <div id='landing' className="snap-startrelative min-h-screen flex items-center justify-center bg-gradient-to-l from-[#BA2685] to-[#54113C]">
      <img
        src={Pattern}
        alt="pattern"
        className="select-none absolute inset-0 w-full h-full object-cover z-0 opacity-30"
      />

      <div className="relative flex flex-col gap-10 z-10 text-white text-lg max-w-3xl items-center text-center px-4">
        <img src={Poolit} className='w-1/2 select-none' alt="poolit" />
        <h3 className='select-none w-3/4'>
          Poolit addresses the lack of open and decentralized crowdfunding by enabling trustless fundraising with Bitcoin (ckBTC) on the Internet Computer, eliminating borders, middlemen, and high fees
        </h3>

        <GetStartedButton login={login}>
          Get Started
        </GetStartedButton>

        <img src={Mouse} className='select-none cursor-pointer w-8 mt-4' alt="mouse" onClick={() => scroll.scrollToBottom({ duration: 3000, smooth: true })} />
      </div>
    </div>
  )
};
