import React from 'react';
import Sidebar from '../ui/sidebar';
import Topbar from '../ui/topbar';
import PatternBg from '../../assets/bg-pattern.png';

export default function MainLayout({
  children, logout
}: {
  children: React.ReactNode; logout: () => void;
}) {
  return (
    <div
      className="flex flex-row w-full h-screen bg-white bg-repeat"
      style={{
        backgroundImage: `url(${PatternBg})`,
      }}
    >
      <div className="flex-1">
        <Sidebar logout={logout} />
      </div>
      <div className="flex-5 min-h-screen flex flex-col overflow-hidden bg-transparent">
        <Topbar />
        <div className="flex-1 overflow-y-auto pt-16 ps-6 pb-6">
          {children}
        </div>
      </div>
    </div>
  );
}
