import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import './Landing.css'
import * as actions from "../redux/actions";

export const Landing = () => {
 const dispatch = useDispatch()
  useEffect(function () {
    dispatch(actions.getCountries());
 
  }, []);
  return (
   <div className='landing'>
    <div >
        <h1 className=' titllle'>Countries Proyect</h1>
        <Link className='Link' to={"/home"}><button className='btn btn-primary'>LOG IN</button></Link>
    </div>
    <footer className='footer'>Made for Alex Huaitiao Añasco</footer>
   </div>
  )
}
