import React, { useEffect, useState } from 'react';
import { useHodAuthContext } from '../Hooks/useHodAuthContext';
import { useCourseContext } from '../Hooks/useCourseContext';

const HodTable = () => {
  const [data, setData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [courseInfo, setCourseInfo] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredStudentData, setFilteredStudentData] = useState([]);
  const { HOD } = useHodAuthContext();
  const { dispatch, course } = useCourseContext();

  useEffect(() => {
    setData(course);
  }, [course]);

  useEffect(() => {
    const handleSearch = () => {
      if (!Array.isArray(course)) return; // Ensure course is an array

      const query = searchQuery.toLowerCase();
      const filteredData = course.filter((item) => {
        // Check if item has the properties before accessing them
        const courseName = item.CourseName ? item.CourseName.toLowerCase() : '';
        const coordinatorName = item.Coordinator && item.Coordinator.Name
          ? item.Coordinator.Name.toLowerCase()
          : '';
        const providedBy = item.ProvidedBy ? item.ProvidedBy.toLowerCase() : '';
        const seats = item.Seats ? item.Seats.toString().toLowerCase() : '';

        return (
          courseName.includes(query) ||
          coordinatorName.includes(query) ||
          providedBy.includes(query) ||
          seats.includes(query)
        );
      });
      setData(filteredData);
    };

    handleSearch();
  }, [searchQuery, course]);

  useEffect(() => {
    const handleStudentSearch = () => {
      if (!Array.isArray(studentData)) return; // Ensure studentData is an array

      const query = searchQuery.toLowerCase();
      const filteredStudents = studentData.flatMap((user) =>
        user.RegStudents.filter((student) => {
          // Check if student has the properties before accessing them
          const name = student.Name ? student.Name.toLowerCase() : '';
          const regNo = student.RegNo ? student.RegNo.toLowerCase() : '';
          const email = student.Email ? student.Email.toLowerCase() : '';
          const dept = student.Dept ? student.Dept.toLowerCase() : '';

          return (
            name.includes(query) ||
            regNo.includes(query) ||
            email.includes(query) ||
            dept.includes(query)
          );
        })
      );
      setFilteredStudentData(filteredStudents);
    };

    handleStudentSearch();
  }, [searchQuery, studentData]);

  const handleClick = async (e, user) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:4000/cbcs/hod/RegStudent/${user._id}`, {
      headers: { 'Authorization': `Bearer ${HOD.token}` },
    });
    const json = await response.json();
    if (response.ok) {
      setStudentData(json);
      setFilteredStudentData(json.flatMap((user) => user.RegStudents)); // Reset filtered data
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
                  <td style={styles.td}>{user.Coordinator?.Name || 'N/A'}</td>
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
        {studentData.length > 0 && courseInfo && (
          <>
            <h2>Registered Students for {courseInfo.CourseName}</h2>
            <div style={styles.searchContainer}>
              <input
                style={styles.searchInput}
                type="text"
                placeholder="Search students by name, regno, email, or dept"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button style={styles.button} onClick={() => setSearchQuery(searchQuery)}>Search</button>
            </div>
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
                {filteredStudentData.map((student) => (
                  <tr key={student.RegNo}>
                    <td style={styles.td}>{student.Name}</td>
                    <td style={styles.td}>{student.RegNo}</td>
                    <td style={styles.td}>{student.Email}</td>
                    <td style={styles.td}>{student.Dept}</td>
                    <td style={styles.td}>{courseInfo.CourseName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </main>
    </div>
  );
};

export default HodTable;
