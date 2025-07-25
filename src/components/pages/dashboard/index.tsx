import MainLayout from "../../layout/MainLayout";
import IcpLogo from '../../../assets/icp-logo.png';
import UserIcon from '../../../assets/user-photo.png';

function Dashboard({ logout }: { logout: () => void }) {
    return (
        <MainLayout logout={logout}>
            <div className="p-6 text-[#A3007D] font-semibold">
                {/* Wallet Username */}
                {/* <h1 className="text-2xl mb-6 text-start">ZeroZennn’s Wallet</h1> */}
                        


                {/* Pending Bill + ICP Balance */}
                <div className="grid grid-cols-12 gap-10">
                    <div className="col-span-8 relative">
                        <div className="relative bg-[#BA2685] h-[387px] text-white p-6"
                            style={{
                                clipPath: 'polygon(100% 77.003%,69.244% 77.003%,64% 100%,0% 100%,0% 25.84%,0% 25.84%,0.138% 21.648%,0.537% 17.672%,1.175% 13.965%,2.031% 10.579%,3.083% 7.568%,4.31% 4.986%,5.689% 2.884%,7.199% 1.317%,8.819% 0.338%,10.526% 0%,100% 0%,100% 77.003%)'
                            }}>
                            <div className="bg-[#9D0567] h-[347px] p-4"
                                style={{
                                    clipPath: 'polygon(100% 75.504%,68.912% 75.504%,68.753% 76.232%,63.587% 100%,0% 100%,0% 23.055%,0% 23.055%,0.115% 19.315%,0.448% 15.768%,0.981% 12.46%,1.696% 9.439%,2.575% 6.753%,3.599% 4.448%,4.751% 2.573%,6.013% 1.175%,7.365% 0.302%,8.791% 0%,100% 0%,100% 75.504%)'
                                }}>
                                <div className="user-info p-8 flex gap-10">
                                    <img src={UserIcon} alt="ICP Logo" className="w-[120px]" />
                                    <div className="wrap-name flex flex-col items-start">
                                        <h1>Wallet</h1>
                                        <h1 className="username text-7xl font-bold">ZeroZennn</h1>
                                    </div>
                                </div>
                                <div className="bill-total">

                                </div>
                            </div>

                        </div>
                        {/* set new usn button */}
                        <div className="bg-gradient-to-r from-[#BA2685] to-[#F36BAB] w-[338px] h-[100px] button-set-usn absolute -bottom-8 right-0 p-6 flex justify-center items-center cursor-pointer" style={{ 
                            clipPath: 'polygon( 15.552% 92.593%,0% 92.593%,15.552% 0%,15.552% 92.593%,97.416% 92.593%,97.416% 0%,15.562% 0%,15.562% 92.593%,97.416% 92.593% )'
                        }}>
                            <h1 className="username text-xl font-semibold text-amber-50 uppercase">Set New Username</h1>
                        </div>
                    </div>
                    <div className="col-span-4">
                        <div style={{ fontFamily: 'Namco Regular' }} className="relative flex justify-center items-center">
                            {/* Shadow Layer */}
                            <div className="absolute top-2 left-13 w-[377px] h-[377px] bg-[#9D0567]/50"
                                style={{
                                    clipPath: 'polygon(91.612% 28.662%,91.612% 73.515%,74.379% 90.749%,25.561% 90.749%,8.37% 73.558%,8.37% 28.619%,29.483% 7.506%,70.457% 7.506%,91.612% 28.662%)'
                                }}></div>

                            {/* Main Layer */}
                            <div className="relative w-[377px] h-[377px] bg-[#9D0567] text-white flex flex-col justify-center items-center "
                                style={{
                                    clipPath: 'polygon(91.612% 26.662%,91.612% 71.516%,72.397% 90.731%,27.543% 90.731%,8.37% 71.558%,8.37% 26.619%,27.5% 7.489%,72.439% 7.489%,91.612% 26.662%)',
                                    border: '4px solid white'
                                }}>
                                <img src={IcpLogo} alt="ICP Logo" className="w-[100px] mb-4" />
                                <p className="text-3xl font-bold mb-4 drop-shadow-[0px_0px_4px_rgba(255,255,255,0.9)]">100</p>
                                <div className="icp-balance">
                                    <p className="text-sm tracking-wide drop-shadow-[0px_0px_4px_rgba(255,255,255,0.9)]">icp</p>
                                    <p className="text-sm tracking-wide drop-shadow-[0px_0px_4px_rgba(255,255,255,0.9)]">balance</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Recent Bills Section */}
                <h2 className="text-xl mb-4 text-start mt-4 font-semibold">Recent Bill</h2>
                <div className="space-y-4">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="bg-gradient-to-r from-[#BA2685] to-[#F36BAB] p-4 rounded-lg flex justify-between items-center text-white">
                            <div>
                                <p className="font-semibold">Bill from ZeroZennn</p>
                                <p className="text-sm">22 - 07 - 2025</p>
                            </div>
                            <button className="text-sm flex items-center gap-1">
                                Bill Detail
                                <span>

                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-login-2"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" /><path d="M3 12h13l-3 -3" /><path d="M13 15l3 -3" /></svg>

                                </span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}

export default Dashboard;
