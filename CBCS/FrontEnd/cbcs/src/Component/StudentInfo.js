import React, { useEffect, useState } from 'react';

const StudentInfo = ({ user }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:4000/cbcs/course/${user.user_id}`, {
                headers: { 'Authorization': `Bearer ${user.token}` }
            });
            const json = await response.json();
            if (!response.ok) {
                console.log("Error in response");
            }
            if (response.ok) {
                setData(json);
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
        profilePic: {
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            marginBottom: '15px',
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
                    {data.map((value, index) => (
                        <div style={styles.studentDetails} key={index}>
                            <table style={styles.table}>
                                <tbody>
                                    <tr>
                                        <td style={styles.tableCell}>Name:</td>
                                        <td style={styles.tableCell}>{value.Name.toUpperCase()}</td>
                                    </tr>
                                    <tr>
                                        <td style={styles.tableCell}>Register Number:</td>
                                        <td style={styles.tableCell}>{value.RegNo}</td>
                                    </tr>
                                    <tr>
                                        <td style={styles.tableCell}>Roll Number:</td>
                                        <td style={styles.tableCell}>{value.RollNo}</td>
                                    </tr>
                                    <tr>
                                        <td style={styles.tableCell}>Gender:</td>
                                        <td style={styles.tableCell}>{value.Gender}</td>
                                    </tr>
                                    <tr>
                                        <td style={styles.tableCell}>Date of Birth:</td>
                                        <td style={styles.tableCell}>{value.DOB}</td>
                                    </tr>
                                    <tr>
                                        <td style={styles.tableCell}>Department:</td>
                                        <td style={styles.tableCell}>{value.Dept}</td>
                                    </tr>
                                    <tr>
                                        <td style={styles.tableCell}>Course:</td>
                                        <td style={styles.tableCell}>{value.CourseInfo.CourseName}</td>
                                    </tr>
                                    <tr>
                                        <td style={styles.tableCell}>Marks:</td>
                                        <td style={styles.tableCell}><a href="#">{value.Marks.CAE1}</a></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            </div>
            <nav style={styles.bottomNavbar}>
                {/* Add Bottom Navbar content here */}
            </nav>
        </>
    );
}

export default StudentInfo;
