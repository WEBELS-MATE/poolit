import { useLocation } from 'react-router-dom';
import Notification from '../../assets/notification.png';
import Friends from '../../assets/friends.png';

export default function TopBar() {
  const location = useLocation();

  const getTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Dashboard';
    if (path === '/split-bill') return 'Split Bill';
    if (path === '/profile') return 'Profile';
    return 'Page';
  };

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-white border-b border-gray-300 z-10 flex items-center justify-between px-6">
      <h1 className="text-xl font-semibold text-[#BA2685]">{getTitle()}</h1>
      <div className="flex items-center gap-4">
        <button className="relative">
          <img src={Notification} className="w-6 h-6 text-[#BA2685]" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#BA2685] rounded-full"></span>
        </button>
        <button className="relative">
          <img src={Friends} className="w-6 h-6 text-[#BA2685]" />
          {/* <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#BA2685] rounded-full"></span> */}
        </button>
      </div>
    </header>
  );
}
