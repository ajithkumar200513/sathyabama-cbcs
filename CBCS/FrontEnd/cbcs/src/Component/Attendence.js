import React, { useEffect, useState } from 'react';
import { useStaffAuthContext } from '../Hooks/useStaffAuthContext';
import backgroundImage from '../css/logo.png'; // Make sure this path is correct

const AttendanceSheet = () => {
  const [Data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [Dates, setDates] = useState();
  const [curdate, setcur] = useState();
  const [resid, setresid] = useState();
  const { staff } = useStaffAuthContext();
  const today = new Date();
  const formattedDate = formatDate(today);
  const [loading, setLoading] = useState(true);
  const [attendance, setAttendance] = useState(null);

  const toggleAttendance = (studentId) => {
    setAttendance((prevAttendance) => ({
      ...prevAttendance,
      [studentId]: !prevAttendance[studentId],
    }));
  };

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch('http://localhost:4000/cbcs/staf/Attendence/' + staff.course_id, {
          headers: { 'Authorization': `Bearer ${staff.token}` }
        });
        const json = await response.json();
        if (response.ok) {
          setData(json);
          setFilteredData(json); // Set initial filtered data
        }
        setDates(json.map((value) => value.Attendence.map((v) => v.Date)));
        const resDate = await fetch('http://localhost:4000/cbcs/staf/Date/' + staff.id, {
          headers: { 'Authorization': `Bearer ${staff.token}` }
        });
        const ob = await resDate.json();
        setcur(ob.Date.toString());
        setresid(ob.StaffId);
      } catch (error) {
        console.error();
      } finally {
        setLoading(false);
      }
    };
    if (staff) {
      fetchdata();
    }
  }, [staff]);

  useEffect(() => {
    const updatedAttendance = {};
    if (Data) {
      Data.forEach((student) => {
        updatedAttendance[student._id] = false;
      });
      setAttendance(updatedAttendance);
    }
  }, [Data]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = Data.filter(student =>
        student.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.RegNo.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(Data);
    }
  }, [searchTerm, Data]);

  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const Date = { "Date": formattedDate.toString(), "Id": staff.id };
    const response = await fetch('http://localhost:4000/cbcs/staf/Attendence/Given', {
      method: 'POST',
      body: JSON.stringify(Date),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${staff.token}`
      }
    });

    Object.entries(attendance).map(async ([studentId, isPresent]) => {
      const course = { "Date": formattedDate.toString(), present: isPresent, Id: staff.id };
      const response = await fetch('http://localhost:4000/cbcs/staf/Attendence/Given/' + studentId, {
        method: 'POST',
        body: JSON.stringify(course),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${staff.token}`
        }
      });
    });

    Object.entries(attendance).map(async ([studentId, isPresent]) => {
      const course = { "Date": formattedDate.toString(), present: isPresent, Id: staff.id };
      const response1 = await fetch('http://localhost:4000/cbcs/staf/Attendence/student/given/' + studentId, {
        method: 'POST',
        body: JSON.stringify(course),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${staff.token}`
        }
      });
    });

    if (response.ok) {
      window.location.reload();
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      padding: '20px',
      minHeight: '100vh',
    },
    heading: {
      fontSize: '24px',
      color: '#333',
      marginBottom: '20px',
    },
    table: {
      width: '100%',
      maxWidth: '800px',
      marginBottom: '20px',
      borderCollapse: 'collapse',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    th: {
      backgroundColor: '#9e1c3f',
      color: '#fff',
      padding: '10px',
      textAlign: 'left',
    },
    td: {
      backgroundColor: '#fff',
      color: '#333',
      padding: '10px',
      borderBottom: '1px solid #ddd',
    },
    submitButton: {
      padding: '10px 20px',
      backgroundColor: '#9e1c3f',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
    },
    searchInput: {
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      fontSize: '16px',
      marginBottom: '20px',
      width: '80%',
      maxWidth: '400px',
    },
    searchButton: {
      padding: '10px 20px',
      backgroundColor: '#9e1c3f',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
      marginLeft: '10px',
    },
    searchContainer: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '20px',
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Attendance Sheet</h2>
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search by Name or Register Number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
        <button style={styles.searchButton} onClick={() => setFilteredData(Data.filter(student =>
          student.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.RegNo.toLowerCase().includes(searchTerm.toLowerCase())
        ))}>Search</button>
      </div>
      {(curdate === formattedDate) && (resid === staff.id) &&
        <label>Attendance already given</label>}
      {!(curdate === formattedDate && resid === staff.id) &&
        <form>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Student ID</th>
                <th style={styles.th}>Student Name</th>
                <th style={styles.th}>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((student) => (
                <tr key={student._id}>
                  <td style={styles.td}>{student.RegNo}</td>
                  <td style={styles.td}>{student.Name}</td>
                  <td style={styles.td}>
                    <input
                      type="checkbox"
                      checked={attendance[student._id]}
                      onChange={() => toggleAttendance(student._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button style={styles.submitButton} onClick={(e) => handleSubmit(e)}>SUBMIT</button>
        </form>
      }
    </div>
  );
};

export default AttendanceSheet;
