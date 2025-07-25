import { NavLink, Link } from 'react-router-dom';
import Logo from '../../assets/Logo-Poolit-rd.png';
import Dashboard from '../../assets/dashboard.png';
import DashboardActive from '../../assets/dashboard-active.png';
import SplitBill from '../../assets/split-bill.png';
import SplitBillActive from '../../assets/split-bill-active.png';
import Profile from '../../assets/profile.png';
import ProfileActive from '../../assets/profile-active.png';
import Logout from '../../assets/logout.png';

const DashboardIcon = ({
  className,
  isActive,
}: {
  className?: string;
  isActive: boolean;
}) => (
  <span className={className}>
    <img src={isActive ? DashboardActive : Dashboard} alt="Dashboard Icon" />
  </span>
);
const SplitBillIcon = ({
  className,
  isActive,
}: {
  className?: string;
  isActive: boolean;
}) => (
  <span className={className}>
    <img src={isActive ? SplitBillActive : SplitBill} alt="SplitBill Icon" />
  </span>
);
const ProfileIcon = ({
  className,
  isActive,
}: {
  className?: string;
  isActive: boolean;
}) => (
  <span className={className}>
    <img src={isActive ? ProfileActive : Profile} alt="Profile Icon" />
  </span>
);
const LogoutIcon = ({ className }: { className?: string }) => (
  <span className={className}>
    <img src={Logout} alt="Logout Icon" />
  </span>
);

export default function Sidebar() {
  const baseLinkClass =
    'flex items-center w-full px-4 py-3 rounded-lg text-md font-semibold';

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? `${baseLinkClass} bg-[#BA2685] text-white`
      : `${baseLinkClass} text-[#BA2685] hover:bg-[#BA2685]-100 hover:text-[#BA2685]`;
  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-300 flex flex-col p-5">
      <div className="flex flex-col items-center mb-10">
        <img src={Logo} alt="Poolit Logo" className="select-none w-32 h-32 object-contain" />
      </div>
      <nav className="flex flex-col flex-grow">
        <ul className="flex flex-col gap-4 flex-grow">
          <li>
            <NavLink to="/" className={getNavLinkClass}>
              {({ isActive }) => (
                <>
                  <DashboardIcon className="mr-4" isActive={isActive} /> Dashboard
                </>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to="/split-bill" className={getNavLinkClass}>
              {({ isActive }) => (
                <>
                  <SplitBillIcon className="mr-4" isActive={isActive} /> Split Bill
                </>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" className={getNavLinkClass}>
              {({ isActive }) => (
                <>
                  <ProfileIcon className="mr-4" isActive={isActive} /> Profile
                </>
              )}
            </NavLink>
          </li>

          {/* Logout at the bottom */}
          <li className="mt-auto">
            <Link
              to="/logout"
              className={`${baseLinkClass} text-[#BA2685] hover:bg-[#BA2685]-100 hover:text-[#BA2685]`}
            >
              <LogoutIcon className="mr-4" /> Logout
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
