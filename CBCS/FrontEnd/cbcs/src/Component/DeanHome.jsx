import React, { useEffect, useState } from 'react';
import CoeTable from './CoeTable';
import { UseDeanLogout } from '../Hooks/UseDeanLogout';
import { UseDeanAuthContext } from '../Hooks/UseDeanAuthContext';
import DeanTable from './DeanTable'

export default function DeanHOME() {
  const [Dept, setDept] = useState('');
  const { DEAN } = UseDeanAuthContext();
  const { logout } = UseDeanLogout();

  const handleClick = async () => {
    logout();
  }

  return (
    <div>
      {!Dept && DEAN?.School === "School of Computing" && (
        <div>
          <form className="form-C">
      <br></br>
      <label htmlFor="Dept">Select Department</label>
            <select
            id="Dept"
            value={Dept}
            onChange={(e)=>setDept(e.target.value)}>
               <option value = {null} >select</option>
            <option value="Department of Computer Science and Engineering">Department of Computer Science and Engineering</option>
            <option value="Department of Information Technology">Department of Information Technology</option>
            </select>
      <br></br>      
      <button >Show Info</button>
    </form>
        </div>
      )}
      {!Dept && DEAN?.School === "School of Electrical and Electronics" && (
        <div>
          <form className="form-C">
      <br></br>
      <label htmlFor="Dept">Select Department</label>
            <select
            id="Dept"
            value={Dept}
            onChange={(e)=>setDept(e.target.value)}>
               <option value = {null} >select</option>
               <option value="Department of Electronics and Communication Engineering">Department of Electronics and Communication Engineering</option>
            <option value="Department of Electrical and Electronics Engineering">Department of Electrical and Electronics Engineering</option>
                </select>
      <br></br>      
      <button >Show Info</button>
    </form>
        </div>
      )}
       {!Dept && DEAN?.School === "School of Mechanical" && (
        <div>
          <form className="form-C">
      <br></br>
      <label htmlFor="Dept">Select Department</label>
            <select
            id="Dept"
            value={Dept}
            onChange={(e)=>setDept(e.target.value)}>
               <option value = {null} >select</option>
               <option value="Department of Mechanical Engineering">Department of Mechanical Engineering</option>
               </select>
      <br></br>      
      <button >Show Info</button>
    </form>
        </div>
      )}
      {!Dept && DEAN?.School === "School of Bio and Chemical Engineering" && (
        <div>
          <form className="form-C">
      <br></br>
      <label htmlFor="Dept">Select Department</label>
            <select
            id="Dept"
            value={Dept}
            onChange={(e)=>setDept(e.target.value)}>
               <option value = {null} >select</option>
               <option value="Department of BioTechnology">Department of BioTechnology</option>
               </select>
      <br></br>      
      <button >Show Info</button>
    </form>
        </div>
      )}
      {Dept && <div><DeanTable Dept = {Dept} /> </div>}
      <button onClick={handleClick}>Log Out</button>
    </div>
  );
}
