import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import '../css/UserType12.css';
import back from '../css/back.jpg'; // Correct import of the image (if needed)
import Chatbot from './Chatbot'; // Import the Chatbot component

const UserType = () => {
  useEffect(() => {
  
  }, []);

  return (
    <div className='usertype'>
      <div className='banner'>
        <img src={back} alt="Banner" />
      </div>
      <div className='menu-container'>
        <h1 className='heading'>SELECT ROLE</h1>
        <nav>
          <Link to='/COE' className='btn btn-primary btn-block'>COE</Link>
          <Link to='/DEAN' className='btn btn-primary btn-block'>DEAN</Link>
          <Link to='/hod' className='btn btn-primary btn-block'>HOD</Link>
          <Link to='/staf' className='btn btn-primary btn-block'>STAFF</Link>
          <Link to='/student' className='btn btn-primary btn-block'>STUDENT</Link>
        </nav>
      </div>
      <div className='middle-content'>
        <h1 className='welcome-heading'>Welcome to Sathyabama Institute of Science and Technology (CBCS)</h1>
        <p className='welcome-paragraph'>
          Sathyabama Institute of Science and Technology (SIST) is a renowned institution known for its excellence in education and research. Our institution operates under the Choice Based Credit System (CBCS), which allows students to tailor their education according to their interests and career goals. The CBCS provides flexibility in course selection, enabling students to choose from a wide range of subjects and interdisciplinary courses.
        </p>
      </div>
      <footer className='footer'>
        <a href='https://www.linkedin.com/school/sathyabama-institute-of-science-&-technology-chennai/' target='_blank' rel='noopener noreferrer' className='footer-link'>
          <i className='fab fa-linkedin'></i>
        </a>
        <a href='https://www.youtube.com/channel/UCkBMqT83pxjwPhh8mUpZ0hQ' target='_blank' rel='noopener noreferrer' className='footer-link'>
          <i className='fab fa-youtube'></i>
        </a>
        <a href='https://www.sathyabama.ac.in/' target='_blank' rel='noopener noreferrer' className='footer-link'>
          <i className='fas fa-globe'></i>
        </a>
        <a href='https://twitter.com/sathyabamaSIST' target='_blank' rel='noopener noreferrer' className='footer-link'>
          <i className='fab fa-twitter'></i>
        </a>
        <a href='https://www.instagram.com/sathyabama.official/' target='_blank' rel='noopener noreferrer' className='footer-link'>
          <i className='fab fa-instagram'></i>
        </a>
        <a href='https://www.facebook.com/SathyabamaOfficial/' target='_blank' rel='noopener noreferrer' className='footer-link'>
          <i className='fab fa-facebook'></i>
        </a>
      </footer>
      <Chatbot /> {/* Add the Chatbot component here */}
    </div>
  );
};

export default UserType;
