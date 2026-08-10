import React, { useEffect, useState } from 'react';
import { useHodAuthContext } from '../Hooks/useHodAuthContext';
import backgroundImage from '../css/logo.png'; // Ensure the image path is correct

const HodStudent = () => {
  const { HOD } = useHodAuthContext();
  const [Attendence, setAttendance] = useState(false);
  const [Attendencesheet, setAttendancesheet] = useState([]);
  const [Data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [currentAttendancePage, setCurrentAttendancePage] = useState(1);
  const itemsPerPage = 10; // Number of items per page for both tables

  useEffect(() => {
    const fetchdata = async () => {
      const reqbody = { "Dept": HOD.Dept };
      const response = await fetch('https://sathyabama-cbcs.onrender.com/cbcs/hod/studinfo', {
        method: 'POST',
        body: JSON.stringify(reqbody),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${HOD.token}`
        }
      });
      const json = await response.json();
      if (response.ok) {
        setData(json);
      }
    };
    fetchdata();
  }, [HOD.Dept, HOD.token]);

  const handelclick = (value) => {
    setAttendancesheet(value);
    setAttendance(true);
    setCurrentAttendancePage(1); // Reset attendance pagination to the first page
  };

  const percentage = (value) => {
    let count = 0;
    value.map((item) => {
      if (item.present) {
        count += 1;
      }
      return null;
    });
    let per = (count / value.length) * 100;
    return per.toFixed(2) + '%';
  };

  // Pagination logic for students
  const filteredData = Data.filter((value) =>
    value.Name.toLowerCase().includes(search.toLowerCase()) ||
    value.RegNo.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (direction) => {
    if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Pagination logic for attendance
  const indexOfLastAttendanceItem = currentAttendancePage * itemsPerPage;
  const indexOfFirstAttendanceItem = indexOfLastAttendanceItem - itemsPerPage;
  const currentAttendanceItems = Attendencesheet.slice(indexOfFirstAttendanceItem, indexOfLastAttendanceItem);
  const totalAttendancePages = Math.ceil(Attendencesheet.length / itemsPerPage);

  const handleAttendancePageChange = (direction) => {
    if (direction === 'next' && currentAttendancePage < totalAttendancePages) {
      setCurrentAttendancePage(currentAttendancePage + 1);
    } else if (direction === 'prev' && currentAttendancePage > 1) {
      setCurrentAttendancePage(currentAttendancePage - 1);
    }
  };

  const styles = {
    container: {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      color: '#333',
      overflowX: 'hidden', // Prevent horizontal scroll
    },
    table: {
      width: '100%',
      maxWidth: '1000px', // Adjust maxWidth to fit content within screen
      borderCollapse: 'collapse',
      marginTop: '20px',
      backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent background to enhance readability
      borderRadius: '8px', // Slightly smaller border radius
      overflow: 'hidden',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Adjusted shadow for a smaller table
    },
    th: {
      padding: '8px', // Reduced padding for smaller table cells
      backgroundColor: '#9e1c3f', // COE theme color
      color: '#fff',
      textAlign: 'left',
      fontSize: '14px', // Adjusted font size
    },
    td: {
      padding: '8px', // Reduced padding for smaller table cells
      textAlign: 'left',
      borderBottom: '1px solid #ddd',
      fontSize: '14px', // Adjusted font size
    },
    tr: {
      backgroundColor: '#fff',
    },
    trAlt: {
      backgroundColor: '#f9f9f9',
    },
    button: {
      padding: '6px 12px', // Smaller padding for buttons
      backgroundColor: '#9e1c3f', // COE theme color
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      fontSize: '14px', // Adjusted font size
    },
    buttonHover: {
      backgroundColor: '#d32f2f',
    },
    searchContainer: {
      display: 'flex',
      flexDirection: 'column', // Stack input and button vertically on smaller screens
      alignItems: 'center',
      marginTop: '20px',
      gap: '10px',
    },
    searchInput: {
      padding: '8px', // Reduced padding for search input
      borderRadius: '5px',
      border: '1px solid #ccc',
      fontSize: '14px', // Reduced font size for smaller search input
      width: '100%', // Full width on smaller screens
      maxWidth: '300px', // Limit the width on larger screens
    },
    searchButton: {
      padding: '8px 16px', // Reduced padding for search button
      backgroundColor: '#9e1c3f', // COE theme color
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      fontSize: '14px', // Adjusted font size
    },
    searchButtonHover: {
      backgroundColor: '#d32f2f',
    },
    pagination: {
      marginTop: '20px',
      display: 'flex',
      justifyContent: 'center',
      gap: '5px',
    },
    pageButton: {
      padding: '6px 12px', // Reduced padding for pagination buttons
      backgroundColor: '#9e1c3f', // COE theme color
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      fontSize: '14px', // Adjusted font size
    },
    pageButtonDisabled: {
      backgroundColor: '#ddd',
      cursor: 'not-allowed',
    },
  };
  
  return (
    <div style={styles.container}>
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search by name or reg no..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />
        <button style={styles.searchButton}>Search</button>
      </div>
      {!Attendence && (
        <>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>RegNo</th>
                <th style={styles.th}>Section</th>
                <th style={styles.th}>Registered Course</th>
                <th style={styles.th}>Attendance</th>
                <th style={styles.th}>Percentage</th>
                <th style={styles.th}>CAE-1</th>
                <th style={styles.th}>CAE-2</th>
                <th style={styles.th}>SEM</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((value, index) => (
                <tr key={index} style={index % 2 === 0 ? styles.tr : styles.trAlt}>
                  <td style={styles.td}>{value.Name}</td>
                  <td style={styles.td}>{value.RegNo}</td>
                  <td style={styles.td}>A1</td>
                  <td style={styles.td}>{value.CourseInfo ? value.CourseInfo.CourseName : 'N/A'}</td>
                  <td style={styles.td}>
                    <button
                      style={styles.button}
                      onClick={() => handelclick(value.Attendence)}
                    >
                      View Attendance
                    </button>
                  </td>
                  <td style={styles.td}>{percentage(value.Attendence)}</td>
                  <td style={styles.td}>{value.CAE1 ? value.CAE1 :'N/A'}  </td>
                  <td style={styles.td}>{value.CAE2? value.CAE2 :'N/A'}</td>
                  <td style={styles.td}>{value.SEM? value.SEM :'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={styles.pagination}>
            <button
              style={{ ...styles.pageButton, ...(currentPage === 1 ? styles.pageButtonDisabled : {}) }}
              onClick={() => handlePageChange('prev')}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>{currentPage} of {totalPages}</span>
            <button
              style={{ ...styles.pageButton, ...(currentPage === totalPages ? styles.pageButtonDisabled : {}) }}
              onClick={() => handlePageChange('next')}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
      {Attendence && (
        <>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {currentAttendanceItems.map((value, index) => (
                <tr key={index} style={index % 2 === 0 ? styles.tr : styles.trAlt}>
                  <td style={styles.td}>{value.Date}</td>
                  <td style={styles.td}>{value.present ? 'Present' : 'Absent'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={styles.pagination}>
            <button
              style={{ ...styles.pageButton, ...(currentAttendancePage === 1 ? styles.pageButtonDisabled : {}) }}
              onClick={() => handleAttendancePageChange('prev')}
              disabled={currentAttendancePage === 1}
            >
              Previous
            </button>
            <span>{currentAttendancePage} of {totalAttendancePages}</span>
            <button
              style={{ ...styles.pageButton, ...(currentAttendancePage === totalAttendancePages ? styles.pageButtonDisabled : {}) }}
              onClick={() => handleAttendancePageChange('next')}
              disabled={currentAttendancePage === totalAttendancePages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default HodStudent;
