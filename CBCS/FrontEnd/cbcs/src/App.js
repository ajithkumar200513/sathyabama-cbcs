import UserType from "./Component/UserType";
import {BrowserRouter,Navigate,Route,Routes} from 'react-router-dom'
import Dean from "./Pages/Users/Dean";
import Hod from "./Pages/Users/Hod";
import Student from "./Pages/Users/Student";
import Staf from "./Pages/Users/Staf";
import Coe from "./Pages/Users/COE";
import StudentSignup from "./Pages/Signup/StudentSignup";
import Course from "./Pages/Student/Course";
import { useAuthContext } from "./Hooks/useAuthContext";
import { useHodAuthContext } from "./Hooks/useHodAuthContext";
import { useCoeAuthContext } from "./Hooks/UseCoeAuthContext";
import  HodHome from "./Pages/Hod/HodHome";
import StaffHome from "./Pages/Staff/StaffHome";
import CourseRegister from "./Component/CourseRegister";
import {useStaffAuthContext} from "./Hooks/useStaffAuthContext"
import Attendence from "./Component/Attendence";
import HodStudent from "./Component/HodStudent";
import AttendenceInfo from "./Component/AttendenceInfo";
import CreateCourse from "./Component/CreateCourse";
import HodAbout from "./Component/HodAbout";
import HodHomePage from "./Component/HodHomePage";
import Marks from "./Component/Marks";
import CAE1 from "./Component/CAE1";
import CAE2 from "./Component/CAE2";
import SEM from "./Component/SEM";
import COEHOME from "./Component/COEHOME";
import DeanHome from "./Component/DeanHome";
import { UseDeanAuthContext } from "./Hooks/UseDeanAuthContext";
function App() {
  const {user} = useAuthContext()
  const {HOD} = useHodAuthContext()
  const {staff} = useStaffAuthContext()
  const {COE} = useCoeAuthContext()
  const {DEAN} = UseDeanAuthContext()
  console.log(user)
  console.log(HOD)
  console.log(staff)
  console.log(COE)
  console.log(DEAN)
  return (
    <div>
      <BrowserRouter>
         <Routes>
           <Route 
            path='/DEAN'
            element={!DEAN ? <Dean /> : <Navigate to='/Dean/home'/>}/>
            <Route 
            path='/DEAN/home'
            element={DEAN ? <DeanHome /> : <Navigate to='/Dean'/>}/>
            <Route 
            path='/' 
            element={!user  ? <UserType />: <Navigate to='/student/Course'/>}/>
            <Route 
            path='/dean'
            element={<Dean />}/>
            <Route 
            path='/hod'
            element={!HOD ? <Hod /> : <Navigate to='/hod/Home'/>}/>
            <Route 
            path='/staf'
            element={!staff ? <Staf />: <Navigate to='/staf/Home'/>}/>   
            <Route 
            path='/student/Course'
            element={user ? <Course /> : <Navigate to ='/'/>}/>     
            <Route 
            path='/student/Course/Register'
            element={user ? <CourseRegister/> : <Navigate to ='/'/>}/>     
            <Route 
            path='/student'
            element={!user ? <Student /> : <Navigate to='/student/Course'/>}/>
            <Route 
            path='/Student_Signup'
            element={!user ? <StudentSignup />:<Navigate to='/student'/>}/>
            <Route 
            path='/hod/Home'
            element={ HOD ? <HodHome /> : <Navigate to='/hod'/>}/>
            <Route 
            path='/hod/student_info'
            element={ HOD ? <HodStudent/> : <Navigate to='/hod'/>}/>
            <Route 
            path='/staf/Home'
            element={ staff ? <StaffHome /> : <Navigate to='/staf'/>}/>
            <Route 
            path='/staf/Home/Attendence'
            element={ staff ? <Attendence /> : <Navigate to='/staf'/>}/>
            <Route 
            path='/staf/Home/Marks/CAE-1'
            element={ staff ? <CAE1 /> : <Navigate to='/staf'/>}/>
            <Route 
            path='/staf/Home/Marks/CAE-2'
            element={ staff ? <CAE2 /> : <Navigate to='/staf'/>}/>
            <Route 
            path='/staf/Home/Marks/SEM'
            element={ staff ? <SEM /> : <Navigate to='/staf'/>}/>
            <Route 
            path='/staf/Home/Marks'
            element={ staff ? <Marks /> : <Navigate to='/staf'/>}/>
            <Route 
            path='/staf/Home/Attendence/Info'
            element={ staff ? <AttendenceInfo /> : <Navigate to='/staf'/>}/>
            <Route 
            path='/hod/Create-course'
            element={HOD ? <CreateCourse/> : <Navigate to='/hod/'/>}/>
            <Route 
            path='/hod/About'
            element={HOD ? <HodAbout/> : <Navigate to='/hod/'/>}/>
            <Route 
            path='/COE'
            element={!COE ? <Coe /> : <Navigate to='/COE/Home'/>}/>
            <Route 
            path='/COE/Home'
            element={COE ? <COEHOME /> : <Navigate to='/COE'/>}/>
         </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
