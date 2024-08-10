import React, { useState } from 'react';
import { useStaffLogin } from '../../Hooks/useStaffLogin';
import { Link } from 'react-router-dom';
import backgroundImage from '../Login/logo.png'; // Make sure this path is correct

const StudentLogin = () => {
  const [Email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useStaffLogin('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(Email, password);
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f0f0',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'relative',
    },
    leftSide: {
      flex: 1,
    },
    rightSide: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      width: '100%',
    },
    formContainer: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white
      padding: '30px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      maxWidth: '400px',
      width: '100%',
      textAlign: 'center',
      position: 'relative',
      zIndex: 2, // Ensure this is above the home button
    },
    formHeader: {
      marginBottom: '20px',
    },
    formTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      margin: 0,
      color: '#333',
    },
    formGroup: {
      marginBottom: '20px',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: 'bold',
      color: '#333',
    },
    input: {
      width: '100%',
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #ccc',
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
      transition: 'background-color 0.3s',
      width: '100%',
    },
    buttonHover: {
      backgroundColor: '#c2185b',
    },
    errorMessage: {
      color: 'red',
      marginTop: '10px',
    },
    homeButton: {
      position: 'absolute',
      top: '20px',
      left: '20px',
      padding: '10px 20px',
      backgroundColor: '#9e1c3f',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      zIndex: 1, // Ensure this is below the form container
    },
    homeButtonHover: {
      backgroundColor: '#c2185b',
    },
    linkStyle: {
      color: '#fff',
      textDecoration: 'none',
    },
  };

  const [buttonHovered, setButtonHovered] = useState(false);

  return (
    <div style={styles.container}>
      <button
        style={{ ...styles.homeButton, ...(buttonHovered ? styles.homeButtonHover : {}) }}
        onMouseEnter={() => setButtonHovered(true)}
        onMouseLeave={() => setButtonHovered(false)}
      >
        <Link to="/" style={styles.linkStyle}>Home</Link>
      </button>
      <div style={styles.rightSide}>
        <div style={styles.formContainer}>
          <div style={styles.formHeader}>
            <p style={styles.formTitle}>Enter your Details.</p>
          </div>
          <form id="form" onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label htmlFor="Email" style={styles.label}>Email</label>
              <input
                id="Email"
                type="text"
                placeholder="Email"
                style={styles.input}
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="Password" style={styles.label}>Password</label>
              <input
                id="Password"
                type="password"
                placeholder="Password"
                style={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              style={{ ...styles.button, ...(buttonHovered ? styles.buttonHover : {}) }}
              onMouseEnter={() => setButtonHovered(true)}
              onMouseLeave={() => setButtonHovered(false)}
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Log In'}
            </button>
          </form>
          {error && <div style={styles.errorMessage}>{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
