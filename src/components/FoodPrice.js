import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import DefaultLayout from './DefaultLayout';
import { useTable, useRowSelect, usePagination } from 'react-table'
import { Checkbox } from './Checkbox';
import Loading from './Loading';
const FoodPrice = () => {
    const [food, setFood] = useState([])
    const [loading,setLoading] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:5000/api/food/getFood')
            console.log(response.data);
            setFood(response.data)
            setLoading(true)

        }
        fetchData()
    }, [])
console.log(food);
    const data = useMemo(() => [...food], [food])
    const columns = useMemo(
        () => [
            {
                Header: 'Food Name',
                accessor: 'foodName', // accessor is the "key" in the data
            },
            {
                Header: 'Food Price',
                accessor: 'foodPrice',
            }
        ],
        []
    )
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        { columns, data },
        usePagination       
    )
    
    
    return (
        <DefaultLayout>
            <div>
                <h2>Food And Price Table</h2>
                    {
                        loading ?  <table className='table' {...getTableProps()} style={{ border: 'solid 1px blue' }}>
                        <thead className="thead-dark" >
                            {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        <th scope="col"
                                            {...column.getHeaderProps()}
                                            style={{
                                                borderBottom: 'solid 3px lightGrey',
                                                background: 'aliceblue',
                                                color: 'black',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            {column.render('Header')}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {page.map(row => {
                                prepareRow(row)
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map(cell => {
                                            return (
                                                <td
                                                    {...cell.getCellProps()}
                                                    style={{
                                                        padding: '10px',
                                                        border: 'solid 1px gray',
                                                        background: 'papayawhip',
                                                    }}
                                                >
                                                    {cell.render('Cell')}
                                                </td>
                                            )
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    : <Loading></Loading>
                    }
               


                {/* table for bulk selection */}



                <div className="pagination">
                    <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                        {'<<'}
                    </button>{' '}
                    <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                        {'<'}
                    </button>{' '}
                    <button onClick={() => nextPage()} disabled={!canNextPage}>
                        {'>'}
                    </button>{' '}
                    <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                        {'>>'}
                    </button>{' '}
                    <span>
                        Page{' '}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>{' '}
                    </span>
                    <span>
                        | Go to page:{' '}
                        <input
                            type="number"
                            defaultValue={pageIndex + 1}
                            onChange={e => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0
                                gotoPage(page)
                            }}
                            style={{ width: '100px' }}
                        />
                    </span>{' '}
                    <select
                        value={pageSize}
                        onChange={e => {
                            setPageSize(Number(e.target.value))
                        }}
                    >
                        {[1, 2, 10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                </div>

            </div>
        </DefaultLayout>
    );
};

export default FoodPrice;