import React, { useState } from 'react';
import backgroundImage from '../css/logo.png'; // Adjust the path to your image

const HodAbout = () => {
  const [photoUrl, setPhotoUrl] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      minHeight: '100vh',
    },
    profileContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '20px',
      backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background for the profile section
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
    uploadButton: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      backgroundColor: '#9e1c3f', // COE theme color
      color: '#fff',
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      textAlign: 'center',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    uploadButtonHover: {
      backgroundColor: '#d32f2f',
    },
    profileImg: {
      width: '150px',
      height: '150px',
      borderRadius: '50%',
      objectFit: 'cover',
      marginBottom: '10px',
    },
    uploadPlaceholder: {
      backgroundColor: '#ddd',
      borderRadius: '50%',
      width: '150px',
      height: '150px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#333',
      fontSize: '16px',
    },
    table: {
      width: '100%',
      maxWidth: '600px',
      margin: '0 auto',
      borderCollapse: 'collapse',
    },
    tableCell: {
      padding: '10px',
      border: '1px solid #ddd',
      textAlign: 'left',
    },
    header: {
      margin: '20px 0',
    },
    aboutSection: {
      width: '100%',
      maxWidth: '800px',
      margin: '0 auto',
      backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background for the About section
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
  };

  return (
    <div style={styles.container}>
      <div className="container_profile" style={styles.profileContainer}>
        <label htmlFor="file-upload" style={styles.uploadButton}>
          {photoUrl ? (
            <img src={photoUrl} alt="Preview" style={styles.profileImg} />
          ) : (
            <div style={styles.uploadPlaceholder}>Upload Photo</div>
          )}
        </label>
        <input
          id="file-upload"
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          style={{ display: 'none' }}
        />
        <table style={styles.table}>
          <tbody>
            <tr>
              <td style={styles.tableCell}>Name</td>
              <td style={styles.tableCell}>: Dr. Subhashini</td>
            </tr>
            <tr>
              <td style={styles.tableCell}>Position</td>
              <td style={styles.tableCell}>: Head of Department</td>
            </tr>
            <tr>
              <td style={styles.tableCell}>Department</td>
              <td style={styles.tableCell}>: Information Technology</td>
            </tr>
            <tr>
              <td style={styles.tableCell}>Email</td>
              <td style={styles.tableCell}>: hod.doe@example.com</td>
            </tr>
            <tr>
              <td style={styles.tableCell}>Contact</td>
              <td style={styles.tableCell}>: +1234567890</td>
            </tr>
            <tr>
              <td style={styles.tableCell}>Address</td>
              <td style={styles.tableCell}>: 123 Main Street, City, Country</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="About" style={styles.aboutSection}>
        <h2 style={styles.header}>About Me</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac mollis massa. Morbi sed sapien nec risus placerat fermentum. Ut vehicula sem vitae eros lacinia, at congue lacus dapibus.</p>
        <p>Sed id nulla eget libero efficitur dapibus vitae sit amet mauris. Duis scelerisque lacus at mauris laoreet, eget eleifend mi molestie.</p>
        <p>Quisque a magna vitae mi hendrerit rutrum. Cras vitae pharetra nunc. Proin nec dui in magna tincidunt ultricies. Suspendisse potenti. In scelerisque convallis erat, ac commodo libero condimentum id. Phasellus venenatis mi nec purus blandit tempus.</p>
      </div>
    </div>
  );
};

export default HodAbout;
