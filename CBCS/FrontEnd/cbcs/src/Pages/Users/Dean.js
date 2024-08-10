import React from 'react';
import backgroundImage from '../Users/logo.png'; // Replace with the actual path to your background image

const Dean = () => {
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
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.8)', // Added transparency to see background image
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      maxWidth: '400px',
      width: '100%',
    },
    formGroup: {
      marginBottom: '20px',
      width: '100%',
    },
    text: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '20px',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontSize: '16px',
      fontWeight: 'bold',
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
      transition: 'transform 0.2s',
      width: '100%',
    },
    buttonHover: {
      transform: 'scale(1.05)',
    },
    error: {
      color: 'red',
      marginTop: '5px',
    },
  };

  const [buttonHovered, setButtonHovered] = React.useState(false);

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.formGroup}>
          <p style={styles.text}>
            <b>Enter your Details.</b>
          </p>
        </div>
        <div style={styles.formGroup}>
          <form id="form" action="/">
            <div style={styles.formGroup}>
              <label htmlFor="Email" style={styles.label}>Email</label>
              <input id="ip1" type="email" placeholder="Email" style={styles.input} />
              <div style={styles.error} />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="Password" style={styles.label}>Password</label>
              <input id="Password" type="password" placeholder="Password" style={styles.input} />
              <div style={styles.error} />
            </div>
            <button
              type="submit"
              style={{ ...styles.button, ...(buttonHovered ? styles.buttonHover : {}) }}
              onMouseEnter={() => setButtonHovered(true)}
              onMouseLeave={() => setButtonHovered(false)}
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dean;
