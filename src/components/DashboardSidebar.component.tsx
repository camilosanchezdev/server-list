import user from 'assets/icons/user.svg';
import logoutIcon from 'assets/icons/logout.svg'
import threeDots from 'assets/icons/dots.svg'
import computer from 'assets/icons/computer.svg'
import { useState } from 'react';

interface DashboardSidebarProps {
    handleLogout: () => void
}
const DashboardSidebar = ({ handleLogout }: DashboardSidebarProps) => {
    const [showSidebarMenu, setShowSidebarMenu] = useState(false)
    return (<aside className="hidden md:flex w-1/4 flex justify-between flex-col border-r">
        <div className="mx-6 my-4">
            <h3 className="text-xl font-semibold">Sections</h3>
            <ul className="mx-3 my-2">
                <li className="flex cursor-pointer hover:text-blue-400">
                    <img className="w-8 h-8" src={computer} alt="" />
                    <span className="text-lg mx-3">List of servers</span></li>
            </ul>
        </div>
        <div className="flex w-full py-3 relative">
            <div className="w-1/4 flex items-center justify-center">
                <img className="rounded-full bg-blue-300 p-1" src={user} alt="" />
            </div>
            <div className="flex flex-col w-2/4">
                <span className="font-semibold">Camilo Sanchez</span>
                <span>Administrator</span>

            </div>
            <div className="w-1/4 flex justify-end" onClick={() => setShowSidebarMenu(!showSidebarMenu)}>
                <img className="w-8 h-8 mx-3 cursor-pointer" src={threeDots} alt="" />
            </div>
            <div className={`absolute rounded bg-gray-100 hover:bg-gray-50 border font-semibold h-12 w-32 right-4 bottom-16 cursor-pointer ${showSidebarMenu ? 'block' : 'hidden'}`} >
                <ul className="mx-2 my-2">
                    <li className="flex items-center" onClick={handleLogout}>
                        <img src={logoutIcon} alt="" />
                        <span className="ml-2">Logout</span>
                    </li>
                </ul>
            </div>
        </div>
    </aside>)
}
export default DashboardSidebar;