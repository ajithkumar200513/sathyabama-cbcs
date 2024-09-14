import React, { useEffect, useState } from 'react';
import { useStaffAuthContext } from '../Hooks/useStaffAuthContext';
import backgroundImage from '../css/logo.png'; // Ensure this path is correct

const CAE2 = () => {
  const [Data, setData] = useState([]);
  const { staff } = useStaffAuthContext();
  const [loading, setLoading] = useState(true);
  const [Marks, setMarks] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

  const styles = {
    container: {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
    },
    heading: {
      color: '#fff',
      backgroundColor: '#9e1c3f',
      padding: '10px 20px',
      borderRadius: '5px',
      marginBottom: '20px',
      textAlign: 'center',
    },
    form: {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '800px',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginBottom: '20px',
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
    input: {
      width: '100%',
      padding: '8px',
      marginBottom: '10px',
      borderRadius: '5px',
      border: '1px solid #ddd',
    },
    button: {
      backgroundColor: '#9e1c3f',
      color: '#fff',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#c2185b',
    },
    searchContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '20px',
    },
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '20px',
    },
    paginationButton: {
      backgroundColor: '#9e1c3f',
      color: '#fff',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      margin: '0 5px',
      transition: 'background-color 0.3s',
    },
  };

  const [buttonHover, setButtonHover] = useState(false);

  const MarkUpdate = (studentId, value) => {
    setMarks((prevMarks) => ({
      ...prevMarks,
      [studentId]: value,
    }));
  };

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch('https://sathyabama-cbcs.onrender.com/cbcs/staf/Attendence/' + staff.course_id, {
          headers: { 'Authorization': `Bearer ${staff.token}` }
        });
        if (response.ok) {
          const json = await response.json();
          setData(json);
        } else {
          console.error('Failed to fetch data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    if (staff) {
      fetchdata();
    }
  }, [staff]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const info = { CAE1: true, CAE2: true, SEM: false };
      const response = await fetch('https://sathyabama-cbcs.onrender.com/cbcs/staf/Marks/given/staffinfo/' + staff.id, {
        method: 'POST',
        body: JSON.stringify(info),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${staff.token}`
        }
      });
      if (!response.ok) {
        console.error('Failed to submit staff info:', response.statusText);
        return;
      }

      // Await all mark submissions
      await Promise.all(
        Object.entries(Marks).map(async ([studentId, marks]) => {
          const info = { Marks: marks };
          const response = await fetch('https://sathyabama-cbcs.onrender.com/cbcs/staf/Marks/given/CAE2/' + studentId, {
            method: 'POST',
            body: JSON.stringify(info),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${staff.token}`
            }
          });
          if (!response.ok) {
            console.error(`Failed to submit marks for student ${studentId}:`, response.statusText);
          }
        })
      );

      // Clear marks after successful submission
      setMarks({});
      alert('Marks submitted successfully.');
    } catch (error) {
      console.error('Error submitting marks:', error);
      alert('Failed to submit marks.');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  // Filtered data based on search term
  const filteredData = Data.filter(student =>
    student.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.RegNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>CAE-2</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search by Name or RegNo"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.input}
          />
        </div>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>REG-No</th>
              <th style={styles.th}>Marks</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((student) => (
              <tr key={student._id}>
                <td style={styles.td}>{student.Name}</td>
                <td style={styles.td}>{student.RegNo}</td>
                <td style={styles.td}>
                  <input
                    type='text'
                    onChange={(e) => MarkUpdate(student._id, e.target.value)}
                    style={styles.input}
                    value={Marks[student._id] || ''}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={styles.pagination}>
          <button
            type="button"
            style={styles.paginationButton}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            type="button"
            style={styles.paginationButton}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
        <button
          type="submit"
          style={{ ...styles.button, ...(buttonHover ? styles.buttonHover : {}) }}
          onMouseEnter={() => setButtonHover(true)}
          onMouseLeave={() => setButtonHover(false)}
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default CAE2;
