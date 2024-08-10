import { useState } from 'react';
import { useSignup } from '../../Hooks/useSignup';
import backgroundImage from '../Login/logo.png'; // Ensure this path is correct

const StudentSignup = () => {
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Batch, setBatch] = useState('');
  const [Dept, setDept] = useState('');
  const [RegNo, setRegNo] = useState('');
  const [password, setPassword] = useState('');
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(Name, Email, Batch, Dept, RegNo, password);
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f0f0',
      backgroundImage: `url(${backgroundImage})`, // Background image import
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'relative',
    },
    form: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white
      padding: '30px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      maxWidth: '500px',
      width: '100%',
      textAlign: 'center',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: 'bold',
      color: '#333',
      marginTop: '10px',
    },
    input: {
      width: '100%',
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      fontSize: '16px',
      marginBottom: '20px',
    },
    select: {
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
  };

  const [buttonHovered, setButtonHovered] = useState(false);

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <label style={styles.label}>Name</label>
        <input
          type="text"
          style={styles.input}
          onChange={(e) => setName(e.target.value)}
          value={Name}
          required
        />
        <label style={styles.label}>Email</label>
        <input
          type="email"
          style={styles.input}
          onChange={(e) => setEmail(e.target.value)}
          value={Email}
          required
        />
        <label style={styles.label}>Register Number</label>
        <input
          type="text"
          style={styles.input}
          onChange={(e) => setRegNo(e.target.value)}
          value={RegNo}
          required
        />
        <label htmlFor="batch" style={styles.label}>Batch</label>
        <select
          id="batch"
          style={styles.select}
          value={Batch}
          onChange={(e) => setBatch(e.target.value)}
          required
        >
          <option value="">Select</option>
          <option value="2019-2023">2019-2023</option>
          <option value="2020-2024">2020-2024</option>
          <option value="2021-2025">2021-2025</option>
          <option value="2022-2026">2022-2026</option>
          <option value="2023-2027">2023-2027</option>
          <option value="2024-2028">2024-2028</option>
          <option value="2025-2029">2025-2029</option>
          <option value="2026-2030">2026-2030</option>
        </select>
        <label htmlFor="Dept" style={styles.label}>Dept</label>
        <select
          id="Dept"
          style={styles.select}
          value={Dept}
          onChange={(e) => setDept(e.target.value)}
          required
        >
          <option value="">Select</option>
          <option value="Department of Computer Science and Engineering">Department of Computer Science and Engineering</option>
          <option value="Department of Information Technology">Department of Information Technology</option>
          <option value="Department of Electronics and Communication Engineering">Department of Electronics and Communication Engineering</option>
          <option value="Department of Electrical and Electronics Engineering">Department of Electrical and Electronics Engineering</option>
          <option value="Department of Mechanical Engineering">Department of Mechanical Engineering</option>
          <option value="Department of Biotechnology">Department of Biotechnology</option>
        </select>
        <label style={styles.label}>Set Password</label>
        <input
          type="password"
          style={styles.input}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <button
          type="submit"
          style={{ ...styles.button, ...(buttonHovered ? styles.buttonHover : {}) }}
          onMouseEnter={() => setButtonHovered(true)}
          onMouseLeave={() => setButtonHovered(false)}
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
        {error && <div style={styles.error}>{error}</div>}
      </form>
    </div>
  );
};

export default StudentSignup;
