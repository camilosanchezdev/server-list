import logo from 'assets/logos/main-logo.png'
import menu from 'assets/icons/menu.svg';
import { useState } from 'react';
import logoutIcon from 'assets/icons/logout.svg'

interface DashboardHeaderProps {
    handleLogout: () => void
}
const DashboardHeader = ({ handleLogout }: DashboardHeaderProps) => {
    const [toggleHeaderMenu, setToggleHeaderMenu] = useState(false)
    const handleOpenMenu = () => {
        setToggleHeaderMenu(!toggleHeaderMenu)
    }

    return (
        <header className="h-20 border-b flex justify-between items-center mx-6 relative">
            <div>
                <img src={logo} alt="" />
            </div>
            <div className="md:hidden">
                <button type="button" onClick={handleOpenMenu}>
                    <img className="w-6 h-6 cursor-pointer" src={menu} alt="" />
                </button>
                <div className={`absolute rounded bg-gray-100 hover:bg-gray-50 border font-semibold h-12 w-32 right-0 bottom-- cursor-pointer ${toggleHeaderMenu ? 'block' : 'hidden'}`} >
                    <ul className="mx-2 my-2">
                        <li className="flex items-center" onClick={() => handleLogout()}>
                            <img src={logoutIcon} alt="" className="w-8 h-8" />
                            <span className="ml-2 text-sm">Logout</span>
                        </li>
                    </ul>
                </div>

            </div>
        </header>
    );
}

export default DashboardHeader;