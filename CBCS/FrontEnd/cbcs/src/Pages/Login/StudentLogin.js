import React, { useState } from 'react';
import { useLogin } from '../../Hooks/useLogin';
import { Link } from 'react-router-dom';
import backgroundImage from '../Login/logo.png'; // Ensure this path is correct

const StudentLogin = () => {
  const [RegNo, setRegNo] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useLogin('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(RegNo, password);
  };

  const styles = {
    body: {
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
    header: {
      position: 'absolute',
      top: '20px',
      left: '20px',
    },
    homeButton: {
      padding: '10px 20px',
      backgroundColor: '#9e1c3f',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      textDecoration: 'none',
      fontSize: '16px',
      transition: 'background-color 0.3s',
    },
    homeButtonHover: {
      backgroundColor: '#c2185b',
    },
    linkStyle: {
      color: '#fff',
      textDecoration: 'none',
    },
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },
    rightSide: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    formGroup: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white
      padding: '30px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      maxWidth: '400px',
      width: '100%',
      textAlign: 'center',
    },
    text: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#333',
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
      marginBottom: '20px',
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
    error: {
      color: 'red',
      marginTop: '10px',
    },
    signupLink: {
      color: '#9e1c3f',
      textDecoration: 'none',
      fontSize: '16px',
    },
  };

  const [buttonHovered, setButtonHovered] = useState(false);

  return (
    <div style={styles.body}>
      <header style={styles.header}>
        <Link
          to="/"
          style={{ ...styles.homeButton, ...(buttonHovered ? styles.homeButtonHover : {}) }}
          onMouseEnter={() => setButtonHovered(true)}
          onMouseLeave={() => setButtonHovered(false)}
        >
          <span style={styles.linkStyle}>Home</span>
        </Link>
      </header>
      <div style={styles.container}>
        <div style={styles.rightSide}>
          <div style={styles.formGroup}>
            <p style={styles.text}>
              <b>Enter your Details.</b>
            </p>
            <form id="form" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="RegNo" style={styles.label}>Register Number</label>
                <input
                  id="RegNo"
                  type="text"
                  placeholder="Register Number"
                  style={styles.input}
                  value={RegNo}
                  onChange={(e) => setRegNo(e.target.value)}
                  required
                />
              </div>
              <div>
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
            {error && <div style={styles.error}>{error}</div>}
            <br />
            <Link to="/Student_Signup" style={styles.signupLink}>SIGNUP</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
