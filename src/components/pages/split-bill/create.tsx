import MainLayout from '../../layout/MainLayout';
import BoxPencil from '../../../assets/box-pencil.png';
import Box from '../../../assets/box.png';

export default function reate() {
  return (
    <MainLayout>
      <div className="grid grid-cols-1 md:grid-cols-2  h-screen w-full place-items-center">
        <div
          className="w-150 flex flex-col h-150 bg-[linear-gradient(224deg,_#BA2685_-2.35%,_#54113C_96.44%)] shadow-lg"
          style={{
            clipPath:
              'polygon(200px 0%, 150% 0%, 150% 150%, 0% 150%, 0% 200px)',
          }}
        >
          <img
            src={BoxPencil}
            alt="Box Pencil"
            className="w-1/2 h-1/2 mr-10 mt-20 self-end"
          />
          <h2 className="ml-10 mt-10 text-5xl text-white text-start">INPUT</h2>
          <h2 className="ml-10 mt-3 text-5xl text-white text-start">
            TOTAL AMOUNT
          </h2>
        </div>
        <div
          className="w-150 flex flex-col h-150 bg-[#BA2685] shadow-lg"
          style={{
            clipPath:
              'polygon(200px 0%, 150% 0%, 150% 150%, 0% 150%, 0% 200px)',
          }}
        >
          <img
            src={Box}
            alt="Box"
            className="w-1/2 h-1/2 mr-10 mt-20 self-end"
          />
          <h2 className="ml-10 mt-10 text-5xl text-white text-start">INPUT</h2>
          <h2 className="ml-10 mt-3 text-5xl text-white text-start">
            AMOUNT ITEM
          </h2>
        </div>
      </div>
    </MainLayout>
  );
}
