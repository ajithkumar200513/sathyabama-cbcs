import React, { useState } from 'react';
import { useHodLogin } from '../../Hooks/useHodLogin';
import logo from '../Login/logo.png'; // Make sure this path is correct
import { Link } from 'react-router-dom';

const StudentLogin = () => {
  const [Email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useHodLogin('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(Email, password);
  };

  const styles = {
    bodyLog: {
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
      padding: '20px', // Added padding for responsiveness
    },
    containerLog: {
      padding: '30px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#fff',
      maxWidth: '400px',
      width: '100%', // Changed to 100% for responsiveness
      textAlign: 'center',
      zIndex: 2,
    },
    inputField: {
      position: 'relative',
      marginBottom: '20px',
    },
    input: {
      width: '100%',
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      fontSize: '16px',
    },
    underline: {
      position: 'absolute',
      bottom: '0',
      left: '0',
      height: '2px',
      width: '100%',
      backgroundColor: '#9e1c3f',
      transform: 'scaleX(0)',
      transition: 'transform 0.3s',
    },
    inputFieldFocused: {
      transform: 'scaleX(1)',
    },
    submitButton: {
      padding: '10px',
      borderRadius: '4px',
      border: 'none',
      backgroundColor: '#9e1c3f',
      color: '#fff',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'transform 0.2s',
      width: '100%',
    },
    submitButtonHover: {
      transform: 'scale(1.05)',
    },
    errorLog: {
      marginTop: '10px',
      color: 'red',
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
      zIndex: 1,
    },
    homeButtonHover: {
      backgroundColor: '#c2185b',
    },
  };

  const [buttonHovered, setButtonHovered] = useState(false);

  return (
    <div style={styles.bodyLog}>
      <button
        style={{ ...styles.homeButton, ...(buttonHovered ? styles.homeButtonHover : {}) }}
        onMouseEnter={() => setButtonHovered(true)}
        onMouseLeave={() => setButtonHovered(false)}
      >
        <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link>
      </button>
      <main style={styles.containerLog}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className='log-form'>
          <div style={styles.inputField}>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter Your Username"
              value={Email}
              onChange={(e) => { setEmail(e.target.value); }}
              style={styles.input}
              onFocus={(e) => e.target.nextElementSibling.style.transform = 'scaleX(1)'}
              onBlur={(e) => e.target.nextElementSibling.style.transform = 'scaleX(0)'}
            />
            <div style={styles.underline}></div>
          </div>
          <div style={styles.inputField}>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); }}
              style={styles.input}
              onFocus={(e) => e.target.nextElementSibling.style.transform = 'scaleX(1)'}
              onBlur={(e) => e.target.nextElementSibling.style.transform = 'scaleX(0)'}
            />
            <div style={styles.underline}></div>
          </div>
          <input
            type="submit"
            value="Login"
            style={{ ...styles.submitButton, ...(buttonHovered ? styles.submitButtonHover : {}) }}
            onMouseEnter={() => setButtonHovered(true)}
            onMouseLeave={() => setButtonHovered(false)}
          />
        </form>
        {error && <div style={styles.errorLog}>{error}</div>}
      </main>
    </div>
  );
}

export default StudentLogin;
