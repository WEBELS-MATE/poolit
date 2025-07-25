import React from 'react';
import Sidebar from '../ui/sidebar';
import Topbar from '../ui/topbar';
import PatternBg from '../../assets/bg-pattern.png';

import { useAuth } from '../../context/AuthContext';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logout } = useAuth();

  return (
    <div
      className="flex flex-row w-full h-screen bg-white bg-repeat"
      style={{
        backgroundImage: `url(${PatternBg})`,
      }}
    >
      <div className="flex-1">
        {/* Tetep sama, tapi 'logout' di sini asalnya dari useAuth(), bukan dari props lagi */}
        <Sidebar logout={logout} />
      </div>
      <div className="flex-5 min-h-screen flex flex-col overflow-hidden bg-transparent">
        <Topbar />
        <div className="flex-1 overflow-y-auto pt-16 ps-6 pb-6">{children}</div>
      </div>
    </div>
  );
}
