import React, { useEffect, useState } from 'react';
import { useHodAuthContext } from '../Hooks/useHodAuthContext';
import { useCourseContext } from '../Hooks/useCourseContext';

const HodTable = () => {
  const [data, setData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [courseInfo, setCourseInfo] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredStudentData, setFilteredStudentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentStudentPage, setCurrentStudentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page
  const { HOD } = useHodAuthContext();
  const { dispatch, course } = useCourseContext();

  useEffect(() => {
    setData(course);
  }, [course]);

  useEffect(() => {
    const handleSearch = () => {
      if (!Array.isArray(course)) return;

      const query = searchQuery.toLowerCase();
      const filteredData = course.filter((item) => {
        const courseName = item.CourseName ? item.CourseName.toLowerCase() : '';
        const coordinatorName = item.Coordinator?.Name?.toLowerCase() || '';
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
      if (!Array.isArray(studentData)) return;

      const query = searchQuery.toLowerCase();
      const filteredStudents = studentData.flatMap((user) =>
        user.RegStudents.filter((student) => {
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
    const response = await fetch(`https://sathyabama-cbcs.onrender.com/cbcs/hod/RegStudent/${user._id}`, {
      headers: { 'Authorization': `Bearer ${HOD.token}` },
    });
    const json = await response.json();
    if (response.ok) {
      setStudentData(json);
      setFilteredStudentData(json.flatMap((user) => user.RegStudents));
    }
    setCourseInfo(user);
  };

  const handleDelete = async (e, user) => {
    const response = await fetch(`https://sathyabama-cbcs.onrender.com/cbcs/hod/delete/${user._id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${HOD.token}` },
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: 'DELETE_COURSE', payload: json });
      window.location.reload();
    }
  };

  useEffect(() => {
    const handleOrientationChange = () => {
      if (window.innerWidth < 768 && window.innerHeight > window.innerWidth) {
        if (window.confirm('For a better experience, please rotate your device to landscape mode.')) {
          // Optional: Additional logic if user acknowledges
        }
      }
    };

    handleOrientationChange();

    window.addEventListener('resize', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleOrientationChange);
    };
  }, []);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const totalStudentPages = Math.ceil(filteredStudentData.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleStudentNextPage = () => {
    setCurrentStudentPage((prevPage) => Math.min(prevPage + 1, totalStudentPages));
  };

  const handleStudentPreviousPage = () => {
    setCurrentStudentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const currentStudentData = filteredStudentData.slice(
    (currentStudentPage - 1) * itemsPerPage,
    currentStudentPage * itemsPerPage
  );

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
    paginationContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '20px',
    },
    paginationButton: {
      padding: '8px 16px',
      margin: '0 5px',
      cursor: 'pointer',
      borderRadius: '4px',
      backgroundColor: '#9e1c3f', // Same color theme as logout button
      color: '#fff',
      border: 'none',
      fontSize: '14px',
    },
    paginationButtonDisabled: {
      backgroundColor: '#ccc',
      cursor: 'not-allowed',
    },
    '@media (max-width: 768px)': {
      searchInput: {
        width: '95%',
      },
      table: {
        fontSize: '12px', // Smaller font size for mobile
      },
      th: {
        padding: '8px', // Smaller padding for mobile
      },
      td: {
        padding: '8px', // Smaller padding for mobile
      },
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
        </div>
        {!courseInfo && (
          <>
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
                {currentData.map((user) => (
                  <tr key={user._id}>
                    <td style={styles.td}>{user.CourseName}</td>
                    <td style={styles.td}>{user.Coordinator?.Name}</td>
                    <td style={styles.td}>{user.ProvidedBy}</td>
                    <td style={styles.td}>{user.Seats}</td>
                    <td style={styles.td}>
                      <button
                        style={styles.button}
                        onClick={(e) => handleClick(e, user)}
                      >
                        View Students
                      </button>
                      <button
                        style={styles.button}
                        onClick={(e) => handleDelete(e, user)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={styles.paginationContainer}>
              <button
                style={{
                  ...styles.paginationButton,
                  ...(currentPage === 1 ? styles.paginationButtonDisabled : {}),
                }}
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>Page {currentPage} of {totalPages}</span>
              <button
                style={{
                  ...styles.paginationButton,
                  ...(currentPage === totalPages ? styles.paginationButtonDisabled : {}),
                }}
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
        {courseInfo && (
          <>
            <h2>Student Details for Course: {courseInfo.CourseName}</h2>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Reg No</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Dept</th>
                </tr>
              </thead>
              <tbody>
                {currentStudentData.map((student) => (
                  <tr key={student._id}>
                    <td style={styles.td}>{student.Name}</td>
                    <td style={styles.td}>{student.RegNo}</td>
                    <td style={styles.td}>{student.Email}</td>
                    <td style={styles.td}>{student.Dept}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={styles.paginationContainer}>
              <button
                style={{
                  ...styles.paginationButton,
                  ...(currentStudentPage === 1 ? styles.paginationButtonDisabled : {}),
                }}
                onClick={handleStudentPreviousPage}
                disabled={currentStudentPage === 1}
              >
                Previous
              </button>
              <span>Page {currentStudentPage} of {totalStudentPages}</span>
              <button
                style={{
                  ...styles.paginationButton,
                  ...(currentStudentPage === totalStudentPages ? styles.paginationButtonDisabled : {}),
                }}
                onClick={handleStudentNextPage}
                disabled={currentStudentPage === totalStudentPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default HodTable;
