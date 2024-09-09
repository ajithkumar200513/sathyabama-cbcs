import React, { useEffect, useState } from 'react';
import { useCoeAuthContext } from "../Hooks/UseCoeAuthContext";

const CoeTable = ({ Dept }) => {
  const { COE } = useCoeAuthContext();
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const ip = { "Dept": Dept };

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://sathyabama-cbcs.onrender.com/cbcs/COE/getstudinfo`, {
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

    handleOrientationChange();
    window.addEventListener('resize', handleOrientationChange);
    return () => {
      window.removeEventListener('resize', handleOrientationChange);
    };
  }, []);

  const handlePrint = () => {
    const printContents = document.getElementById('printable-table').innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

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
    printButton: {
      position: 'absolute',
      top: '10px',
      left: '10px',
      padding: '10px 20px',
      backgroundColor: 'rgba(158, 28, 63, 0.9)',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
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
      maxWidth: '400px',
    },
    studentDetails: {
      width: '100%',
      maxWidth: '1000px',
      overflowX: 'auto',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: '14px',
    },
    th: {
      fontWeight: 'bold',
      textAlign: 'left',
      padding: '10px',
      backgroundColor: '#f2f2f2',
      borderBottom: '2px solid #ddd',
    },
    td: {
      textAlign: 'left',
      padding: '10px',
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
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '20px',
      gap: '10px',
    },
    paginationButton: {
      padding: '8px 16px',
      margin: '0 5px',
      cursor: 'pointer',
      borderRadius: '4px',
      backgroundColor: 'rgba(158, 28, 63, 0.9)',
      color: '#fff',
      border: 'none',
      fontSize: '14px',
    },
    paginationButtonDisabled: {
      backgroundColor: '#ccc',
      cursor: 'not-allowed',
    },
    pageIndicator: {
      fontSize: '14px',
      color: '#333',
    },
    '@media (max-width: 768px)': {
      searchInput: {
        width: '95%',
      },
      table: {
        fontSize: '12px',
      },
      th: {
        padding: '8px',
      },
      td: {
        padding: '8px',
      },
    },
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  return (
    <div style={styles.studentContainer}>
      {/* Print Button */}
      <button style={styles.printButton} onClick={handlePrint}>Print</button>
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search by Name or Register Number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
      </div>
      <div style={styles.studentDetails} id="printable-table">
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Register Number</th>
              <th style={styles.th}>Gender</th>
              <th style={styles.th}>Date of Birth</th>
              <th style={styles.th}>Department</th>
              <th style={styles.th}>Course</th>
              <th style={styles.th}>CAE_1</th>
              <th style={styles.th}>CAE_2</th>
              <th style={styles.th}>SEM</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((value, index) => (
              <tr key={index} style={styles.tr}>
                <td style={styles.td}>{value.Name}</td>
                <td style={styles.td}>{value.RegNo}</td>
                <td style={styles.td}>{value.Gender}</td>
                <td style={styles.td}>{value.DOB}</td>
                <td style={styles.td}>{value.Dept}</td>
                <td style={styles.td}>{value.CourseInfo ? value.CourseInfo.CourseName : "Not Registered"}</td>
                <td style={styles.td}>{value.CAE1 ? value.CAE1 : "N/A"}</td>
                <td style={styles.td}>{value.CAE2 ? value.CAE2 : "N/A"}</td>
                <td style={styles.td}>{value.SEM ? value.SEM : "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={styles.pagination}>
        <button
          style={{ ...styles.paginationButton, ...(currentPage === 1 ? styles.paginationButtonDisabled : {}) }}
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span style={styles.pageIndicator}>Page {currentPage} of {totalPages}</span>
        <button
          style={{ ...styles.paginationButton, ...(currentPage === totalPages ? styles.paginationButtonDisabled : {}) }}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CoeTable;
