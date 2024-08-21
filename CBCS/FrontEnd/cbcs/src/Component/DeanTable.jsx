import React, { useEffect, useState } from 'react';
import { UseDeanAuthContext } from "../Hooks/UseDeanAuthContext";

const DeanTable = ({ Dept }) => {
    const { DEAN } = UseDeanAuthContext();
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`http://localhost:4000/cbcs/Dean/getstudinfo`, {
                    method: 'POST',
                    body: JSON.stringify({ Dept }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${DEAN.token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const json = await response.json();
                setData(json);
            } catch (err) {
                setError(err.message);
            }
        }

        fetchData();
    }, [Dept, DEAN.token]);

    // Filter data based on search term
    const filteredData = data.filter(student =>
        student.RegNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculate the current data to be displayed
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate total pages
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    // Handle pagination
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (error) {
        return <div style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>{error}</div>;
    }

    const tableContainerStyles = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '20px',
        padding: '20px',
        width: '100%',
        boxSizing: 'border-box',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        minHeight: '90vh',
        overflow: 'hidden', // Prevent scrolling
    };

    const tableStyles = {
        width: '100%',
        maxWidth: '1200px',
        borderCollapse: 'collapse',
        marginBottom: '20px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Transparent white
        borderRadius: '8px', // Slightly round the corners
        overflow: 'hidden', // Prevent content from overflowing
    };

    const thTdStyles = {
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'left',
        wordWrap: 'break-word',
    };

    const thStyles = {
        ...thTdStyles,
        backgroundColor: '#f4f4f4',
    };

    const paginationStyles = {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
        width: '100%',
        maxWidth: '1200px',
        alignItems: 'center', // Center items vertically
    };

    const buttonStyles = {
        backgroundColor: '#9e1c3f',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    };

    const disabledButtonStyles = {
        backgroundColor: '#cccccc',
        cursor: 'not-allowed',
    };

    const searchContainerStyles = {
        marginBottom: '20px',
        width: '100%',
        maxWidth: '1200px',
        display: 'flex',
        justifyContent: 'center',
    };

    const searchInputStyles = {
        width: '100%',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '16px',
    };

    return (
        <div style={tableContainerStyles}>
            <div style={searchContainerStyles}>
                <input
                    type="text"
                    placeholder="Search by Register Number or Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={searchInputStyles}
                />
            </div>
            {currentData.length === 0 ? (
                <div>No student information available.</div>
            ) : (
                <>
                    <table style={tableStyles}>
                        <thead>
                            <tr>
                                <th style={thStyles}>Name</th>
                                <th style={thStyles}>Email</th>
                                <th style={thStyles}>Batch</th>
                                <th style={thStyles}>Dept</th>
                                <th style={thStyles}>RegNo</th>
                                <th style={thStyles}>CAE_1</th>
                                <th style={thStyles}>CAE_2</th>
                                <th style={thStyles}>SEM</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((value, index) => (
                                <tr key={index}>
                                    <td style={thTdStyles}>{value.Name}</td>
                                    <td style={thTdStyles}>{value.Email}</td>
                                    <td style={thTdStyles}>{value.Batch}</td>
                                    <td style={thTdStyles}>{value.Dept}</td>
                                    <td style={thTdStyles}>{value.RegNo}</td>
                                    <td style={thTdStyles}>{value.CAE1 || "N/A"}</td>
                                    <td style={thTdStyles}>{value.CAE2 || "N/A"}</td>
                                    <td style={thTdStyles}>{value.SEM || "N/A"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div style={paginationStyles}>
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            style={currentPage === 1 ? { ...buttonStyles, ...disabledButtonStyles } : buttonStyles}
                        >
                            Previous
                        </button>
                        <div>
                            Page {currentPage} of {totalPages}
                        </div>
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            style={currentPage === totalPages ? { ...buttonStyles, ...disabledButtonStyles } : buttonStyles}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default DeanTable;
