import React, { useEffect, useState } from 'react';
import { useStaffAuthContext } from '../Hooks/useStaffAuthContext';
import bgImage from '../css/logo.png'; // Ensure this path is correct

const AttendenceInfo = () => {
  const { staff } = useStaffAuthContext();
  const [Date, setDates] = useState([]);
  const [pdate, setPDate] = useState('');
  const [attendencedata, setAttendenceData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateSearchQuery, setDateSearchQuery] = useState('');
  const [filteredDates, setFilteredDates] = useState([]);

  const handleclick = async (value) => {
    setPDate(value);
    const Data = { Id: `${staff.id}`, Date: `${value}` };
    const response = await fetch('http://localhost:4000/cbcs/staf/Attendence/Info', {
      method: 'POST',
      body: JSON.stringify(Data),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${staff.token}`,
      },
    });
    if (response.ok) {
      const json = await response.json();
      setAttendenceData(json.StudentInfo);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const Id = { Id: `${staff.id}` };
      const response = await fetch('http://localhost:4000/cbcs/staf/Attendence/Date', {
        method: 'POST',
        body: JSON.stringify(Id),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${staff.token}`,
        },
      });
      if (response.ok) {
        const json = await response.json();
        setDates(json);
        setFilteredDates(json);
      }
    };
    fetchData();
  }, [staff]);

  useEffect(() => {
    const filtered = Date.filter(date =>
      date.Date.includes(dateSearchQuery)
    );
    setFilteredDates(filtered);
  }, [dateSearchQuery, Date]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDateSearch = () => {
    const filtered = Date.filter(date =>
      date.Date.includes(dateSearchQuery)
    );
    setFilteredDates(filtered);
  };

  // Filter attendance data based on search query
  const filteredAttendenceData = attendencedata.filter(student =>
    student.StudentId.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.StudentId.RegNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      height: '100vh',
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: '20px',
      textAlign: 'center',
    },
    dateSearchContainer: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '10px',
    },
    searchContainer: {
      marginBottom: '10px',
    },
    searchInput: {
      padding: '5px',
      fontSize: '14px',
      borderRadius: '4px',
      border: '1px solid #ddd',
      marginRight: '10px',
    },
    searchButton: {
      padding: '5px 10px',
      borderRadius: '4px',
      border: 'none',
      backgroundColor: '#9e1c3f',
      color: '#fff',
      fontSize: '14px',
      cursor: 'pointer',
    },
    datesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
      gap: '5px',
      width: '100%',
      maxWidth: '600px',
    },
    dateItem: {
      padding: '10px',
      backgroundColor: '#9e1c3f',
      color: '#fff',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      textAlign: 'center',
      fontSize: '12px',
    },
    dateItemHover: {
      backgroundColor: '#c2185b',
    },
    table: {
      width: '100%',
      maxWidth: '1200px',
      margin: '10px 0',
      borderCollapse: 'collapse',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      overflowX: 'auto',
    },
    tableHeader: {
      backgroundColor: '#9e1c3f',
      color: '#fff',
    },
    tableHeaderCell: {
      padding: '10px',
      border: '1px solid #ccc',
    },
    tableBodyCell: {
      padding: '10px',
      border: '1px solid #ccc',
    },
    present: {
      color: 'green',
    },
    absent: {
      color: 'red',
    },
  };

  const [hovered, setHovered] = useState(null);

  return (
    <div style={styles.container}>
      {!pdate && (
        <div>
          <div style={styles.dateSearchContainer}>
            <input
              type="text"
              placeholder="Search dates"
              value={dateSearchQuery}
              onChange={(e) => setDateSearchQuery(e.target.value)}
              style={styles.searchInput}
            />
            <button onClick={handleDateSearch} style={styles.searchButton}>Search</button>
          </div>
          <div style={styles.datesGrid}>
            {filteredDates.map((value) => (
              <div
                key={value.Date}
                style={{
                  ...styles.dateItem,
                  ...(hovered === value.Date ? styles.dateItemHover : {}),
                }}
                onClick={() => handleclick(value.Date)}
                onMouseEnter={() => setHovered(value.Date)}
                onMouseLeave={() => setHovered(null)}
              >
                {value.Date}
              </div>
            ))}
          </div>
        </div>
      )}
      {pdate && (
        <div>
          <input
            type="text"
            placeholder="Search by Name or RegNo"
            value={searchQuery}
            onChange={handleSearchChange}
            style={styles.searchInput}
          />
          <table style={styles.table}>
            <thead style={styles.tableHeader}>
              <tr>
                <th style={styles.tableHeaderCell}>Name</th>
                <th style={styles.tableHeaderCell}>RegNo</th>
                <th style={styles.tableHeaderCell}>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttendenceData.map((value) => (
                <tr key={value.StudentId.RegNo}>
                  <td style={styles.tableBodyCell}>{value.StudentId.Name}</td>
                  <td style={styles.tableBodyCell}>{value.StudentId.RegNo}</td>
                  <td
                    style={{
                      ...styles.tableBodyCell,
                      ...(value.present ? styles.present : styles.absent),
                    }}
                  >
                    {value.present ? 'Present' : 'Absent'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AttendenceInfo;
