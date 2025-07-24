import React from 'react';
import { useNavigate } from 'react-router-dom';

interface GetStartedButtonProps {
  children: React.ReactNode;
  className?: string;
}

const GetStartedButton: React.FC<GetStartedButtonProps> = ({ children, className }) => {
  const navigate = useNavigate();
  const clipPathStyle = {
    clipPath: 'polygon(15px 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 0 100%, 0 15px)',
  };

  return (
    <button
      onClick={() => navigate('/login')}
      className={`relative w-1/3 select-none cursor-pointer h-16 text-white hover:text-white font-semibold text-lg group ${className}`}
    >
      <span
        className="absolute inset-0 bg-white"
        style={clipPathStyle}
      ></span>

      <span
        className="absolute inset-[2px] bg-gradient-to-l from-[#BA2685] to-[#54113C] group-hover:bg-[#BA2685] group-hover:bg-opacity-10 transition-colors duration-300"
        style={clipPathStyle}
      ></span>

      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default GetStartedButton;