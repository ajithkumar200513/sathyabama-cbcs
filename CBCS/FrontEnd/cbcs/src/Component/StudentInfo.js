import React, { useEffect, useState } from 'react';

const StudentInfo = ({ user }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`https://sathyabama-cbcs.onrender.com/cbcs/course/${user.user_id}`, {
                    headers: { 'Authorization': `Bearer ${user.token}` }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const json = await response.json();
                setData(json);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [user.user_id, user.token]);

    const styles = {
        mainContainer: {
            fontFamily: 'Arial, sans-serif',
            padding: '20px',
            backgroundColor: '#FFFFFF80',
            minHeight: '100vh',
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        studentContainer: {
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            width: '100%',
            maxWidth: '800px',
            marginBottom: '20px',
        },
        studentDetails: {
            marginBottom: '20px',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
        },
        tableCell: {
            padding: '10px',
            borderBottom: '1px solid #ddd',
        },
        bottomNavbar: {
            backgroundColor: '#9e1c3f',
            padding: '10px',
            color: '#fff',
            textAlign: 'center',
            width: '100%',
            position: 'fixed',
            bottom: 0,
        },
    };

    return (
        <>
            <div style={styles.mainContainer}>
                <nav style={styles.bottomNavbar}>
                    {/* Add Navbar content here */}
                </nav>
                <div style={styles.studentContainer}>
                    {data.length > 0 ? data.map((value, index) => (
                        <div style={styles.studentDetails} key={index}>
                            <table style={styles.table}>
                                <tbody>
                                    <tr>
                                        <td style={styles.tableCell}>Name:</td>
                                        <td style={styles.tableCell}>{value.Name ? value.Name.toUpperCase() : 'N/A'}</td>
                                    </tr>
                                    <tr>
                                        <td style={styles.tableCell}>Register Number:</td>
                                        <td style={styles.tableCell}>{value.RegNo || 'N/A'}</td>
                                    </tr>
                                    <tr>
                                        <td style={styles.tableCell}>Roll Number:</td>
                                        <td style={styles.tableCell}>{value.RollNo || 'N/A'}</td>
                                    </tr>
                                    <tr>
                                        <td style={styles.tableCell}>Gender:</td>
                                        <td style={styles.tableCell}>{value.Gender || 'N/A'}</td>
                                    </tr>
                                    <tr>
                                        <td style={styles.tableCell}>Date of Birth:</td>
                                        <td style={styles.tableCell}>{value.DOB || 'N/A'}</td>
                                    </tr>
                                    <tr>
                                        <td style={styles.tableCell}>Department:</td>
                                        <td style={styles.tableCell}>{value.Dept || 'N/A'}</td>
                                    </tr>
                                    <tr>
                                        <td style={styles.tableCell}>Course:</td>
                                        <td style={styles.tableCell}>{value.CourseInfo?.CourseName || 'N/A'}</td>
                                    </tr>
                                    <tr>
                                        <td style={styles.tableCell}>CAE1:</td>
                                        <td style={styles.tableCell}>
                                            {value.CAE1 ? value.CAE1 : 'N/A'}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={styles.tableCell}>CAE2:</td>
                                        <td style={styles.tableCell}>
                                            {value.CAE2 ? value.CAE2 : 'N/A'}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={styles.tableCell}>SEM:</td>
                                        <td style={styles.tableCell}>
                                            {value.SEM ? value.SEM : 'N/A'}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )) : <p>No student data available.</p>}
                </div>
            </div>
            <nav style={styles.bottomNavbar}>
                {/* Add Bottom Navbar content here */}
            </nav>
        </>
    );
}

export default StudentInfo;
