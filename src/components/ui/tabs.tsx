import React, { useState } from 'react';

type TabItem = {
  title: string;
  content: React.ReactNode;
};

type TabsProps = {
  tabs: TabItem[];
};

export default function Tabs({ tabs }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full">
      {/* Tab Titles */}
      <div className="flex p-4 border-2 rounded-lg border-pink-600 justify-between">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-1/2 rounded-md text-center px-4 py-2 text-sm font-medium transition-colors duration-300 ${
              index === activeIndex
                ? 'bg-pink-600 text-white'
                : 'bg-transparent text-pink-600'
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Active Tab Content */}
      <div className="mt-6 bg-transparent">
        {tabs[activeIndex].content}
      </div>
    </div>
  );
}
