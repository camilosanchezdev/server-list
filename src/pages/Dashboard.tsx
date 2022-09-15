import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
    useQuery,
} from 'react-query'
import arrowUp from 'assets/icons/arrow-up.svg';
import arrowDown from 'assets/icons/arrow-down.svg';
import { logout } from '../state/auth.slice';
import { useAppSelector } from '../state/typedReduxHooks';
import { fetchData } from '../utils/api/api.service';
import { sortArrayby } from 'utils/functions.utils';
import DashboardHeader from 'components/DashboardHeader.component';
import DashboardSidebar from 'components/DashboardSidebar.component';
import Pagination from 'components/Pagination.component';

interface IServer {
    name: string;
    distance: number;
}

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const range = [10, 20, 50, 100]
    const [toggleSortByName, setToggleSortByName] = useState(false)
    const [toggleSortByDistance, setToggleSortByDistance] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(range[0])
    const [results, setResults] = useState<IServer[]>([])
    const [ordererResults, setOrdererResults] = useState<IServer[]>([])

    const { auth } = useAppSelector((state: any) => state);
    const token = auth.token;

    const { isLoading, error, data } = useQuery('servers', () =>
        fetchData('servers', token)
    );

    const handleLogout = () => {
        navigate('/')
        dispatch(logout())
    }
    const applyPagination = (data: any, pageNumber: number, pageSize: number) => {
        setResults(data.slice((pageNumber - 1) * pageSize, pageNumber * pageSize))
    }
    const handleOrderByName = () => {
        setToggleSortByName(!toggleSortByName)
        const dataResult = sortArrayby(data, 'name', toggleSortByName)
        setOrdererResults(dataResult)
        setCurrentPage(1)
        applyPagination(dataResult, 1, pageSize)
    }
    const handleOrderByDistance = () => {
        setToggleSortByDistance(!toggleSortByDistance)
        const dataResult = sortArrayby(data, 'distance', toggleSortByDistance)
        setOrdererResults(dataResult)
        setCurrentPage(1)
        applyPagination(dataResult, 1, pageSize)
    }
    const handleFilter = (pageSizeSelected: number) => {
        setPageSize(pageSizeSelected)
        setCurrentPage(1)
        applyPagination(ordererResults, 1, pageSizeSelected)
    }
    const handlePagination = (isNext: boolean) => {
        const page = isNext ? currentPage + 1 : currentPage - 1
        setCurrentPage(page)
        applyPagination(ordererResults, page, pageSize)
    }

    useEffect(() => {
        if (data && ordererResults.length === 0) {
            applyPagination(data, currentPage, pageSize)
            setOrdererResults(data)
        }
    }, [data, currentPage, pageSize])

    return (
        <>
            <div className="min-h-screen">
                <DashboardHeader handleLogout={handleLogout} />
                <div className="flex flex-row" style={{ minHeight: 'calc(100vh - 80px)' }}>
                    <DashboardSidebar handleLogout={handleLogout} />
                    <main className="w-full md:w-3/4 m-6">
                        <div className="bg-gray-50 w-full rounded-lg border">
                            <div className="w-full">
                                <table className="w-full mt-1">
                                    <tbody>
                                        <tr>
                                            <th className="w-3/6 text-start px-3">
                                                <button type="button" className="flex items-center" onClick={handleOrderByName}>
                                                    <span>Server</span>
                                                    <img className="w-6 h-6" src={toggleSortByName ? arrowUp : arrowDown} alt="" />
                                                </button>
                                            </th>
                                            <th className="w-3/6 text-start px-3">
                                                <button type="button" className="flex items-center" onClick={handleOrderByDistance}>
                                                    <span>Distance</span>
                                                    <img className="w-6 h-6" src={toggleSortByDistance ? arrowUp : arrowDown} alt="" />
                                                </button>
                                            </th>
                                        </tr>

                                        {isLoading && !results && <tr className="mx-2 py-4"><td>Loading...</td></tr>}

                                        {!!error && <tr><td className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 mx-2" role="alert">
                                            <span className="font-medium w-full">Server Error.</span> Please try again.
                                        </td></tr>}

                                        {results && results.map((item: any, index: number) => (<tr key={`${item.name}-${index}`} className="h-10 items-center border-b w-full">
                                            <td className="w-3/6 px-3">{item.name}</td>
                                            <td className="w-3/6 px-3">{item.distance}</td>
                                        </tr>))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <Pagination
                            currentPage={currentPage}
                            lastPage={Math.ceil(ordererResults.length / pageSize)}
                            range={range}
                            filter={handleFilter}
                            disabledPrevBtn={currentPage === 1}
                            disabledNextBtn={Math.ceil(ordererResults.length / pageSize) === currentPage}
                            changePage={(isNext: boolean) => handlePagination(isNext)} />
                    </main>
                </div>

            </div>
        </>
    );
};

export default Dashboard;
