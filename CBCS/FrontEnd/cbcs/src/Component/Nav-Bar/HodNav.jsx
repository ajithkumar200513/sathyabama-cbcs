import React, { useState } from 'react';
import HodTable from '../HodTable';
import { Link } from 'react-router-dom';
import backgroundImage from '../Nav-Bar/logo.png'; // Make sure the image path is correct

const HodNav = ({ course, handelclick }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const styles = {
    bodyNav: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      width: '100%',
      margin: 0,
    },
    wrapperNav: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background to see the image
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
    sidebar: {
      width: '250px',
      backgroundColor: '#9e1c3f', // COE theme color
      color: '#fff',
      padding: '20px 10px',
      boxSizing: 'border-box',
      minHeight: '100vh',
      boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
    },
    sidebarH2: {
      textAlign: 'center',
      margin: '0 0 20px 0',
      fontSize: '24px',
      borderBottom: '2px solid #fff',
      paddingBottom: '10px',
    },
    sidebarUl: {
      listStyle: 'none',
      padding: 0,
    },
    sidebarLi: {
      padding: '15px',
      margin: '10px 0',
      backgroundColor: '#c2185b', // Slightly lighter shade for hover effect
      borderRadius: '5px',
      cursor: 'pointer',
      textAlign: 'center',
      transition: 'background-color 0.3s, transform 0.3s',
    },
    sidebarLiHover: {
      backgroundColor: '#d32f2f', // Hover effect color
      transform: 'scale(1.05)',
    },
    sidebarLink: {
      textDecoration: 'none',
      color: '#fff',
      display: 'block',
    },
    mainContent: {
      flex: 1,
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '10px',
      margin: '20px',
    },
    header: {
      backgroundColor: '#9e1c3f', // COE theme color
      color: '#fff',
      padding: '15px',
      textAlign: 'center',
      borderRadius: '5px',
      marginBottom: '20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    info: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '5px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    '@media (max-width: 768px)': {
      wrapperNav: {
        flexDirection: 'column',
      },
      sidebar: {
        width: '100%',
        minHeight: 'auto',
        textAlign: 'center',
      },
      sidebarLi: {
        display: 'inline-block',
        margin: '5px',
      },
      mainContent: {
        padding: '10px',
      },
    },
  };

  return (
    <div style={styles.bodyNav}>
      <div style={styles.wrapperNav}>
        <div style={styles.sidebar}>
          <h2 style={styles.sidebarH2}>DASHBOARD</h2>
          <ul style={styles.sidebarUl}>
            <li
              style={{
                ...styles.sidebarLi,
                ...(hoveredIndex === 0 ? styles.sidebarLiHover : {}),
              }}
              onMouseEnter={() => handleMouseEnter(0)}
              onMouseLeave={handleMouseLeave}
            >
              <Link to='/hod/student_info' style={styles.sidebarLink}>Student Info</Link>
            </li>
            <li
              style={{
                ...styles.sidebarLi,
                ...(hoveredIndex === 1 ? styles.sidebarLiHover : {}),
              }}
              onMouseEnter={() => handleMouseEnter(1)}
              onMouseLeave={handleMouseLeave}
            >
              <Link to='/hod/Create-course' style={styles.sidebarLink}>Create-Course</Link>
            </li>
            <li
              style={{
                ...styles.sidebarLi,
                ...(hoveredIndex === 2 ? styles.sidebarLiHover : {}),
              }}
              onMouseEnter={() => handleMouseEnter(2)}
              onMouseLeave={handleMouseLeave}
            >
              <a onClick={handelclick} style={{ ...styles.sidebarLink, cursor: 'pointer' }}>Log-out</a>
            </li>
          </ul>
        </div>
        <div style={styles.mainContent}>
          <div style={styles.header}>Welcome!! Have a nice day.</div>
          <div style={styles.info}>
            {course && <HodTable />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HodNav;
