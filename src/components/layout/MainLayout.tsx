import React from 'react';
import Sidebar from '../ui/sidebar';

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
      <div className="flex-5 overflow-y-auto">{children}</div>
    </div>
  );
}
