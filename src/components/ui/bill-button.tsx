import React from 'react';

interface BillButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

const BillButton: React.FC<BillButtonProps> = ({ onClick, children, className }) => {
  const clipPathStyle = {
    clipPath: 'polygon(15px 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 0 100%, 0 15px)',
  };

  return (
    <button
      onClick={onClick}
      className={`relative w-full h-16 text-[#BA2685] hover:text-white font-semibold text-lg group ${className}`}
    >
      <span
        className="absolute inset-0 bg-[#BA2685]"
        style={clipPathStyle}
      ></span>

      <span
        className="absolute inset-[2px] bg-white group-hover:bg-[#BA2685] group-hover:bg-opacity-10 transition-colors duration-300"
        style={clipPathStyle}
      ></span>

      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default BillButton;