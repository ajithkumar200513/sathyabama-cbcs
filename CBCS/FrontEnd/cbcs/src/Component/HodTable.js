import React, { useEffect, useState } from 'react';
import { useHodAuthContext } from '../Hooks/useHodAuthContext';
import { useCourseContext } from '../Hooks/useCourseContext';

const HodTable = () => {
  const [data, setData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [courseInfo, setCourseInfo] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { HOD } = useHodAuthContext();
  const { dispatch, course } = useCourseContext();

  useEffect(() => {
    setData(course);
  }, [course]);

  useEffect(() => {
    const handleSearch = () => {
      const query = searchQuery.toLowerCase();
      const filteredData = course.filter((item) =>
        item.CourseName.toLowerCase().includes(query) ||
        item.Coordinator.Name.toLowerCase().includes(query) ||
        item.ProvidedBy.toLowerCase().includes(query) ||
        item.Seats.toString().includes(query)
      );
      setData(filteredData);
    };

    handleSearch();
  }, [searchQuery, course]);

  const handleClick = async (e, user) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:4000/cbcs/hod/RegStudent/${user._id}`, {
      headers: { 'Authorization': `Bearer ${HOD.token}` },
    });
    const json = await response.json();
    if (response.ok) {
      setStudentData(json);
    }
    setCourseInfo(user);
  };

  const handleDelete = async (e, user) => {
    const response = await fetch(`http://localhost:4000/cbcs/hod/delete/${user._id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${HOD.token}` },
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: 'DELETE_COURSE', payload: json });
      window.location.reload();
    }
  };

  // Handle device orientation change
  useEffect(() => {
    const handleOrientationChange = () => {
      if (window.innerWidth < 768 && window.innerHeight > window.innerWidth) {
        if (window.confirm('For a better experience, please rotate your device to landscape mode.')) {
          // Optional: Additional logic if user acknowledges
        }
      }
    };

    handleOrientationChange(); // Check orientation on mount

    window.addEventListener('resize', handleOrientationChange); // Listen for orientation changes

    return () => {
      window.removeEventListener('resize', handleOrientationChange); // Cleanup on unmount
    };
  }, []);

  const styles = {
    body: {
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      color: '#333',
      padding: '20px',
    },
    main: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '1200px',
    },
    searchContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '20px',
    },
    searchInput: {
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      flex: 1,
      marginRight: '10px',
    },
    button: {
      padding: '5px 10px',
      backgroundColor: '#9e1c3f',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      fontSize: '14px',
      fontWeight: 'bold',
      margin: '0 5px',
    },
    buttonHover: {
      backgroundColor: '#d32f2f',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    th: {
      backgroundColor: '#9e1c3f',
      color: '#fff',
      padding: '10px',
      border: '1px solid #ccc',
    },
    td: {
      padding: '10px',
      border: '1px solid #ccc',
      textAlign: 'center',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
    },
  };

  return (
    <div style={styles.body}>
      <main style={styles.main}>
        <div style={styles.searchContainer}>
          <input
            style={styles.searchInput}
            type="text"
            placeholder="Search by course name, faculty, dept, or seats"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button style={styles.button} onClick={() => setSearchQuery(searchQuery)}>Search</button>
        </div>
        {!courseInfo && (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Course</th>
                <th style={styles.th}>Faculty</th>
                <th style={styles.th}>DEPT</th>
                <th style={styles.th}>Available Seats</th>
                <th style={styles.th}>Options</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
                <tr key={user._id}>
                  <td style={styles.td}>{user.CourseName}</td>
                  <td style={styles.td}>{user.Coordinator.Name}</td>
                  <td style={styles.td}>{user.ProvidedBy}</td>
                  <td style={styles.td}>{user.Seats}</td>
                  <td style={styles.td}>
                    <div style={styles.buttonContainer}>
                      <button
                        style={styles.button}
                        onClick={(e) => handleClick(e, user)}
                      >
                        Registered Students
                      </button>
                      <button
                        style={styles.button}
                        onClick={(e) => handleDelete(e, user)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {studentData && courseInfo && (
          <>
            <h2>Registered Students for {courseInfo.CourseName}</h2>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>RegNo</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>DEPT</th>
                  <th style={styles.th}>Course</th>
                </tr>
              </thead>
              <tbody>
                {studentData.map((value) =>
                  value.RegStudents.map((v) => (
                    <tr key={v.RegNo}>
                      <td style={styles.td}>{v.Name}</td>
                      <td style={styles.td}>{v.RegNo}</td>
                      <td style={styles.td}>{v.Email}</td>
                      <td style={styles.td}>{v.Dept}</td>
                      <td style={styles.td}>{value.CourseName}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </>
        )}
      </main>
    </div>
  );
};

export default HodTable;
