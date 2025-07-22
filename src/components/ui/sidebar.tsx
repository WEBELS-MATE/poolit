import { NavLink, Link } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import  Logout  from '../../assets/logout.png';
import Profile from '../../assets/profile.png';
import Dashboard from '../../assets/dashboard.png';
import SplitBill from '../../assets/split-bill.png';

const DashboardIcon = ({ className }: { className?: string }) => (
  <span className={className}><img src={Dashboard} alt="Dashboard Icon" /></span>
);
const SplitBillIcon = ({ className }: { className?: string }) => (
  <span className={className}><img src={SplitBill} alt="Split Bill Icon" /></span>
);
const ProfileIcon = ({ className }: { className?: string }) => (
  <span className={className}><img src={Profile} alt="Profile Icon" /></span>
);
const LogoutIcon = ({ className }: { className?: string }) => (
  <span className={className}><img src={Logout} alt="Logout Icon" /></span>
);

export default function Sidebar() {
  const baseLinkClass =
    'flex items-center w-full p-4 rounded-lg text-lg font-semibold';

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? `${baseLinkClass} bg-[#BA2685] text-white`
      : `${baseLinkClass} text-[#BA2685] hover:bg-pink-100 hover:text-pink-600`;
  return (
    <div className="border-r p-5 border-gray-500 h-full">
      <div className="flex flex-col  items-center mb-16">
        <img src={Logo} alt="Poolit Logo" className="w-50 h-50" />
      </div>
      <nav className="flex-grow">
        <ul className="flex gap-20 flex-col">
          <li>
            <NavLink to="/" className={getNavLinkClass}>
              <DashboardIcon className="mr-4" /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/split-bill" className={getNavLinkClass}>
              <SplitBillIcon className="mr-4" /> Split Bill
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" className={getNavLinkClass}>
              <ProfileIcon className="mr-4" /> Profile
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="mt-40 bottom-10 ">
        <Link
          to="/logout"
          className={`${baseLinkClass} text-[#BA2685] hover:bg-pink-100 hover:text-pink-600`}
        >
          <LogoutIcon className="mr-4" /> Logout
        </Link>
      </div>
    </div>
  );
}
