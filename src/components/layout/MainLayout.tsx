import React from 'react';
import Sidebar from '../ui/sidebar';
import Topbar from '../ui/topbar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row w-full h-screen bg-gray-100">
      <div className='flex-1'>
        <Sidebar />
      </div>
      <div className="flex-5 flex flex-col overflow-hidden">
        <Topbar />
        <div className="flex-1 overflow-y-auto pt-16 px-6 pb-6">
          {children}
        </div>
      </div>
    </div>
  );
}
