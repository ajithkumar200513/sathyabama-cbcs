import React from 'react'
import { Link } from 'react-router-dom'
import backgroundImage from '../css/logo.png'; // Make sure this path is correct

const Marks = () => {
  const styles = {
    container: {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    topNav: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px 20px',
      backgroundColor: 'rgba(158, 28, 63, 0.7)', // Adjust to a slightly transparent theme color
      flexWrap: 'wrap',
    },
    navLinks: {
      display: 'flex',
      gap: '15px',
      color: '#fff',
      flexWrap: 'wrap',
    },
    link: {
      color: 'white',
      textDecoration: 'none',
      padding: '10px 15px',
      borderRadius: '5px',
      transition: 'background-color 0.3s',
      textAlign: 'center',
      margin: '5px 0',
      display: 'inline-block',
      backgroundColor: ' rgba(158, 28, 63, 1)', // Transparent white background
    },
    linkHover: {
      backgroundColor: 'rgba(158, 28, 63, 0.9)', // Slightly less transparent on hover
    },
    content: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
    },
    marksContainer: {
      backgroundColor: 'rgba(255, 255, 255, 0.7)', // Transparent white background
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      width: '14%',
      maxWidth: '400px',
    },
    marksNav: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
  };

  const [homeLinkHovered, setHomeLinkHovered] = React.useState(false);
  const [logoutLinkHovered, setLogoutLinkHovered] = React.useState(false);
  const [cae1LinkHovered, setCae1LinkHovered] = React.useState(false);
  const [cae2LinkHovered, setCae2LinkHovered] = React.useState(false);
  const [semLinkHovered, setSemLinkHovered] = React.useState(false);

  return (
    <div style={styles.container}>
      {/* Top navbar */}
      <nav style={styles.topNav}>
        <div style={styles.navLinks}>
          <Link 
            to="/staf/Home" 
            style={{ ...styles.link, ...(homeLinkHovered ? styles.linkHover : {}) }}
            onMouseEnter={() => setHomeLinkHovered(true)}
            onMouseLeave={() => setHomeLinkHovered(false)}
          >
            Home
          </Link>
          <Link 
            to="/staf/Home" 
            onClick={() => alert('Logout functionality here')} 
            style={{ ...styles.link, ...(logoutLinkHovered ? styles.linkHover : {}) }}
            onMouseEnter={() => setLogoutLinkHovered(true)}
            onMouseLeave={() => setLogoutLinkHovered(false)}
          >
            Log Out
          </Link>
        </div>
      </nav>

      {/* Content area */}
      <div style={styles.content}>
        <div style={styles.marksContainer}>
          <nav style={styles.marksNav}>
            <Link 
              to='/staf/Home/Marks/CAE-1' 
              style={{ ...styles.link, ...(cae1LinkHovered ? styles.linkHover : {}) }}
              onMouseEnter={() => setCae1LinkHovered(true)}
              onMouseLeave={() => setCae1LinkHovered(false)}
            >
              CAE-1
            </Link>
            <Link 
              to='/staf/Home/Marks/CAE-2' 
              style={{ ...styles.link, ...(cae2LinkHovered ? styles.linkHover : {}) }}
              onMouseEnter={() => setCae2LinkHovered(true)}
              onMouseLeave={() => setCae2LinkHovered(false)}
            >
              CAE-2
            </Link>
            <Link 
              to='/staf/Home/Marks/SEM' 
              style={{ ...styles.link, ...(semLinkHovered ? styles.linkHover : {}) }}
              onMouseEnter={() => setSemLinkHovered(true)}
              onMouseLeave={() => setSemLinkHovered(false)}
            >
              SEM
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Marks
