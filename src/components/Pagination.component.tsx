import { useState } from 'react';
import arrowDown from 'assets/icons/arrow-down.svg';
import arrowLeft from 'assets/icons/arrow-left.svg';
import arrowRight from 'assets/icons/arrow-right.svg';

interface PaginationProps {
    currentPage?: number
    lastPage?: number
    range: Array<number>
    filter: (option: number) => void
    changePage: (isNext: boolean) => void
    disabledNextBtn: boolean
    disabledPrevBtn: boolean
}
const Pagination = ({ range, filter, changePage, currentPage, lastPage, disabledNextBtn = false, disabledPrevBtn = true }: PaginationProps) => {

    const [toggleMenu, setToggleMenu] = useState(false)
    const [rangeSelected, setRangeSelected] = useState(range[0])
    const handleSelectOption = (option: number) => {
        setToggleMenu(false)
        setRangeSelected(option)
        filter(option)
    }
    return (
        <div className="flex w-full justify-between mt-2 relative">
            <button className="flex" onClick={() => setToggleMenu(!toggleMenu)}>
                <span>{rangeSelected} per page</span>
                <img className="h-8 w-8 cursor-pointer" src={arrowDown} alt="" />
            </button>
            <div style={{ bottom: '30px' }} className={`mb-1 absolute rounded bg-gray-100 border font-semibold w-32 left-0 cursor-pointer ${toggleMenu ? 'block' : 'hidden'}`} >
                <ul className="px-0 my-0">
                    {range && range.map((option: number) => (<li key={option} className="flex items-center hover:bg-gray-50" onClick={() => handleSelectOption(option)}>
                        <span className="p-2">{option}</span>
                    </li>))}
                </ul>
            </div>
            {lastPage !== 0 && <div>
                <span>{`Page ${currentPage} of ${lastPage}`}</span>
            </div>}
            <div className="flex">
                <button onClick={() => changePage(false)} disabled={disabledPrevBtn}>
                    <img className="h-8 w-8 cursor-pointer" src={arrowLeft} alt="" />
                </button>
                <button onClick={() => changePage(true)} disabled={disabledNextBtn}>
                    <img className="h-8 w-8 cursor-pointer" src={arrowRight} alt="" />
                </button>
            </div>
        </div >
    )
}

export default Pagination