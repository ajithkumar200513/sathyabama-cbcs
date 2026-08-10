import React, { useState } from 'react';
import CoeTable from './CoeTable';
import { useCoeLogout } from '../Hooks/useCoeLogout';
import logo from '../css/logo.png';

export default function COEHOME() {
  const [Dept, setDept] = useState('');
  const [isHovered, setIsHovered] = useState(false); // State for hover effect
  const { logout } = useCoeLogout();

  const handleClick = async () => {
    logout();
  };

  const styles = {
    bodyC: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f0f0',

      backgroundImage: `url(${logo})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'relative',
    },
    mainC: {
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#fff',
      maxWidth: '400px',
      width: '90%',
      textAlign: 'center',
      backdropFilter: 'blur(5px)', // Optional: Adds a blur effect for better readability
      zIndex: 1,
    },
    formC: {
      display: 'flex',
      flexDirection: 'column',
    },
    label: {
      marginBottom: '10px',
      fontSize: '16px',
      fontWeight: 'bold',
    },
    select: {
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      marginBottom: '20px',
      fontSize: '16px',
    },
    button: {
      padding: '10px',
      borderRadius: '4px',
      border: 'none',
      backgroundColor: '#9e1c3f',
      color: '#fff',
      fontSize: '16px',
      cursor: 'pointer',
    },
    logoutButton: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      padding: '10px',
      borderRadius: '4px',
      border: 'none',
      backgroundColor: '#9e1c3f',
      color: '#fff',
      fontSize: '16px',
      cursor: 'pointer',
      zIndex: 0,
      transform: isHovered ? 'scale(1.1)' : 'scale(1)', // Scale on hover
      transition: 'transform 0.2s', // Smooth transition
    },
  };

  return (
    <div style={styles.bodyC}>
      <button
        onClick={handleClick}
        style={styles.logoutButton}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Logout
      </button>
      {!Dept && (
        <main style={styles.mainC}>
          <form style={styles.formC}>
            <br />
            <label htmlFor="Dept" style={styles.label}>
              Select Department
            </label>
            <select
              id="Dept"
              value={Dept}
              onChange={(e) => setDept(e.target.value)}
              style={styles.select}
            >
              <option value={null}>select</option>
              <option value="Department of Computer Science and Engineering">
                Department of Computer Science and Engineering
              </option>
              <option value="Department of Information Technology">
                Department of Information Technology
              </option>
              <option value="Department of Electronics and Communication Engineering">
                Department of Electronics and Communication Engineering
              </option>
              <option value="Department of Electrical and Electronics Engineering">
                Department of Electrical and Electronics Engineering
              </option>
              <option value="Department of Mechanical Engineering">
                Department of Mechanical Engineering
              </option>
              <option value="Department of BioTechnology">
                Department of BioTechnology
              </option>
            </select>
            <br />
            <button style={styles.button}>Show Info</button>
          </form>
        </main>
      )}
      {Dept && (
        <div>
          <CoeTable Dept={Dept} />
        </div>
      )}
    </div>
  );
}
