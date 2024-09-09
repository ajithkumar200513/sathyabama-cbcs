import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCourseContext } from '../Hooks/useCourseContext';
import { useAuthContext } from '../Hooks/useAuthContext';
import StudentInfo from './StudentInfo';
import backgroundImage from '../css/logo.png';
import { useLogout } from '../Hooks/useLogout';

const StudentTable = ({ course }) => {
    const { user } = useAuthContext();
    const { dispatch } = useCourseContext();

    const [data, setData] = useState([]);
    const [courseInfo, setCourseInfo] = useState('');
    const [buttonHovered, setButtonHovered] = useState({});
    const { logout } = useLogout();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Ensure course is an array before setting it
        if (Array.isArray(course)) {
            setData(course);
        }
    }, [course]);

    const filteredData = data.filter((user) =>
        user.CourseName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const CourseReg1 = user.CourseInfo;

    const handleClick = (e, user) => {
        e.preventDefault();
        setCourseInfo(user);
    };

    const handleClose = (e) => {
        e.preventDefault();
        setCourseInfo('');
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const response = await fetch(`https://sathyabama-cbcs.onrender.com/cbcs/course/update/${courseInfo._id}`, {
            method: 'PUT',
            body: JSON.stringify({ user_id: user.user_id }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`,
            },
        });
        const json = await response.json();
        if (!response.ok) {
            console.error("Error in response");
        }
        if (response.ok) {
            dispatch({ type: 'SET_COURSE', payload: json });
        }

        const response1 = await fetch(`https://sathyabama-cbcs.onrender.com/cbcs/course/update/user/${user.user_id}`, {
            method: 'PUT',
            body: JSON.stringify({ course_id: courseInfo._id }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`,
            },
        });
        if (!response1.ok) {
            console.error(response1);
        }
        if (response1.ok) {
            console.log("Course Registered");
        }

        setData(course);
        setTimeout(logout, 2000);
    };

    const handleMouseEnter = (buttonName) => {
        setButtonHovered((prev) => ({ ...prev, [buttonName]: true }));
    };

    const handleMouseLeave = (buttonName) => {
        setButtonHovered((prev) => ({ ...prev, [buttonName]: false }));
    };

    const styles = {
        container: {
            padding: '20px',
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#f0f0f0',
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            minHeight: '100vh',
            color: '#333',
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
        },
        headerText: {
            fontSize: '18px',
            flex: '1',
        },
        buttonContainer: {
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            marginBottom: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white
            borderRadius: '8px',
        },
        th: {
            backgroundColor: '#9e1c3f',
            color: '#fff',
            padding: '10px',
            border: '1px solid #ddd',
        },
        td: {
            padding: '10px',
            border: '1px solid #ddd',
        },
        button: {
            padding: '10px 15px',
            border: 'none',
            borderRadius: '4px',
            color: '#fff',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            fontSize: '16px',
        },
        regButton: {
            backgroundColor: '#9e1c3f',
        },
        regButtonHover: {
            backgroundColor: '#c2185b',
        },
        closeButton: {
            backgroundColor: '#ccc',
            marginLeft: '10px',
        },
        closeButtonHover: {
            backgroundColor: '#aaa',
        },
        infoContainer: {
            marginTop: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
        infoHeader: {
            fontSize: '24px',
        },
        infoText: {
            fontSize: '18px',
        },
        searchContainer: {
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
        },
        searchInput: {
            padding: '10px',
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            flex: '1',
        },
        searchButton: {
            padding: '10px 15px',
            backgroundColor: '#9e1c3f',
            border: 'none',
            borderRadius: '4px',
            color: '#fff',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            fontSize: '16px',
        },
        searchButtonHover: {
            backgroundColor: '#c2185b',
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div style={styles.headerText}>
                    Welcome, {user.name}
                </div>
            </div>

            <div style={styles.searchContainer}>
                <input
                    type="text"
                    style={styles.searchInput}
                    placeholder="Search Course"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                    style={{
                        ...styles.searchButton,
                        ...(buttonHovered.search ? styles.searchButtonHover : {}),
                    }}
                    onMouseEnter={() => handleMouseEnter('search')}
                    onMouseLeave={() => handleMouseLeave('search')}
                >
                    Search
                </button>
            </div>

            {!courseInfo && !CourseReg1 && (
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Course</th>
                            <th style={styles.th}>Faculty</th>
                            <th style={styles.th}>DEPT</th>
                            <th style={styles.th}>AVAILABLE SEAT</th>
                            <th style={styles.th}>Register</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map((user) => (
                                <tr key={user._id}>
                                    <td style={styles.td}>{user.CourseName}</td>
                                    <td style={styles.td}>{user.Name}</td>
                                    <td style={styles.td}>{user.ProvidedBy}</td>
                                    <td style={styles.td}>{user.Seats}</td>
                                    <td style={styles.td}>
                                        <button
                                            style={{
                                                ...styles.button,
                                                ...styles.regButton,
                                                ...(buttonHovered[`reg-${user._id}`] ? styles.regButtonHover : {}),
                                            }}
                                            onMouseEnter={() => handleMouseEnter(`reg-${user._id}`)}
                                            onMouseLeave={() => handleMouseLeave(`reg-${user._id}`)}
                                            onClick={(e) => handleClick(e, user)}
                                            disabled={user.Seats <= 0}
                                        >
                                            Register
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" style={styles.td}>No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}

            {courseInfo && (
                <div style={styles.infoContainer}>
                    <h1 style={styles.infoHeader}>About</h1>
                    <h2 style={styles.infoText}>
                        Course: {courseInfo.CourseName}<br />
                        Faculty: {courseInfo.Coordinator.Name}<br />
                        Available Seats: {courseInfo.Seats}<br />
                        Provided By: {courseInfo.ProvidedBy}<br />
                    </h2>
                    <Link to='/student/Course/Register'>
                        <button
                            style={{
                                ...styles.button,
                                ...styles.regButton,
                                ...(buttonHovered.register ? styles.regButtonHover : {}),
                            }}
                            onMouseEnter={() => handleMouseEnter('register')}
                            onMouseLeave={() => handleMouseLeave('register')}
                            onClick={handleRegister}
                        >
                            Register
                        </button>
                    </Link>
                    <button
                        style={{
                            ...styles.button,
                            ...styles.closeButton,
                            ...(buttonHovered.close ? styles.closeButtonHover : {}),
                        }}
                        onMouseEnter={() => handleMouseEnter('close')}
                        onMouseLeave={() => handleMouseLeave('close')}
                        onClick={handleClose}
                    >
                        Close
                    </button>
                </div>
            )}

            {CourseReg1 && (
                <div><StudentInfo key={user.user_id} user={user} /></div>
            )}
        </div>
    );
};

export default StudentTable;
