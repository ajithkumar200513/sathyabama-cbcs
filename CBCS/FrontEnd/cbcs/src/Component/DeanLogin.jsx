import React, { useState } from 'react';
import { useDeanLogin } from '../Hooks/UseDeanLogin';
import { useNavigate } from 'react-router-dom'; // Ensure react-router-dom is installed and set up
import logo from '../css/logo.png'; // Ensure the path is correct

const DeanLogin = () => {
  const [Email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useDeanLogin('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(Email, password);
  };

  const handleHomeClick = () => {
    navigate('/'); // Navigate to home page
  };

  const styles = {
    container: {
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
      position: 'relative',
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
    checkboxContainer: {
      display: 'flex',
      alignItems: 'center',
      marginTop: '10px',
    },
    checkboxLabel: {
      marginLeft: '8px',
      fontSize: '14px',
      color: '#333',
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
    checkboxInput: {
      marginRight: '8px',
    },
    homeButton: {
      position: 'absolute',
      top: '20px',
      left: '20px',
      padding: '10px 20px',
      borderRadius: '4px',
      border: 'none',
      backgroundColor: '#9e1c3f',
      color: '#fff',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      zIndex: 3, // Ensure the button is on top
    },
    homeButtonHover: {
      backgroundColor: '#c2185b',
    },
  };

  const [buttonHovered, setButtonHovered] = useState(false);
  const [homeButtonHovered, setHomeButtonHovered] = useState(false);

  return (
    <div style={styles.container}>
      <button
        style={{ ...styles.homeButton, ...(homeButtonHovered ? styles.homeButtonHover : {}) }}
        onMouseEnter={() => setHomeButtonHovered(true)}
        onMouseLeave={() => setHomeButtonHovered(false)}
        onClick={handleHomeClick}
      >
        Home
      </button>
      <div style={styles.formContainer}>
        <div style={styles.formHeader}>
          <p style={styles.formTitle}>Enter Your Details</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label htmlFor="Email" style={styles.label}>Email</label>
            <input
              id="Email"
              type="text"
              placeholder="Enter Your Email"
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
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter Your Password"
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div style={styles.checkboxContainer}>
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              style={styles.checkboxInput}
            />
            <label htmlFor="showPassword" style={styles.checkboxLabel}>Show Password</label>
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
  );
};

export default DeanLogin;
