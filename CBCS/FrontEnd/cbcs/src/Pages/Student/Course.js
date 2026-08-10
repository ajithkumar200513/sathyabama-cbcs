import { useEffect } from 'react'
import { useAuthContext } from '../../Hooks/useAuthContext'
import { useLogout } from '../../Hooks/useLogout'
import { useCourseContext } from '../../Hooks/useCourseContext'
import CourseDetails from '../../Component/CourseDetails'

const Course = () => {
    const { user } = useAuthContext();
    const { logout } = useLogout();
    const { course, dispatch } = useCourseContext();

    const handleClick = () => {
        logout();
    };

    useEffect(() => {
        const fetchCourse = async () => {
            const response = await fetch('https://sathyabama-cbcs.onrender.com/cbcs/course/', {
                headers: { 'Authorization': `Bearer ${user.token}` }
            });
            const json = await response.json();
            console.log(json);
            if (!response.ok) {
                console.log("Cannot Fetch");
            }
            if (response.ok) {
                dispatch({ type: 'SET_COURSE', payload: json });
            }
        };

        if (user) {
            fetchCourse();
        }
    }, [dispatch, user]);

    console.log(course);

    const styles = {
        container: {
            padding: '20px',
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#f0f0f0',
            minHeight: '100vh',
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            padding: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
        button: {
            backgroundColor: '#9e1c3f',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            padding: '10px 20px',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'background-color 0.3s',
        },
        buttonHover: {
            backgroundColor: '#e64a19',
        },
        info: {
            margin: '0 10px',
            fontSize: '16px',
        },
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                {user && (
                    <div>
                        <button
                            onClick={handleClick}
                            style={styles.button}
                            onMouseEnter={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
                            onMouseLeave={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
                        >
                            LOG OUT
                        </button>
                       
                    </div>
                )}
            </header>
            {course && <CourseDetails key={course._id} course={course} />}
        </div>
    );
};

export default Course;
