import React, { useState } from 'react';
import DeanTable from './DeanTable';
import { UseDeanLogout } from '../Hooks/UseDeanLogout';
import { UseDeanAuthContext } from '../Hooks/UseDeanAuthContext';
import backgroundImage from '../css/logo.png'; // Update with your actual image path

export default function DeanHOME() {
  const [Dept, setDept] = useState('');
  const { DEAN } = UseDeanAuthContext();
  const { logout } = UseDeanLogout();

  const handleClick = async () => {
    logout();
  };

  const styles = {
    container: {
      position: 'relative', // Set relative positioning for the container
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center', // Center vertically
      alignItems: 'center', // Center horizontally
      height: '100vh',
      padding: '20px',
      boxSizing: 'border-box',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      overflow: 'auto', // Allow scrolling if content overflows
    },
    form: {
      width: '100%',
      maxWidth: '400px', // Adjusted width for the form
      padding: '20px',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      marginBottom: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', // Center form content
    },
    label: {
      display: 'block',
      marginBottom: '10px',
      fontWeight: 'bold',
      fontSize: '18px',
      color: '#333',
    },
    select: {
      width: '100%',
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      marginBottom: '20px',
      fontSize: '16px',
    },
    button: {
      padding: '10px 20px',
      borderRadius: '4px',
      border: 'none',
      backgroundColor: '#9e1c3f',
      color: '#fff',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      width: '100%',
      marginBottom: '10px',
    },
    buttonHover: {
      backgroundColor: '#c2185b',
    },
    logoutButton: {
      position: 'absolute', // Absolute positioning for the logout button
      top: '20px', // Distance from the top
      right: '20px', // Distance from the right
      padding: '10px 20px',
      borderRadius: '4px',
      border: 'none',
      backgroundColor: '#9e1c3f',
      color: '#fff',
      fontSize: '16px',
      cursor: 'pointer',
    },
  };

  const [buttonHovered, setButtonHovered] = useState(false);

  return (
    <div style={styles.container}>
      <button
        onClick={handleClick}
        style={styles.logoutButton}
      >
        Log Out
      </button>
      {!Dept && DEAN?.School === "School of Computing" && (
        <form style={styles.form}>
          <label htmlFor="Dept" style={styles.label}>Select Department</label>
          <select
            id="Dept"
            style={styles.select}
            value={Dept}
            onChange={(e) => setDept(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Department of Computer Science and Engineering">Department of Computer Science and Engineering</option>
            <option value="Department of Information Technology">Department of Information Technology</option>
          </select>
          <button
            type="button"
            style={{ ...styles.button, ...(buttonHovered ? styles.buttonHover : {}) }}
            onMouseEnter={() => setButtonHovered(true)}
            onMouseLeave={() => setButtonHovered(false)}
            onClick={() => {}}
          >
            Show Info
          </button>
        </form>
      )}
      {Dept && <DeanTable Dept={Dept} />}
    </div>
  );
}
