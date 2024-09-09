import React from 'react'
import { useHodAuthContext } from "../../Hooks/useHodAuthContext"
import {Link} from 'react-router-dom'
import {useHodLogout} from "../../Hooks/useHodLogout"
import { useEffect } from 'react'
import { useCourseContext } from '../../Hooks/useCourseContext'
import CreateCourse from '../../Component/CreateCourse'
import HodTable from '../../Component/HodTable'
import HodNav from '../../Component/Nav-Bar/HodNav'
const HodHome = () => {
  const {HOD} = useHodAuthContext()
  console.log(HOD)
  const {logout} = useHodLogout()
  const handelclick = async() =>
  {
    logout()
  }
  const  {course,dispatch} = useCourseContext() 
  useEffect(() =>
  {
  const fetchcourse = async() =>{
  const response = await fetch('https://sathyabama-cbcs.onrender.com/cbcs/hod/course',
  {headers:{'Authorization':`Bearer ${HOD.token}`}})
  const json = await response.json()
  console.log(json)
  if(response.ok){
    dispatch({type:'SET_COURSE',payload:json})
  }
  }
  if(HOD){
    fetchcourse()
  }
},[dispatch,HOD])
  return (
    <div>
       <HodNav course={course} handelclick={handelclick}></HodNav>
    </div>
  )
}

export default HodHome
