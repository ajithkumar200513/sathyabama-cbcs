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
      const response = await fetch(`http://localhost:4000/cbcs/staf/RegStudent/${staff.id}`, {
        headers: { Authorization: `Bearer ${staff.token}` }
      });
      const json = await response.json();
      if (response.ok) {
        setData(json);
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
      backgroundColor: '#9e1c3f', // Theme color
      color: '#fff',
      borderRight: '1px solid #ddd',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    staffDetails: {
      textAlign: 'center',
      marginBottom: '20px',
    },
    profilePicContainer: {
      marginBottom: '20px',
    },
    profilePic: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
    },
    uploadBox: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      border: '2px dashed #ccc',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      position: 'relative',
    },
    uploadBoxInput: {
      position: 'absolute',
      opacity: 0,
      width: '100%',
      height: '100%',
      cursor: 'pointer',
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
      backgroundColor: '#721022',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      textAlign: 'center',
      textDecoration: 'none',
      cursor: 'pointer',
      fontSize: '16px',
    },
    activeNavButton: {
      backgroundColor: '#9e1c3f',
    },
    logoutButton: {
      marginTop: '20px',
      padding: '10px 20px',
      backgroundColor: '#721022',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      textAlign: 'center',
      width: '100%',
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
      backgroundColor: '#721022',
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
      backgroundColor: '#721022',
      color: '#fff',
      cursor: 'pointer',
    },
    imageUploadButton: {
      marginTop: '20px',
      padding: '10px 20px',
      backgroundColor: '#721022',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      textAlign: 'center',
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
            <div style={styles.profilePicContainer}>
              {profilePic ? (
                <img src={profilePic} alt="Profile" style={styles.profilePic} />
              ) : (
                <div style={styles.uploadBox}>
                  <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
                    <span>Upload</span>
                  </label>
                  <input
                    type="file"
                    id="file-upload"
                    onChange={handleProfilePicChange}
                    style={styles.uploadBoxInput}
                  />
                </div>
              )}
            </div>
            <p style={styles.info}>{staff.Name}</p>
            <p style={styles.info}>{staff.Email}</p>
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
