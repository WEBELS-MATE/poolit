import Feature1 from '../../../assets/feature-1.png';
import Feature2 from '../../../assets/feature-1.png';
import Feature3 from '../../../assets/feature-1.png';

export default function AllFeatures() {
  return (
    <div id='features' className="snap-start min-h-screen flex flex-col gap-16 py-24 items-center">
      <div style={{ fontFamily: 'Namco Regular' }}>
        <h3 className="text-2xl text-[#505050]">all majority</h3>
        <h3 className="text-2xl text-[#BA2685]">features</h3>
      </div>
      <div className="flex justify-around gap-12">
        <img src={Feature1} className="w-72" alt="input-amount" />
        <img src={Feature2} className="w-72" alt="input-item" />
        <img src={Feature3} className="w-72" alt="icp-wallet" />
      </div>
    </div>
  )
};
