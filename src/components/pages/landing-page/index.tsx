import Pattern from '../../../assets/pattern-1.png';
import Poolit from '../../../assets/poolit-typography.png';
import Mouse from '../../../assets/mouse.png';
import Laptop from '../../../assets/laptop.png';
import Phones from '../../../assets/phones.png';
import Frame from '../../../assets/corner-frame.png';
import GetStartedButton from '../../ui/get-started-button'

export default function Landing() {
  return (
    <>
      {/* Landing */}
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-l from-[#BA2685] to-[#54113C]">
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

          <GetStartedButton>
            Get Started
          </GetStartedButton>

          <a href='#highlight'>
            <img src={Mouse} className='select-none cursor-pointer w-8 mt-4' alt="mouse" /></a>
        </div>
      </div>

      {/* Highlight */}
      <div id='highlight' className="min-h-screen bg-white flex items-start justify-between relative" style={{ fontFamily: 'Namco Regular' }}>
        {/* Frame */}
        <img src={Frame} alt="corner frame" className="rotate-180 absolute top-10 left-40 w-48 select-none" />
        <img src={Frame} alt="corner frame" className="absolute bottom-10 right-40 w-48 select-none" />

        {/* Main */}
        <div className="flex h-screen py-8 px-48 flex-col w-full lg:flex-row gap-8">
          <div className="lg:w-3/4 flex flex-col items-center justify-end lg:items-start text-center lg:text-left">
            <img src={Laptop} alt="Feature on Laptop" className="absolute top-40 left-52 w-1/3 h-auto" />
            <p className="mt-8 mb-14 text-md font-bold text-[#505050]">
              lorem ipsum dolor sit amet<br />
              adipisicing elit xpedita id magni repellat
            </p>
          </div>

          <div className="lg:w-1/4 flex flex-col justify-start lg:items-end">
            <div className="text-right mb-8 mt-14">
              <h2 className="text-2xl font-extrabold text-[#505050]">easy</h2>
              <h1 className="text-2xl font-extrabold bg-gradient-to-r from-[#BA2685] to-[#F36BAB] bg-clip-text text-transparent">features</h1>
            </div>
            <img src={Phones} alt="Feature on Phones" className="absolute top-20 right-5 w-1/2 h-auto" />
          </div>
        </div>
      </div>

      
    </>
  );
}
