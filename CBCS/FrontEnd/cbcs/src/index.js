import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { AuthContextProvider } from './Context/AuthContext';
import { CourseContextProvider } from './Context/CourseContext';
import { HodAuthContextProvider } from './Context/HodAuthContext';
import { StaffAuthContextProvider } from './Context/StaffAuthContext';
import {CoeAuthContextProvider} from './Context/CoeAuthContext'
import { DeanAuthContextProvider } from './Context/DeanAuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CourseContextProvider>
        <HodAuthContextProvider>
          <StaffAuthContextProvider>
            <CoeAuthContextProvider>
              <DeanAuthContextProvider>
                 <App />
              </DeanAuthContextProvider>
            </CoeAuthContextProvider>
          </StaffAuthContextProvider>
         </HodAuthContextProvider>
      </CourseContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
