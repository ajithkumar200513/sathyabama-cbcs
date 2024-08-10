import React, { useEffect, useState } from 'react';
import { useHodAuthContext } from '../Hooks/useHodAuthContext';
import backgroundImage from '../css/logo.png'; // Ensure the image path is correct

const HodStudent = () => {
  const { HOD } = useHodAuthContext();
  const [Attendence, setAttendance] = useState(false);
  const [Attendencesheet, setAttendancesheet] = useState([]);
  const [Data, setData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchdata = async () => {
      const reqbody = { "Dept": HOD.Dept };
      const response = await fetch('http://localhost:4000/cbcs/hod/studinfo', {
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
  }, [setAttendancesheet]);

  const handelclick = (value) => {
    setAttendancesheet(value);
    setAttendance(true);
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
    },
    table: {
      width: '100%',
      maxWidth: '1200px',
      borderCollapse: 'collapse',
      marginTop: '20px',
      backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent background to enhance readability
      borderRadius: '10px',
      overflow: 'hidden',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    th: {
      padding: '10px',
      backgroundColor: '#9e1c3f', // COE theme color
      color: '#fff',
      textAlign: 'left',
    },
    td: {
      padding: '10px',
      textAlign: 'left',
      borderBottom: '1px solid #ddd',
    },
    tr: {
      backgroundColor: '#fff',
    },
    trAlt: {
      backgroundColor: '#f9f9f9',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#9e1c3f', // COE theme color
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#d32f2f',
    },
    searchContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '20px',
    },
    searchInput: {
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      fontSize: '16px',
      marginRight: '10px',
    },
    searchButton: {
      padding: '10px 20px',
      backgroundColor: '#9e1c3f', // COE theme color
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    searchButtonHover: {
      backgroundColor: '#d32f2f',
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
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>RegNo</th>
              <th style={styles.th}>Section</th>
              <th style={styles.th}>Registered Course</th>
              <th style={styles.th}>Attendance</th>
              <th style={styles.th}>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {Data.filter((value) =>
              value.Name.toLowerCase().includes(search.toLowerCase()) ||
              value.RegNo.toLowerCase().includes(search.toLowerCase())
            ).map((value, index) => (
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
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {Attendence && (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Attendance</th>
            </tr>
          </thead>
          <tbody>
            {Attendencesheet.map((value, index) => (
              <tr key={index} style={index % 2 === 0 ? styles.tr : styles.trAlt}>
                <td style={styles.td}>{value.Date}</td>
                <td style={styles.td}>{value.present ? 'Present' : 'Absent'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HodStudent;
