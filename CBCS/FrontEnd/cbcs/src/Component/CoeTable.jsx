import React, { useEffect, useState } from 'react';
import { useCoeAuthContext } from "../Hooks/UseCoeAuthContext";

const CoeTable = ({ Dept }) => {
  const { COE } = useCoeAuthContext();
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const ip = { "Dept": Dept };

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://localhost:4000/cbcs/COE/getstudinfo`, {
        method: 'POST',
        body: JSON.stringify(ip),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${COE.token}`
        }
      });
      const json = await response.json();
      if (!response.ok) {
        console.log("Error in response");
      }
      if (response.ok) {
        setData(json);
        setFilteredData(json);
      }
    }
    fetchData();
  }, [Dept, COE.token]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = data.filter(student =>
        student.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.RegNo.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [searchTerm, data]);

  useEffect(() => {
    const handleOrientationChange = () => {
      if (window.innerWidth < 768 && window.innerHeight > window.innerWidth) {
        alert('For a better experience, please rotate your device to landscape mode.');
      }
    };

    // Check orientation on component mount
    handleOrientationChange();

    // Listen for orientation changes
    window.addEventListener('resize', handleOrientationChange);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleOrientationChange);
    };
  }, []);

  const styles = {
    studentContainer: {
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
      minHeight: '100vh',
    },
    searchContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '20px',
      width: '100%',
    },
    searchInput: {
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      fontSize: '16px',
      marginBottom: '10px',
      width: '80%',
      maxWidth: '500px',
    },
    studentDetails: {
      width: '100%',
      maxWidth: '1200px',
      overflowX: 'auto',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    th: {
      fontWeight: 'bold',
      textAlign: 'left',
      padding: '12px',
      backgroundColor: '#f2f2f2',
      borderBottom: '2px solid #ddd',
    },
    td: {
      textAlign: 'left',
      padding: '12px',
      borderBottom: '1px solid #ddd',
    },
    tr: {
      backgroundColor: '#fff',
      '&:nth-of-type(even)': {
        backgroundColor: '#f9f9f9',
      },
      '&:hover': {
        backgroundColor: '#f1f1f1',
      },
    },
    '@media (max-width: 768px)': {
      searchInput: {
        width: '95%',
      },
      table: {
        fontSize: '14px',
      },
      th: {
        padding: '10px',
      },
      td: {
        padding: '10px',
      },
    },
  };

  return (
    <div style={styles.studentContainer}>
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search by Name or Register Number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
      </div>
      <div style={styles.studentDetails}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Register Number</th>
              <th style={styles.th}>Gender</th>
              <th style={styles.th}>Date of Birth</th>
              <th style={styles.th}>Department</th>
              <th style={styles.th}>Course</th>
              <th style={styles.th}>Marks</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((value, index) => (
              <tr key={index} style={styles.tr}>
                <td style={styles.td}>{value.Name}</td>
                <td style={styles.td}>{value.RegNo}</td>
                <td style={styles.td}>{value.Gender}</td>
                <td style={styles.td}>{value.DOB}</td>
                <td style={styles.td}>{value.Dept}</td>
                <td style={styles.td}>{value.CourseInfo ? value.CourseInfo.CourseName : "Not Registered"}</td>
                <td style={styles.td}>{value.Marks ? value.Marks.CAE1 : "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CoeTable;
