import Laptop from '../../../assets/laptop.png';
import Phones from '../../../assets/phones.png';
import Frame from '../../../assets/corner-frame.png';

export default function HighlightFeature() {
  return (
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
  )
};
