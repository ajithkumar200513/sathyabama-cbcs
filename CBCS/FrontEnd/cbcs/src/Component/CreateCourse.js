import { useEffect, useState } from "react";
import { useCourseContext } from "../Hooks/useCourseContext";
import { useHodAuthContext } from "../Hooks/useHodAuthContext";
import backgroundImage from '../css/logo.png'; // Ensure the image path is correct

const CreateCourse = () => {
  const { dispatch } = useCourseContext();
  const [CourseName, setCourseName] = useState('');
  const [Coordinator, setCoordinator] = useState('');
  const [ProvidedBy, setProvidedBy] = useState('');
  const [Seats, setSeats] = useState('');
  const [error, setError] = useState(null);
  const [stafs, setStafs] = useState([]);
  const { HOD } = useHodAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const course = { CourseName, Coordinator, ProvidedBy, Seats };

    const response = await fetch('https://sathyabama-cbcs.onrender.com/cbcs/hod/create', {
      method: 'POST',
      body: JSON.stringify(course),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${HOD.token}`
      }
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setCourseName('');
      setCoordinator('');
      setProvidedBy('');
      setSeats('');
      setError(null);
      console.log('NEW COURSE', json);
      dispatch({ type: 'CREATE_COURSE', payload: json });
      window.alert('Course added successfully!'); // Alert on successful course addition
    }
  };

  useEffect(() => {
    const fetchStafs = async () => {
      const StafInfo = await fetch('https://sathyabama-cbcs.onrender.com/cbcs/hod/Stafs', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${HOD.token}`
        }
      });
      const json = await StafInfo.json();
      if (StafInfo.ok) {
        setStafs(json);
      }
    };
    fetchStafs();
  }, []);

  const styles = {
    body: {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#333',
      padding: '20px',
    },
    main: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '600px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
    label: {
      marginBottom: '8px',
      fontWeight: 'bold',
    },
    input: {
      marginBottom: '15px',
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      fontSize: '16px',
    },
    select: {
      marginBottom: '15px',
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      fontSize: '16px',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#9e1c3f',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      fontSize: '16px',
      fontWeight: 'bold',
    },
    buttonHover: {
      backgroundColor: '#d32f2f',
    },
    error: {
      marginTop: '15px',
      color: 'red',
    }
  };

  return (
    <div style={styles.body}>
      <main style={styles.main}>
        <form style={styles.form} onSubmit={handleSubmit}>
          <label style={styles.label} htmlFor="ip1">Course Name:</label>
          <input
            style={styles.input}
            type="text"
            onChange={(e) => setCourseName(e.target.value)}
            value={CourseName}
          />
          <label style={styles.label} htmlFor="Coordinator">Faculty</label>
          <select
            style={styles.select}
            id="Coordinator"
            value={Coordinator}
            onChange={(e) => setCoordinator(e.target.value)}
          >
            <option value="">select</option>
            {stafs.map((v) => (
              !v.CourseHandel && <option key={v._id} value={v._id}>{v.Name}</option>
            ))}
          </select>
          <label style={styles.label} htmlFor="Dept">PROVIDED BY</label>
          <select
            style={styles.select}
            id="Dept"
            value={ProvidedBy}
            onChange={(e) => setProvidedBy(e.target.value)}
          >
            <option value="">select</option>
            <option value="Department of Computer Science and Engineering">Department of Computer Science and Engineering</option>
            <option value="Department of Information Technology">Department of Information Technology</option>
            <option value="Department of Electronics and Communication Engineering">Department of Electronics and Communication Engineering</option>
            <option value="Department of Electrical and Electronics Engineering">Department of Electrical and Electronics Engineering</option>
            <option value="Department of Mechanical Engineering">Department of Mechanical Engineering</option>
            <option value="Department of BioTechnology">Department of BioTechnology</option>
          </select>
          <label style={styles.label} htmlFor="ip2">Available SEATS</label>
          <input
            style={styles.input}
            id="ip2"
            type="number"
            onChange={(e) => setSeats(e.target.value)}
            value={Seats}
          />
          <button style={styles.button} onMouseOver={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor} onMouseOut={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}>Add Course</button>
          {error && <div style={styles.error}>{error}</div>}
        </form>
      </main>
    </div>
  );
};

export default CreateCourse;
