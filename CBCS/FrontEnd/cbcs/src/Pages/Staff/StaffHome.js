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
      minHeight: '100vh',
      backgroundColor: uploadedImage ? `url(${uploadedImage})` : '#f0f0f0',
      
      backgroundImage: `url(${defaultBackgroundImage})`,

      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      fontFamily: 'Arial, sans-serif',
    },
    sideNavbar: {
      flex: '0 0 250px',
      padding: '20px',
      backgroundColor: '#9e1c3f', // COE theme color from HodNav
      color: '#fff',
      borderRight: '1px solid #ddd',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    staffDetails: {
     textAlign: 'center',
      margin: '0 0 20px 0',
      fontSize: '24px',
      borderBottom: '2px solid #fff',
      paddingBottom: '10px',
    },
    info: {
      margin: '10px 0',
      fontWeight: 'bold',
    },
    navLinks: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    navButton: {
      width: '100%',
      padding: '10px 20px',
      margin: '10px 0',
      backgroundColor: '#c2185b', // Lighter shade for buttons from HodNav
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      textAlign: 'center',
      textDecoration: 'none',
      cursor: 'pointer',
      fontSize: '16px',
    },
    activeNavButton: {
      backgroundColor: '#d32f2f', // Hover effect color from HodNav
    },
    logoutButton: {
      marginTop: '20px',
      padding: '10px 20px',
      backgroundColor: '#c2185b', // Match button color with HodNav
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      textAlign: 'center',
      width: '92%',
    },
    tableContainer: {
      flex: 1,
      padding: '20px',
      overflowX: 'auto',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      margin: '20px',
      borderRadius: '8px',
    },
    searchContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '20px',
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
      marginBottom: '20px',
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
      marginTop: '20px',
    },
    paginationButton: {
      padding: '10px 20px',
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
        flex: '0 0 auto',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '10px',
      },
      navLinks: {
        flexDirection: 'row',
      },
      navButton: {
        margin: '0 10px',
      },
      tableContainer: {
        margin: '10px',
        padding: '10px',
      },
    },
  };



  return (
    <div style={styles.container}>
      {staff && (
        <div style={styles.sideNavbar}>
          <div style={styles.staffDetails}>
           <div><h3>Dashboard</h3></div>
            
          </div>
          <div style={styles.navLinks}>
            <NavLink to="/staf/Home/Attendence" style={styles.navButton} activeStyle={styles.activeNavButton}>Give Attendence</NavLink>
            <NavLink to="/staf/Home/Marks" style={styles.navButton} activeStyle={styles.activeNavButton}>Give Marks</NavLink>
            <NavLink to="/staf/Home/Attendence/Info" style={styles.navButton} activeStyle={styles.activeNavButton}>View Attendence Info</NavLink>
          </div>
          <button onClick={handleLogout} style={styles.logoutButton}>LOG OUT</button>
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
            <button onClick={() => setCurrentPage(1)} style={styles.searchButton}>Search</button>
          </div>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>RegNo</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>DEPT</th>
                <th style={styles.th}>Course</th>
                <th style={styles.th}>CAE-1</th>
                <th style={styles.th}>CAE-2</th>
                <th style={styles.th}>SEM</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.map((student, index) => (
                <tr key={index}>
                  <td style={styles.td}>{student.Name}</td>
                  <td style={styles.td}>{student.RegNo}</td>
                  <td style={styles.td}>{student.Email}</td>
                  <td style={styles.td}>{student.Dept}</td>
                  <td style={styles.td}>{student.Course}</td>
                  <td style={styles.td}>{student.CAE1? student.CAE1 : 'N/A'}</td>
                  <td style={styles.td}>{student.CAE2? student.CAE2 : 'N/A'}</td>
                  <td style={styles.td}>{student.SEM ? student.SEM : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={styles.pagination}>
            {Array.from({ length: Math.ceil(filteredData.length / studentsPerPage) }, (_, index) => (
              <button key={index + 1} onClick={() => paginate(index + 1)} style={styles.paginationButton}>{index + 1}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffHome;
