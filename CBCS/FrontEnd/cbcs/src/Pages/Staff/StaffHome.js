import React, { useEffect, useState } from 'react';
import { useStaffAuthContext } from '../../Hooks/useStaffAuthContext';
import { useStaffLogout } from '../../Hooks/useStaffLogout';
import { NavLink } from 'react-router-dom';
import defaultBackgroundImage from '../Login/logo.png'; // Ensure this path is correct

const StaffHome = () => {
  const { staff } = useStaffAuthContext();
  const { logout } = useStaffLogout();
  const [data, setData] = useState([]);
  const [profilePic, setProfilePic] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(10);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://sathyabama-cbcs.onrender.com/cbcs/staf/RegStudent/${staff.id}`, {
          headers: { Authorization: `Bearer ${staff.token}` }
        });
        const json = await response.json();
        if (response.ok) {
          setData(json);
        } else {
          console.error('Error fetching student data:', json);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    if (staff) {
      fetchData();
    }
  }, [staff]);

  useEffect(() => {
    const handleOrientationChange = () => {
      if (window.matchMedia("(orientation: portrait)").matches) {
        alert("For the best experience, please switch to landscape mode.");
      }
    };

    handleOrientationChange(); // Check on mount
    window.addEventListener('resize', handleOrientationChange);
    return () => window.removeEventListener('resize', handleOrientationChange);
  }, []);

  const handleLogout = async () => {
    logout();
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setUploadedImage(reader.result);
    };
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter data based on the search query
  const filteredData = data.flatMap(course =>
    course.RegStudents.filter(student =>
      student.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.RegNo.toLowerCase().includes(searchQuery.toLowerCase())
    ).map(student => ({
      ...student,
      Course: course.CourseName // Add the course name to each student
    }))
  );

  // Paginate the filtered data
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredData.slice(indexOfFirstStudent, indexOfLastStudent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column', // Adjust for mobile view (top-down)
      minHeight: '100vh',
      backgroundColor: uploadedImage ? `url(${uploadedImage})` : '#f0f0f0',
      backgroundImage: `url(${defaultBackgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      fontFamily: 'Arial, sans-serif',
    },
    sideNavbar: {
      flex: '0 0 auto',
      padding: '10px',
      backgroundColor: '#9e1c3f', // COE theme color from HodNav
      color: '#fff',
      display: 'flex',
      flexDirection: 'row', // For mobile, nav will be on top
      justifyContent: 'space-around',
      alignItems: 'center',
      borderBottom: '2px solid #ddd',
    },
    staffDetails: {
      textAlign: 'center',
      fontSize: '20px',
      borderBottom: '2px solid #fff',
      paddingBottom: '10px',
    },
    navLinks: {
      display: 'flex',
      flexDirection: 'row',
    },
    navButton: {
      padding: '10px',
      margin: '5px',
      backgroundColor: '#c2185b', // Lighter shade for buttons from HodNav
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      textAlign: 'center',
      textDecoration: 'none',
      cursor: 'pointer',
      fontSize: '14px',
      flex: '1', // Make the buttons take equal space in mobile view
    },
    logoutButton: {
      marginTop: '10px',
      padding: '10px 20px',
      backgroundColor: '#c2185b', // Match button color with HodNav
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      textAlign: 'center',
      flex: '1',
    },
    tableContainer: {
      flex: 1,
      padding: '10px',
      overflowX: 'auto',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      margin: '10px 0',
      borderRadius: '8px',
    },
    searchContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '10px',
    },
    searchInput: {
      padding: '10px',
      fontSize: '16px',
      borderRadius: '4px',
      border: '1px solid #ddd',
      marginRight: '10px',
      flex: '1',
    },
    searchButton: {
      padding: '10px 20px',
      backgroundColor: '#c2185b', // Match button color with HodNav
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginBottom: '10px',
    },
    th: {
      padding: '10px',
      border: '1px solid #ddd',
      backgroundColor: '#f2f2f2',
      textAlign: 'left',
    },
    td: {
      padding: '10px',
      border: '1px solid #ddd',
      textAlign: 'left',
    },
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '10px',
    },
    paginationButton: {
      padding: '10px',
      margin: '0 5px',
      border: 'none',
      backgroundColor: '#c2185b', // Match button color with HodNav
      color: '#fff',
      cursor: 'pointer',
    },
   '@media (max-width: 768px)': {
      container: {
        flexDirection: 'column',
      },
      sideNavbar: {
        position: 'fixed',
        top: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '10px',
        zIndex: 10,
      },
      tableContainer: {
        marginTop: '100px', // Leave space for the navbar
        padding: '10px',
      },
      navButton: {
        margin: '0 10px',
        padding: '8px 10px',
        fontSize: '14px',
      },
      navLinks: {
        flexDirection: 'row',
      },
    },
  };

  return (
    <div style={styles.container}>
      {staff && (
        <div style={styles.sideNavbar}>
          <div style={styles.staffDetails}>
            <h3>Dashboard</h3>
          </div>
          <div style={styles.navLinks}>
            <NavLink to="/staf/Home/Attendence" style={styles.navButton}>
              Give Attendance
            </NavLink>
            <NavLink to="/staf/Home/Marks" style={styles.navButton}>
              Give Marks
            </NavLink>
            <NavLink to="/staf/Home/Attendence/Info" style={styles.navButton}>
              View Attendance Info
            </NavLink>
            <button onClick={handleLogout} style={styles.logoutButton}>
              LOG OUT
            </button>
          </div>
        </div>
      )}
      {data.length > 0 && (
        <div style={styles.tableContainer}>
          <div style={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search students by Name or RegNo..."
              value={searchQuery}
              onChange={handleSearchChange}
              style={styles.searchInput}
            />
            <button onClick={() => setCurrentPage(1)} style={styles.searchButton}>
              Search
            </button>
          </div>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>RegNo</th>
                <th style={styles.th}>Course</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.map((student, index) => (
                <tr key={index}>
                  <td style={styles.td}>{student.Name}</td>
                  <td style={styles.td}>{student.RegNo}</td>
                  <td style={styles.td}>{student.Course}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={styles.pagination}>
            {Array.from(
              { length: Math.ceil(filteredData.length / studentsPerPage) },
              (_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  style={styles.paginationButton}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffHome;
