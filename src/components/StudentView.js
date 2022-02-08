import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import DefaultLayout from './DefaultLayout';
import { useTable, useRowSelect, usePagination } from 'react-table'
import { Checkbox } from './Checkbox';
import Loading from './Loading';
const StudentView = () => {
    const [student, setStudent] = useState([])
    const [loading,setLoading] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:5000/api/student/getStudent')
            console.log(response.data);
            setStudent(response.data)
            setLoading(true)

        }
        fetchData()
    }, [])

    const data = useMemo(() => [...student], [student])

    const columns = useMemo(
        () => [
            {
                Header: 'Full Name',
                accessor: 'fullName', // accessor is the "key" in the data
            },
            {
                Header: 'Age',
                accessor: 'age',
            },
            {
                Header: 'Roll',
                accessor: 'roll',
            },
            {
                Header: 'Class',
                accessor: 'class',
            },
            {
                Header: 'Hall Name',
                accessor: 'hallName',
            },
            {
                Header: 'Status',
                accessor: 'status',
            },

        ],
        []
    )
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        selectedFlatRows,
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
        usePagination,
        useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push(columns => [
                {
                    id: 'selection',
                    Header: ({ getToggleAllRowsSelectedProps }) => (
                        <div>
                            <Checkbox {...getToggleAllRowsSelectedProps()} />
                        </div>
                    ),
                    Cell: ({ row }) => (
                        <div>
                            <Checkbox {...row.getToggleRowSelectedProps()} />
                        </div>
                    )
                },
                ...columns
            ])
        }
    )
    const studentId = []
    const studentDetails = []
    selectedFlatRows.map(pd => {
        studentId.push(pd.original._id)
        studentDetails.push(pd.original)
    })
    const handleEdit = async () => {
        setLoading(false)
        try {
            await axios.post('http://localhost:5000/api/student/deleteStudent/', { studentId: studentId })
            console.log("success");
            setLoading(true)
            alert("student deleted successfully")
        } catch (error) {
            console.log(error);
            alert(error)
        }


    }
    const hangleChangeToActive = async(update)=>{
        const newObject = {studentId , update}
        try {
            await axios.put('http://localhost:5000/api/student/changeStatus/', newObject)
            console.log("success");
            alert("student deleted successfully")
        } catch (error) {
            console.log(error);
            alert(error)
        }

    }
    return (
        <DefaultLayout>
            <div>
                <h2>Student Table</h2>
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

                <table class="table">
                    <tbody>
                        <tr>
                            <th scope="row">
                                <div class="dropdown">
                                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Select Action
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <button class="dropdown-item btn" >Edit</button>
                                        <br />
                                        <button onClick={handleEdit} class="dropdown-item btn" >Delete</button>
                                    </div>
                                </div>
                            </th>
                            <td>Full Name</td>
                            <td>Age</td>
                            <td>Roll</td>
                            <td> Class</td>
                            <td>Hall Name</td>
                            <td>
                            <div class="dropdown">
                                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        change status
                                     </button>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <button onClick={()=>hangleChangeToActive("active")} class="dropdown-item btn" >Active</button>
                                        <br />
                                        <button onClick={()=>hangleChangeToActive("inActive")} class="dropdown-item btn" >Inactive</button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>


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

export default StudentView;